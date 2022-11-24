export const formConfig = [
  {
    name: 'title',
    fieldProps: {
      type: 'input',
      label: 'Title',
      placeholder: 'Your Title',
      readOnly: true,
      onChange: (e)=> {
        console.log('aa')
      }
    },
    disabledWhen: null,
    mandatoryWhen: null,
    validation: {
      type: 'string',
      label: ['Name'],
      required: null,
    }
  },
  {
    name: 'categories',
    fieldProps: {
      type: 'select',
      label: 'Categories',
      multiple: true,
      placeholder: 'Select categories',
      options: [
        { label: 'Singapore', value: 'Singapore', id: {}, name: 123 },
        { label: 'Japan', value: 'Japan', a:false },
        { label: 'Kyoto', value: 'Kyoto' },
        { label: 'Indonesia', value: 'Indonesia' },
        { label: 'Russia', value: 'Russia' },
        { label: 'Manila', value: 'Manila' },
        { label: 'Laguna', value: 'Laguna' },
        { label: 'MyanmarrzzzMyanmarrzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', value: 'Myanmar' },
        { label: 'The Philippines, officially the Republic of the Philippines, is an archipelagic country in Southeast Asia. It is situated in the western Pacific Ocean and consists of around 7,641 islands that are broadly categorized under three main geographical divisions from north to south: Luzon, Visayas, and Mindanao.', value: 'Philippines' }
      ]
    },
    disabledWhen: null,
    mandatoryWhen: null,
    validation: {
      type: 'array',
      label: ['Categories'],
      min: [1, 'Mandatory field']
    }
  },
  {
    name: 'categories2',
    fieldProps: {
      type: 'select',
      label: 'Categories 2',
      multiple: false,
      placeholder: 'Select categories2',
      options: [
        { label: 'Singapore', value: 'Singapore', id: {}, name: 123 },
        { label: 'Japan', value: 'Japan', a:false },
        { label: 'Kyoto', value: 'Kyoto' },
        { label: 'Indonesia', value: 'Indonesia' },
        { label: 'Russia', value: 'Russia' },
        { label: 'Manila', value: 'Manila' },
        { label: 'Laguna', value: 'Laguna' },
        { label: 'MyanmarrzzzMyanmarrzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', value: 'Myanmar' },
        { label: 'The Philippines, officially the Republic of the Philippines, is an archipelagic country in Southeast Asia. It is situated in the western Pacific Ocean and consists of around 7,641 islands that are broadly categorized under three main geographical divisions from north to south: Luzon, Visayas, and Mindanao.', value: 'Philippines' }
      ]
    },
    disabledWhen: null,
    mandatoryWhen: null,
    validation: {
      type: 'object',
      required: null,
    }
  },
]