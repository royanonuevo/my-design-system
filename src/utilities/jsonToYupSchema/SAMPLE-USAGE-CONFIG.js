// SAMPLE USAGES:

/*
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    age: Yup.number().required(),
  })
*/
const fields = [
  {
    name: 'email',
    label: 'Email',
    type: 'input',
    validation: {
      type: 'string',
      label: ['Email'],
      required: null,
      email: null,
    }
  },
  {
    name: 'effectiveFromDate',
    label: 'Effective From',
    validation: {
      type: 'string',
      label: ['Effective From'],
      required: null,
      test: [
        ['slds-datepicker']
      ]
    }
  }, {
    name: 'groups',
    label: 'Groups',
    type: 'combobox', // multiple selection
    dropDownOptions: [...],
    validation: {
      type: 'array',
      label: ['Groups'],
      min: [1],
      max: [2]
    }
  }, {
    name: 'memberNo',
    label: 'Member No',
    type: 'text',
    validation: {
      type: 'string',
      label: ['Member No'],
      required: ['custom error messages'],
      length: [10]
    }
  }, {
    name: 'ssn',
    label: 'SSN',
    type: 'text',
    validation: {
      type: 'string',
      label: ['SSN'],
      required: null,
      test: [
        ["numeric"],
        ["numeric-equal-length", 8]
      ]
    }
  }, {
    name: 'memberId',
    label: 'memberId',
    type: 'text',
    validation: {
      type: 'string',
      label: ['memberId'],
      required: null,
      "when-condition": [
        ["when-value-match",  "memberIdType", "HKID", { "length": [8] }],
        ["when-value-match",  "memberIdType", "Passport", { "max": [15] }]
      ]
    }
  }, {
    name: 'amount',
    label: 'Amount',
    type: 'text',
    validation: {
      type: 'number',
      label: ['Amount'],
      positive: [],
      max: [9999999.99],
      test: ["decimal-length-optional", 2]
    }
  }, {
    name: 'signatures',
    label: 'Signature',
    type: 'array',
    validation: {
      type: 'array',
      label: ['signature'],
      min: [1, 'Mandatory field'],
      of: [{
          name: 'signature',
          label: 'Signature',
          validation: {
            type: 'string',
            label: ['Signature'],
            required: null
          }
        }, {
          name: 'typeChop',
          label: 'Type Chop',
          validation: {
            type: 'string',
            label: ['Type Chop'],
            required: null
          }
        }, {
          name: 'typeSignatory',
          label: 'Type Signatory',
          validation: {
            type: 'string',
            label: ['Type Signatory'],
            required: null
          }
        }
      ]
    }
  }, {
    name: 'cheque2',
    label: 'Cheque 2',
    validation: {
      type: 'string',
      label: ['Cheque No. 2'],
      test: [
        ['numeric'],
        ['must-be-filled-in-first', 'chequeNo', 'First cheque no. field must be filled in first']
      ],
      notOneOfRef: ['chequeNo', '1st and 2nd Cheque no. are the same']
    }
  }, {
    name: 'confirmPassword',
    label: 'Confirm Password',
    validation: {
      type: 'string',
      label: ['Confirm Password'],
      required: null,
      oneOfRef: ['password', 'Passwords must matched.'],
    }
  }
]