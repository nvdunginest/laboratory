import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { AlertType } from './types'

type AlertProps = {
  text: string
  show: boolean
  severity: AlertType
  onClose: () => void
}

export default function Alert({
  text,
  show,
  severity,
  onClose
}: AlertProps): JSX.Element {
  const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    onClose()
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={show}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <MuiAlert
        elevation={6}
        variant='filled'
        onClose={handleClose}
        severity={severity}
      >
        {text}
      </MuiAlert>
    </Snackbar>
  )
}
