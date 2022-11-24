// check if the keyboard event is a number
// this.$postcode.on('keypress', this.isNumberKey);
export const isNumberKey = (evt) => {
  var charCode = (evt.which) ? evt.which : event.keyCode
  if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
  return true;
}

export const digitShortener = (value, hasSpace = false, prefendCurrencySign = false, addSpaceOnCurrency = false) => {
  const currencySpace = addSpaceOnCurrency? ' ' : ''
  const currencySign = prefendCurrencySign? CURRENCY.sign : ''
  const space = hasSpace? ' ' : ''

  const kFormatter = (num) => {
    const value = Math.abs(num) >= 1000 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) : Math.sign(num)*Math.abs(num)

    return currencySign + currencySpace + value
  }

  const mFormatter = (num) => {
    const value = Math.abs(num) >= 1000000 ? Math.sign(num)*((Math.abs(num)/1000000).toFixed(1)) : Math.sign(num)*Math.abs(num)


    return currencySign + currencySpace + value
  }


  if (value >= 1000 && value < 1000000) {
    return `${kFormatter(value)}${space}k`
  } else if (value >= 1000000 && value < 1000000000){
    return `${mFormatter(value)}${space}m`
  }

  return value
}


export const formatAmount = (amount, prefendCurrencySign = false, hasSpace = false, noDecimal = false) => {
  let currencySign = prefendCurrencySign? CURRENCY.sign : ''
  let currencySpace = hasSpace? ' ' : ''

  if (amount) {
    let parsedAmount = parseFloat(amount)
    let value
    
    if (noDecimal) {
      value = parsedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } else {
      value = parsedAmount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    }

    return currencySign + currencySpace + value
  }

  return amount
}

