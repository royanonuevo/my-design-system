import React from 'react'
import { Input } from '@salesforce/design-system-react'

const InputDateYear = props => {
  const { id, name, onChange, isQuestionMarkEnabled } = props
  const inputId = id ?? `InputDateYear-${name}`

  return (
    <Input
      {...props}
      type='text'
      id={inputId}
      maxLength='4'
      autoComplete='off'
      onChange={event => {
        const digitOnly = /^[0-9\b]+$/
        const { name, value } = event.target
        const enableQuestionMark = value === '?' && isQuestionMarkEnabled
        let newValue = value

        if (newValue === '' || digitOnly.test(newValue) || enableQuestionMark) {
          // fake event
          const formattedEvent = {
            ...event,
            target: {
              ...event.target,
              name,
              value: newValue
            }
          }

          onChange(formattedEvent)
        }
      }}
    />
  )
}

export default InputDateYear
