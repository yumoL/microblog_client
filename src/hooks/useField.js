import { useState } from 'react'

export const useField = (type, defaultedValue) => {
  const [value, setValue] = useState(defaultedValue ? defaultedValue : '')

  const onChange = e => {
    setValue(e.target.value)
  }

  const clear = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    clear
  }
}