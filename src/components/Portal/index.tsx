import { createPortal } from 'react-dom'
import { useLayoutEffect, useState } from 'react'

type PortalProps = {
  id: string,
  children: JSX.Element
}

const Portal = ({
  id,
  children
}: PortalProps) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null)
  

  useLayoutEffect(() => {
    let element = document.getElementById(id)
    let systemCreated = false

    const createWrapperAndAppendToBody = () => {
      const wrapperElement = document.createElement('div')
      wrapperElement.setAttribute('id', id)
      document.body.appendChild(wrapperElement)
      return wrapperElement
    }

    if (!element) {
      systemCreated = true
      element = createWrapperAndAppendToBody()
    }

    setWrapperElement(element)

    return () => {
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element)
      }
    }
  }, [id])

  if (wrapperElement === null) return null
  
  return createPortal(
    children, 
    wrapperElement
  )
}

export default Portal