import { useState, useRef, useEffect } from 'react'
import styles from './select.module.scss'
import { SelectOption, SelectProps } from './types'
import Controller from './Controller'

const Select = ({
  multiple,
  removeOptionWhenSelected = true,
  options = [],
  optionOneLiner = true,
  label,
  value,
  placeholder = 'Select an option',
  onChange
}: SelectProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)
  const [isFocusController, setFocusController] = useState<boolean>(false)

  let filteredOptions = [...options]
  if (multiple && removeOptionWhenSelected) {
    filteredOptions = filteredOptions.filter(o => !value.includes(o))
  }

  const focusController = () => {
    setFocusController(true)
    controllerRef.current?.focus()
  }
  const closeOptions = () => {
    setIsOpen(false)
    setHighlightedIndex(null)
  }

  const changeOption = (option: SelectOption) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter(o => o !== option))
      } else {
        onChange([...value, option])
      }
    } else {
      if (option !== value && onChange) {
        onChange(option)
      }
    }
  }

  const isOptionSelected = (option: SelectOption) => {
    return multiple? value.includes(option) : option === value
  }
  
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (containerRef.current && !containerRef.current.contains(e.target) && isOpen) {
        closeOptions()
      }

      if ((controllerRef.current && !controllerRef.current.contains(e.target)) && labelRef.current && !labelRef.current.contains(e.target)) {
        setFocusController(false)
      }
    }
    const handleSelectKeydown = (e: KeyboardEvent) => {
      if (e.target !== controllerRef.current) return

      switch(e.code) {
        case 'Space':
          setIsOpen(prev => !prev)
          break
        case 'Enter':
          if (isOpen && highlightedIndex !== null) {
            changeOption(filteredOptions[highlightedIndex])
            closeOptions()
            focusController()
          }
          break
        case 'Escape':
          closeOptions()
          break
        case 'ArrowUp':
        case 'ArrowDown': {
          if (!isOpen) {
            setIsOpen(true)
            break
          }

          const newValue = (highlightedIndex !== null? highlightedIndex : -1) + (e.code === 'ArrowDown'? 1 : -1)
          if (newValue >= 0 && newValue < filteredOptions.length) {
            setHighlightedIndex(newValue)
          }
          break
        } 
        case 'Tab': {
          closeOptions()
          setFocusController(false)
          break
        }
      }
    }

    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleSelectKeydown)

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleSelectKeydown)
    }
  }, [isOpen, highlightedIndex, filteredOptions]) // eslint-disable-line

  return (
    <div 
      ref={containerRef}
      className={`${styles.container} ${isOpen? styles.show : ''} ${optionOneLiner? styles['one-liner'] : ''}`}
    >
      <div 
        ref={labelRef}
        className={styles.label}
        onClick={() => {
          
          setIsOpen(prev => !prev)
        }}
      >
        { label }
      </div>

      <Controller 
        value={value}
        placeholder={placeholder}
        multiple={multiple}
        changeOption={changeOption}
        controllerRef={controllerRef}
        handleClick={() => setIsOpen(prev => !prev)}
        isFocusController={isFocusController}
      />

      {/* Options List */}
      <ul className={styles.options}>
        {
          filteredOptions.map((option, index) => {
            const isSelected = isOptionSelected(option)
            return (
              <li 
                key={option.value} 
                onClick={(e) => {
                  e.stopPropagation()
                  changeOption(option)
                  closeOptions()
                  focusController()
                }}  
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`${styles.option} ${isSelected? styles.selected: ''} ${highlightedIndex === index? styles.highlighted : ''}`}
              >
                { isSelected? (
                  <span className={styles.check} />
                ) : ''}
                { option.label }
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export type { 
  SelectOption, 
  SelectProps 
}
export default Select