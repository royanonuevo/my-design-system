export type SelectOption = {
  label: string
  value: any,
  [key: string]: any
}

type Placeholder = string

export type SingleSelectProps = {
  multiple?: false
  value?: SelectOption | undefined
  onChange?: (value: SelectOption | undefined) => void
}

export type MultipleSelectProps = {
  multiple: true
  value: SelectOption[]
  onChange?: (value: SelectOption[]) => void
}

export type SelectProps = {
  removeOptionWhenSelected?: boolean
  options?: SelectOption[]
  label: string
  placeholder?: Placeholder
  noOptionsLabel?: string
  optionOneLiner?: boolean
  error?: string,
  onBlur?: Function
} & (SingleSelectProps | MultipleSelectProps)


// type S = {
//   multiple: false | undefined
//   value?: SelectOption | undefined
// }

// type M = {
//   multiple: true
//   value: SelectOption[]
// }


export type ControllerProps = {
  value: any // TODO should not be any!!
  multiple?: boolean
  placeholder: Placeholder
  changeOption: Function
  controllerRef: React.RefObject<HTMLDivElement>
  handleClick: () => void
  isFocusController: boolean
} 