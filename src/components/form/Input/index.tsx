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
  disabled?: boolean,
  // handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

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

  // if react hook form register mounted
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
        className={`p-2 w-full rounded-lg bg-gray-800 mt-2 p-2 border-[1px] border-transparent focus:bg-gray-800 focus:outline-none  focus:border-gray-700 placeholder:text-gray-500 ${hasError? 'border-red-500 focus:border-red-500' : ''} ${otherProps?.readOnly || otherProps?.disabled? 'cursor-not-allowed placeholder:text-gray-700' : ''}`}
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