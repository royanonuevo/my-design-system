export const formConfig = [
  {
    name: 'username',
    fieldProps: {
      type: 'input',
      label: 'Username',
      placeholder: 'Your Username'
    },
    disabledWhen: null,
    mandatoryWhen: null,
    validation: {
      type: 'string',
      label: ['Username'],
      required: null,
    }
  },
  {
    name: 'password',
    fieldProps: {
      type: 'password',
      label: 'Password',
      placeholder: 'Your password',
      readOnly: true
    },
    disabledWhen: null,
    mandatoryWhen: null,
    validation: {
      type: 'string',
      label: ['Password'],
      required: null,
    }
  },
  {
    name: 'roles',
    fieldProps: {
      type: 'select',
      label: 'Roles',
      multiple: true,
      placeholder: 'Select roles',
      options: [
        { label: 'Staff', value: 'Staff' },
        { label: 'Manager', value: 'Japan' },
        { label: 'Supervisor', value: 'Supervisor' },
      ]
    },
    disabledWhen: null,
    mandatoryWhen: null,
    validation: {
      type: 'array',
      label: ['Roles'],
      min: [1, 'Mandatory field']
    }
  },
]