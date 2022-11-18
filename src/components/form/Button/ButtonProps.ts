export type ButtonProps = {
  label: string,
  type?: 'button' | 'submit' | 'reset',
  id?: string,
  style?: React.CSSProperties
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
}