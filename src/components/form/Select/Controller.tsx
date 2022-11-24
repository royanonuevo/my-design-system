import styles from './Select.module.scss'
import { SelectOption, ControllerProps } from './types'

const Controller = ({
  value,
  placeholder,
  multiple,
  changeOption,
  controllerRef,
  handleClick,
  isFocusController
}: ControllerProps) => {

  const renderPlaceholder = () => <span className={styles.placeholder}>{ placeholder }</span>

  const renderValue = () => {
    if (multiple) {
      if (!value.length) return renderPlaceholder()

      return (
        <div className={styles.pills}>
          {
            value.map((option: SelectOption, index: number) => {
              return (
                <div 
                  className={styles.pill}
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  key={option.value}
                >
                  <div className={styles['pill-label']}>{ option.label }</div>
                  <div 
                    className={styles.close} 
                    onClick={() => changeOption(option)}
                  >
                    &times;
                  </div>
                </div>
              )
            })
          }
        </div>
      )
    } else {
      return value? value?.label : renderPlaceholder()
    }    
  }
  
  return (
    <div 
      className={`${styles.controller} ${isFocusController? styles.focus : ''}`} 
      tabIndex={0} 
      ref={controllerRef}
      onClick={handleClick}
    >
      <div className={styles.value}>
        { renderValue() }
      </div>
      <div className={styles.caret}></div>
    </div>
  )
}

export default Controller