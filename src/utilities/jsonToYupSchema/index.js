import * as Yup from 'yup'
import { set, cloneDeep } from 'lodash'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  testIsNumeric,
  testIsNoLeadingZero,
  testIsNoLeadingSpace,
  testIsMaxLength,
  testEmailAddresses
} from './testFns'

// Default Error Messages for some Validation Type
const getDefaultParams = (validationType, validationParams) => {
  switch (validationType) {
    case 'required':
      return validationParams ? [validationParams] : ['Mandatory field']
    case 'email':
      return validationParams ? [validationParams] : ['Invalid email address format.']
    default:
      return validationParams
  }
}

const getEquivalentTest = (
  fieldType,
  validationType,
  label,
  params
) => {
  const testType = params[0]

  if (fieldType === 'string') {
    switch (testType) {
      case 'numeric':
        return {
          name: 'string-numeric',
          messages: params[1]?? `${label} must be numeric characters`,
          function: testIsNumeric
        }
      case 'noleading_zero':
        return {
          name: 'string-noleading_zero',
          messages: 'Please start your entry with a non-"0" numerical value',
          function: testIsNoLeadingZero
        }
      case 'noleading_space':
        return {
          name: 'string-noleading_space',
          messages: 'Please start your entry without space',
          function: testIsNoLeadingSpace
        }
      case 'maximum-length':
        return {
          name: 'string-maximum-length',
          messages: params[2]?? `${params[1]} character limit exceeded`,
          function: (value) => testIsMaxLength(value, params[1])
        }
      case 'numeric-equal-length':
        return {
          name: 'numeric-equal-length',
          messages:
            params[2]??
            `${label} must be exactly ${params[1]} numeric ${
              params[1] > 1 ? 'characters' : 'character'
            }`,
          function: function (value = '') {
            if (value) {
              const length = value.toString().length
              return length === params[1]
            }

            return true
          }
        }
      case 'slds-datepicker':
        return {
          name: 'string-datepicker',
          messages: 'Invalid Date',
          function: function (value = '') {
            return typeof value === 'string' && value === 'Invalid Date'
              ? false
              : true
          }
        }
      case 'email-addresses':
        return {
          name: 'string-email-addresses',
          messages: 'Invalid email address.',
          function: testEmailAddresses
        }
      default:
        return validationType
    }
  }

  return validationType
}

const getEquivalentWhenCondition = params => {
  switch (params[0]) {
    case 'when-value-match':
      return (fieldValue, schema) => {
        return fieldValue === params[2]
          ? createValidator(params[3], null, schema)
          : schema
      }
    default:
      return
  }
}

const createValidator = (
  obj,
  fieldLabel,
  validator
) => {
  const fieldType = obj.type
  let validations = Object.keys(obj)

  validations.forEach(validationType => {
    if (validationType !== 'type') {
      const validationParams = getDefaultParams(validationType, obj[validationType])

      switch (validationType) {
        case'test':
          const testArray = [...validationParams]
          testArray.forEach((test, index) => {
            const testParams = getEquivalentTest(
              fieldType,
              validationType,
              fieldLabel,
              test
            )

            validator = validator['test'](
              testParams.name,
              testParams.messages,
              testParams.function
            )
          })
          break
        case 'when-condition':
          validationParams.map(param => {
            validator = validator['when'](
              param[1],
              getEquivalentWhenCondition(param)
            )
            return validator
          })
          break
        case 'oneOfRef':
          validator = validator['oneOf'](
            [Yup.ref(validationParams[0])],
            validationParams[1]
          )
          break
        case 'notOneOfRef':
          validator = validator['notOneOf'](
            [Yup.ref(validationParams[0])],
            validationParams[1]
          )
          break
        case 'of':
          validator = validator['of'](Yup.object().shape(createYupSchema(obj.of)))
          break
        default:
          // if not valid type then break it
          if (!validator[validationType]) {
            return
          }
          validator = validator[validationType](...validationParams)
          break
      }
    }
  })

  return validator
}

const createYupSchema = (fields) => {
  let schema = {}

  fields.forEach(field => {
    let obj = field.validation
    const fieldType = field.validation.type
    const fieldLabel = field?.validation?.label?? field.name
    let validator

    if (!Yup[fieldType]) {
      return schema
    }

    if (fieldType === 'number') {
      validator = Yup[fieldType]().typeError(`${fieldLabel} must be numeric`)
    } else {
      validator = Yup[fieldType]()
    }

    // add a label
    // obj.label = [fieldLabel]
    schema[field.name] = createValidator(
      obj,
      fieldLabel,
      validator
    )
  })

  return schema
}

export const jsonToYupSchema = (fields, formValues) => {
  fields = fields
    .filter(f => f.validation)
    .map(f => {
      const validation = cloneDeep(f.validation)
      if (f.mandatoryWhen && f.mandatoryWhen(formValues) === false) {
        switch (validation.type) {
          case 'array':
            delete validation.min
            break
          case 'string':
          case 'number':
            delete validation.required
            break
          default:
            break
        }
      }

      return {
        ...f,
        validation: {
          ...validation
        }
      }
    })

  const yupSchema = createYupSchema(fields)
  return Yup.object().shape(yupSchema)
}

export const formikResolver = async (fields, formValues) => {
  const validationSchema = jsonToYupSchema(fields, formValues)
  let errors
  try {
    await validationSchema.validate(formValues, {
      abortEarly: false
    })
  } catch (error) {
    if (error.name !== 'ValidationError') {
      throw error
    }

    errors = error.inner.reduce((errors, currentError) => {
      errors = set(errors, currentError.path, currentError.message)
      return errors
    }, {})
  }

  return errors
}

// only use in https://react-hook-form.com Resolver
export const hookFormResolver = (formConfig, formValues, context, options) => {
  const schema = jsonToYupSchema(formConfig, formValues)
  return yupResolver(schema)(formValues, context, options)
}