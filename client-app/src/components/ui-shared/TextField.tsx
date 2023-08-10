import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  FormControl,
  InputLabel,
  TextField as TextFieldMUI
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%'
  },
  textField: {
    '& .MuiOutlinedInput-inputMarginDense': {
      padding: theme.spacing(0.625)
    },
    '& .MuiOutlinedInput-multiline.MuiOutlinedInput-marginDense': {
      padding: theme.spacing(0.625)
    },
    marginTop: theme.spacing(2)
  }
}))

type TextFieldProps = {
  required?: boolean
  name?: string
  label?: string
  type?: string
  multiline?: boolean
  rows?: number
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string | Date
}

export default function TextField({
  required = false,
  name = '',
  label = '',
  type = 'text',
  multiline = false,
  rows = 0,
  disabled = false,
  onChange = () => { return; },
  value = ''
}: TextFieldProps): JSX.Element {
  const classes = useStyles()

  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink>{`${label}${required ? '*' : ''}`}</InputLabel>
      <TextFieldMUI
        className={classes.textField}
        margin='none'
        fullWidth
        name={name}
        variant='outlined'
        size='small'
        type={type}
        multiline={multiline}
        rows={rows}
        disabled={disabled}
        onChange={onChange}
        value={value}
      />
    </FormControl>
  )
}
