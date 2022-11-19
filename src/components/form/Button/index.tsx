// import styles from './Button.module.scss'
import { ButtonProps } from './ButtonProps'

const Button = ({
  label, 
  type = 'button',
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      // className={styles.button}
      className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/30 text-white font-semibold rounded-lg"
      {...rest}
    >
      {label}
    </button>
  )
}

export default Button