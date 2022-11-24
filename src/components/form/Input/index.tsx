import clx from 'utilities/clx'

type InputProps = {
  label?: string,
  id?: string,
  name: string,
  type?: string,
  value?: any,
  placeholder?: string,
  readOnly?: boolean,
  autoComplete?: string,
  error?: any,
  register?: Function,
  disabled?: boolean
} & React.ComponentProps<'input'>

const Input = ({
  type = 'text',
  label = '',
  name,
  error = '',
  id,
  register,
  ...otherProps
}: InputProps) => {
  let inputProps = {
    id: id || name,
    name,
    type,
    label,
    ...otherProps
  }

  // if "react hook form" register mounted
  if (register) {
    inputProps = {
      ...inputProps,
      ...register(name, {
        disabled: otherProps?.disabled
      })
    }
  }

  const hasError = error? true : false
  
  return (
    <div>
      <label htmlFor={name}>{ label }</label>
      <input
        {...inputProps}
        className={clx('p-2 w-full rounded-lg bg-gray-800 mt-2 p-2 border-[2px] border-transparent focus:bg-gray-800 focus:outline-none  focus:border-gray-700 placeholder:text-gray-500', {
          'cursor-not-allowed placeholder:text-gray-700': otherProps?.readOnly || otherProps?.disabled,
          'border-red-600 focus:border-red-600': hasError
        })}
      />
      { hasError? (
        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
          { error }
        </span>
      ) : null}
    </div>
  )
}

export default Input