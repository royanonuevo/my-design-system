export type SelectOption = {
  label: string,
  value: any
}

export type SingleSelectProps = {
  multiple?: false,
  value?: SelectOption,
  onChange?: (value: SelectOption | undefined) => void
}

export type MultipleSelectProps = {
  multiple: true,
  value: SelectOption[],
  onChange: (value: SelectOption[]) => void
}

export type SelectProps = {
  removeOptionWhenSelected?: boolean,
  options: SelectOption[],
  label: string,
  placeholder?: string
  optionOneLiner?: boolean
} & (SingleSelectProps | MultipleSelectProps)


export type ControllerProps = {
  value: any, // TODO should not be any!!
  multiple?: boolean,
  placeholder: string,
  changeOption: Function,
  controllerRef: React.RefObject<HTMLDivElement>,
  handleClick: () => void,
  isFocusController: boolean
}