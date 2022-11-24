import React from 'react'
import { Input } from '@salesforce/design-system-react'

// import { padString } from 'utilities/helper'

const InputPercentage = props => {
  const { id, name, onChange, isQuestionMarkEnabled } = props
  const inputId = id ?? `InputPercentage-${name}`

  return (
    <Input
      {...props}
      type='text'
      id={inputId}
      autoComplete='off'
      onChange={event => {
        const maxLength = 3
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

          if (Number(newValue) <= 100) {
            // newValue = padString(maxLength, newValue)
            newValue = newValue.substring(0, maxLength)
            formattedEvent.target.value = newValue

            onChange(formattedEvent)
          } else if (newValue === '?') {
            onChange(formattedEvent)
          }
        }
      }}
    />
  )
}

export default InputPercentage
