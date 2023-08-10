import React from 'react'
import { Grid, Typography } from '@material-ui/core'

type TagInfoProps = {
  title: string
  content: string
}

export default function TagInfo({ title, content }: TagInfoProps): JSX.Element {
  return (
    <Grid item xs={12} md={6}>
      <Typography variant='caption'>{title}</Typography>
      <Typography variant='subtitle2'>{content}</Typography>
    </Grid>
  )
}
