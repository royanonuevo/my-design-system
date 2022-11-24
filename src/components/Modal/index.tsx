import { useRef, useEffect } from 'react'
import Portal from 'components/Portal'
import styles from './Modal.module.scss'

type ModalProps = {
  isOpen: boolean
  onClose?: () => void
  title?: string
  children: React.ReactNode
  size?: 'small' | 'large'
  dismissOnClickOutside?: boolean
  disableClose?: boolean
}

const Modal = ({
  isOpen,
  onClose,
  title = '',
  children = '',
  size = 'small',
  dismissOnClickOutside = true
}: ModalProps ) => {
  const outsideRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  const handleCloseOnOverlay = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (dismissOnClickOutside && e.target === outsideRef.current) {
      handleClose()
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // if (e.target !== wrapperRef.current) return
      switch (e.code) {
        case 'Escape': 
          handleClose()
          break
      }
    }

    // const wrapper = wrapperRef.current

    document.body.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.removeEventListener('keydown', handleKeyDown)
    }
  }, []) // eslint-disable-line

  if (!isOpen) return null

  return (
    <Portal id='Modal-Portal'>
      <div className={styles.wrapper} ref={wrapperRef}>
        <div ref={outsideRef} className={styles.overlay} onClick={handleCloseOnOverlay} />
        <section className={styles.container}>
          <header className={styles.title}>{ title }</header>
          <button type='button' aria-label='Close' className={styles.close} onClick={handleClose}>
            <svg viewBox="0 0 24 24" focusable="false" className="chakra-icon css-onkibi" aria-hidden="true"><path fill="currentColor" d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"></path></svg>
          </button>
          <div className={styles.content}>{ children }</div>
        </section>
      </div>
    </Portal>
  )
}

export default Modal