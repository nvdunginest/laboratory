import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Backdrop as BackdropMUI,
  CircularProgress as Progress
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

type BackdropProps = {
  show: boolean
}

export default function Backdrop({ show }: BackdropProps): JSX.Element {
  const classes = useStyles()

  return (
    <BackdropMUI className={classes.backdrop} open={show}>
      <Progress color='inherit' />
    </BackdropMUI>
  )
}
