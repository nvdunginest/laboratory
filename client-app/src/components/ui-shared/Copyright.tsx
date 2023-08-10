import React from 'react'
import { Typography } from '@material-ui/core'

export default function Copyright(): JSX.Element {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {`Copyright © Ecoba Management Information System ${new Date().getFullYear()}.`}
    </Typography>
  )
}
