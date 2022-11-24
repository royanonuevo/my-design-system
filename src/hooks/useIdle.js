import { useState, useEffect } from 'react'

const useIdle = ({
  timeToIdle = 5000,
  stopListenerWhenGetIdle = false,
  onActive = null,
  onIdle = null,

  actionTimeInterval = 0,
  onInterval = null
}) => {
  let idleTimeOutId
  let actionTimeIntervalId
  const [isIdle, setIsIdle] = useState(false)
  const events = [
    'click',
    'mousemove',
    'mousedown',
    'keypress',
    'touchmove',
    'DOMMouseScroll',
    'mousewheel',
    'MSPointerMove'
  ]

  const goActive = () => {
    idleTimeOutId = window.setTimeout(goInactive, timeToIdle)
    setIsIdle(false)

    if (onActive) {
      onActive()
    }
  }

  const goInactive = () => {
    setIsIdle(true)

    if (onIdle) {
      onIdle()
    }

    // stop event listener when this is 'true'
    if (stopListenerWhenGetIdle) {
      removeEventListener()
    }
  }

  const resetIdleTimer = () => {
    window.clearTimeout(idleTimeOutId)
    goActive()
  }

  const setupIdleTimer = () => {
    events.forEach(event => {
      document.addEventListener(event, resetIdleTimer, false)
    })

    goActive()
  }

  const removeEventListener = () => {
    events.forEach(event => {
      document.removeEventListener(event, resetIdleTimer, false)
    })
    idleTimeOutId = null
  }

  const startInterval = () => {
    window.clearInterval(actionTimeIntervalId)
    actionTimeIntervalId = window.setInterval(onInterval, actionTimeInterval)
  }

  const stopInterval = () => {
    window.clearInterval(actionTimeIntervalId)
  }

  useEffect(() => {
    setupIdleTimer()

    return () => removeEventListener()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (actionTimeInterval > 0 && !isIdle) {
      startInterval()
    }

    return () => stopInterval()
    // eslint-disable-next-line
  }, [isIdle])

  return isIdle
}

export default useIdle
