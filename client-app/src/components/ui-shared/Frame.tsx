import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { Divider, Paper, Toolbar, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%'
  },
  toolbar: {
    height: theme.spacing(5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(4.5),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  },
  title: {
    flex: '1 1 100%',
    fontSize: '1.1rem'
  },
  content: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1)
    }
  },
  noPadding: {
    padding: 0
  }
}))

type FrameProps = {
  title?: string
  noPadding?: boolean
  children: JSX.Element | JSX.Element[]
}

export default function Frame({
  title = '',
  noPadding = false,
  children
}: FrameProps): JSX.Element {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <Toolbar disableGutters className={classes.toolbar}>
        <Typography className={classes.title} variant='h6' component='div'>
          {title}
        </Typography>
      </Toolbar>
      <Divider />
      <div className={noPadding ? classes.noPadding : classes.content}>
        {children}
      </div>
    </Paper>
  )
}
