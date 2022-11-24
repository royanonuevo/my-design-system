export type ButtonProps = {
  label: string
  type?: 'button' | 'submit' | 'reset'
  id?: string
  style?: React.CSSProperties
  fullWidth?: boolean
} & React.ComponentProps<'button'>