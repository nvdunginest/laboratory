import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CssBaseline, Box, Container } from '@material-ui/core'

import Copyright from './Copyright'
import PageLogo from './PageLogo'

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

type GuestLayoutProps = {
  children: JSX.Element | JSX.Element[]
}

export default function GuestLayout({
  children
}: GuestLayoutProps): JSX.Element {
  const classes = useStyles()

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <PageLogo />
        {children}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
