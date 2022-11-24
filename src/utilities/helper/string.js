// string to ucwords
export function ucWords(str) {
	if (typeof str === 'string') {
    str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
      return letter.toUpperCase()
    })
	}
  return str
}

// string to upper
export function strToUpper(str) {
  if (typeof str === 'string')
    return str.toUpperCase()

  return str
}

// string to lower
export function strToLower(str) {
  if (typeof str === 'string')
    return str.toLowerCase()

  return str
}
