type FieldConfig = {
  name: string,
  fieldProps: {
    type: string,
    label: string,
    [key: string]: any
  },
  disabledWhen: null | Function,
  mandatoryWhen: null | Function,
  validation: Object,
  [key: string]: any
}

export type FieldControllerProps = {
  name: string,
  fieldsConfig: FieldConfig[],
  formik: any
}