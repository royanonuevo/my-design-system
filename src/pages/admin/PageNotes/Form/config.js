export const formConfig = [
  {
    name: 'name',
    label: 'Name',
    type: 'input',
    inputProps: {
      placeholder: 'Ex. John Doe',
    },
    disabledWhen: values => {
      return false
    },
    mandatoryWhen: values => null,
    validation: {
      type: 'string',
      label: ['Name'],
      required: null,
    }
  },
  {
    name: 'email',
    label: 'Email',
    type: 'input',
    inputProps: {
      placeholder: 'example@domain.com',
    },
    disabledWhen: values => {
      return false
    },
    mandatoryWhen: values => null,
    validation: {
      type: 'string',
      label: ['Email'],
      required: null,
      email: null
    }
  },
  {
    name: 'password',
    label: 'Password',
    type: 'input',
    inputProps: {
      placeholder: 'Ex. John Doe',
    },
    disabledWhen: values => {
      return false
    },
    mandatoryWhen: values => null,
    validation: {
      type: 'string',
      label: ['Password'],
      required: null,
      test: [
        ['numeric'],
        ['numeric-equal-length', 6]
      ]
    }
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'input',
    inputProps: {
      placeholder: 'Ex. John Doe',
    },
    disabledWhen: values => {
      return false
    },
    mandatoryWhen: values => null,
    validation: {
      type: 'string',
      label: ['Confirm Password'],
      required: null,
      oneOfRef: ['password', 'Password and confirm password fields value must be matched'],
    }
  },
  {
    name: 'birthdate',
    label: 'Birth Date',
    type: 'input',
    inputProps: {
      placeholder: 'Ex. John Doe',
    },
    disabledWhen: values => {
      return false
    },
    mandatoryWhen: values => null,
    validation: {
      type: 'string',
      label: ['Birth Date'],
      required: null
    }
  },
]