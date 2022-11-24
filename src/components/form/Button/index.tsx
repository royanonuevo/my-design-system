import { ButtonProps } from './ButtonProps'
import clx from 'utilities/clx'

const Button = ({
  label, 
  type = 'button',
  fullWidth = false,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clx('px-3 my-5 py-2 bg-teal-500 text-white font-semibold rounded-lg', {
        'w-full': fullWidth
      })}
      {...rest}
    >
      {label}
    </button>
  )
}

export default Button