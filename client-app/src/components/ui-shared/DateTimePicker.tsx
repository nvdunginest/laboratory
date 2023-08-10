import React from 'react'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { makeStyles } from '@material-ui/core/styles'
import { FormControl, InputLabel } from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from '@material-ui/pickers'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%'
  },
  textField: {
    '& .MuiOutlinedInput-inputMarginDense': {
      padding: theme.spacing(0.625)
    },
    marginTop: theme.spacing(2)
  }
}))

type DateTimePickerProps = {
  required?: boolean
  name?: string
  label?: string
  disablePast?: boolean
  disableFuture?: boolean
  onChange?: (date: MaterialUiPickersDate) => void
  value?: string | Date
}

export default function DateTimePicker({
  required = false,
  name = '',
  label = '',
  disablePast = false,
  disableFuture = false,
  onChange = () => { return; },
  value = '',
}: DateTimePickerProps): JSX.Element {
  const classes = useStyles()

  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink>{`${label}${required ? '*' : ''}`}</InputLabel>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDateTimePicker
          className={classes.textField}
          name={name}
          variant='inline'
          inputVariant='outlined'
          ampm={false}
          size='small'
          value={value}
          onChange={onChange}
          disablePast={disablePast}
          disableFuture={disableFuture}
          format='HH:mm - dd/MM/yyyy'
        />
      </MuiPickersUtilsProvider>
    </FormControl>
  )
}
