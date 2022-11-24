const COLORS = {
  info: 'blue',
  warning: 'orange',
  error: 'red'
}

class Logger {
  generateMessage(level, message, rest) {
    const style = `color:${COLORS[level]};`a

    if (process.env.REACT_APP_ENABLE_FEATURE_CONSOLE_LOGGER === 'true') {
      // eslint-disable-next-line no-console
      console.log(`%c[${level}] ${message}`, style, rest)
    }
  }

  info(message, ...rest) {
    return this.generateMessage('info', message, rest)
  }

  warning(message, ...rest) {
    return this.generateMessage('warning', message, rest)
  }

  error(message, ...rest) {
    return this.generateMessage('error', message, rest)
  }
}

export default new Logger()
