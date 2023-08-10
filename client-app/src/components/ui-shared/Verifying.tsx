import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Backdrop as BackdropMUI,
  CircularProgress as Progress,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

export default function Verifying(): JSX.Element {
  const classes = useStyles()

  return (
    <BackdropMUI className={classes.backdrop} open>
      <Typography variant='h6'>Đang xác thực...</Typography>
      <Progress color='inherit' />
    </BackdropMUI>
  )
}
