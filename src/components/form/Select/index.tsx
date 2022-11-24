import React, { useState, useRef } from 'react'
import styles from './Select.module.scss'
import { SelectOption, SelectProps } from './types'
import Controller from './Controller'
import clx from 'utilities/clx'

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
  onBlur,
  disabled,
  readOnly,
  maxOptionsHeight = '15rem'
}: SelectProps) => {
  const controllerRef = useRef<HTMLDivElement>(null)
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

  const openOptions = () => {
    if (disabled || readOnly) return
    setIsOpen(prev => !prev)
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch(e.code) {
      case 'Space':
        openOptions()
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
          openOptions()
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

  const handleBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      closeOptions()
      setFocusController(false)
      onBlur && onBlur()
    }
  }

  return (
    <div 
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      className={clx(styles.container, {
        [styles.show]: isOpen,
        [styles['one-liner']]: optionOneLiner,
        [styles['has-error']]: hasError,
        [styles.disabled]: disabled,
        [styles['read-only']]: readOnly
      })}
    >
      <div 
        className={styles.label}
        onClick={() => focusController()}
        tabIndex={-1} // tricks: so that onKeyDown will work when this is clicked
      >
        { label }
      </div>

      <Controller 
        value={value}
        placeholder={placeholder}
        multiple={multiple}
        changeOption={changeOption}
        controllerRef={controllerRef}
        handleClick={() => {
          setFocusController(true)
          openOptions()
        }}
        isFocusController={isFocusController}
      />
      { hasError? (
        <span className={styles.error}>
          { error }
        </span>
      ) : null}

      {/* Options List */}
      <ul className={styles.options} tabIndex={-1} style={{maxHeight: maxOptionsHeight}}>
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