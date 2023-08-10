import React from 'react'
import { Dialog, Grid } from '@material-ui/core'

import IconButton from './IconButton'
import Frame from './Frame'

type FormDialogProps = {
  open?: boolean
  title?: string
  onClose?: () => void
  onSubmit?: () => void
  children: JSX.Element | JSX.Element[]
}

export default function FormDialog({
  open = false,
  title = '',
  onClose = () => { return; },
  onSubmit = () => { return; },
  children
}: FormDialogProps): JSX.Element {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='form-dialog-title'
      fullWidth
      maxWidth='md'
    >
      <Frame title={title}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {children}
          </Grid>
          <Grid item xs={12} container spacing={1}>
            <Grid item>
              <IconButton
                tooltip='Đóng lại'
                text='Đóng lại'
                icon='times'
                variant='contained'
                color='danger'
                onClick={onClose}
              />
            </Grid>
            <Grid item>
              <IconButton
                tooltip='Lưu lại'
                text='Lưu lại'
                icon='save'
                variant='contained'
                color='primary'
                onClick={onSubmit}
              />
            </Grid>
          </Grid>
        </Grid>
      </Frame>
    </Dialog>
  )
}
