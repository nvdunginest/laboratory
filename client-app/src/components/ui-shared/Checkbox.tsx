import React from 'react'
import { FormControlLabel, Checkbox as CheckboxMUI } from '@material-ui/core'

type CheckboxProps = {
  checked: boolean
  name: string
  label?: string
  color?: 'primary' | 'secondary' | 'default' | undefined
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void
}

export default function Checkbox({
  checked,
  name,
  label = '',
  color = 'primary',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = () => { }
}: CheckboxProps): JSX.Element {
  return (
    <FormControlLabel
      control={
        <CheckboxMUI
          checked={checked}
          onChange={onChange}
          name={name}
          color={color}
          size='small'
        />
      }
      label={label}
    />
  )
}
