export const testIsNumeric = (value) => {
  const pattern = /^[0-9]+$/
  return pattern.test(value)
}

export const testIsNoLeadingZero = (value) => {
  const pattern = /^0+/
  return !pattern.test(value)
}

export const testIsNoLeadingSpace = (value) => {
  const pattern = /^\s+/
  return !pattern.test(value)
}

export const testIsMaxLength = (value, maxLength) => {
  const length = value.toString().length
  return length <= maxLength
}

export const testEmailAddresses = (value) => {
  let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (value && typeof value === 'string') {
    value = value.replaceAll(' ', '')
    // value = value.replaceAll('\n', '')
    const emails = value.split(',')
    return emails.every((email) => pattern.test(email))
  }

  return true
}