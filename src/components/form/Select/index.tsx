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
  noOptionsLabel = 'No options available',
  error = '',
  onChange,
  onBlur
}: SelectProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)
  const [isFocusController, setFocusController] = useState<boolean>(false)
  const hasError = Boolean(error)
  let filteredOptions = [...options]
  if (multiple && removeOptionWhenSelected) {
    filteredOptions = filteredOptions.filter(o => !value?.includes(o))
  }

  if (filteredOptions.length === 0) {
    filteredOptions.push({ label: noOptionsLabel, value: ''})
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
    onBlur && onBlur()

    if (filteredOptions.length === 1 && option?.label === noOptionsLabel) return

    if (multiple) {
      if (value?.includes(option)) {
        onChange?.(value.filter(o => o !== option))
      } else {
        if (Array.isArray(value)){ 
          onChange?.([...value, option])
        }
      }
    } else {
        onChange?.(option !== value? option : undefined)
    }
  }

  const isOptionSelected = (option: SelectOption) => {
    return multiple? value?.includes(option) : option === value
  }
  
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (containerRef.current && !containerRef.current.contains(e.target) && isOpen) {
        closeOptions()
        onBlur && onBlur()
      }

      if ((controllerRef.current && !controllerRef.current.contains(e.target)) && labelRef.current && !labelRef.current.contains(e.target)) {
        setFocusController(false)
        if (isFocusController) {
          onBlur && onBlur()
        }
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
          onBlur && onBlur()
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
      className={`${styles.container} ${isOpen? styles.show : ''} ${optionOneLiner? styles['one-liner'] : ''} ${hasError? styles['has-error'] : ''}`}
    >
      <div 
        ref={labelRef}
        className={styles.label}
        onClick={() => {
          setFocusController(true)
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

      { hasError? (
        <span className={styles.error}>
          { error }
        </span>
      ) : null}

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
  SelectOption
}
export default Select