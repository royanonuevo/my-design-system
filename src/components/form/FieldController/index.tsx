import { Input, Select } from 'components/form'
import { FieldControllerProps } from './types'

const FieldController = ({
  name,
  fieldsConfig,
  formik
}: FieldControllerProps) => {
  const fieldConfig = fieldsConfig.find(f => f.name === name)
  if (!fieldConfig) {
    return <>{`Config for '${name}' not found.`}</>
  }

  const { fieldProps } = fieldConfig
  const { type,  options, ...otherFieldProps } = fieldProps
  const { values, handleChange, handleBlur, errors, touched, setFieldValue, setFieldTouched } = formik

  const errorText = (touched?.[name] && errors?.[name])? errors?.[name] : ''
  
  const getOptions = () => {
    if (Array.isArray(options)) return options

    if (typeof options === 'string') {
      // if stored in redux/context you can return here
    }

    return []
  }

  switch (type) {
    case 'select': 
      return (
        <Select 
          {...otherFieldProps}
          options={getOptions()}
          value={values?.[name]}
          onChange={(o) => setFieldValue(name, o)}
          onBlur={() => setFieldTouched(name, true)}
          error={errorText}
        />
      )
    default:
      return (
        <Input 
          {...otherFieldProps}
          name='title'
          value={values?.[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errorText}
        />
      )
  }
}

export default FieldController