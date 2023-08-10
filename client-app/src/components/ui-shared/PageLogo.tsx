import React from 'react'
import { Typography } from '@material-ui/core'

import Logo from '../../assets/images/logo2.png'

export default function PageLogo(): JSX.Element {
  return (
    <div style={{ textAlign: 'center' }}>
      <img src={Logo} alt='Ecoba Management Information System' width='200' />
      <Typography variant='h5' color='primary' align='center' noWrap>
        Management Information System
      </Typography>
    </div>
  )
}
