import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { blue, green, grey, cyan, amber, red } from '@material-ui/core/colors'
import { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const useStyles = makeStyles(() => ({
  primary: {
    color: blue[500]
  },
  secondary: {
    color: grey[600]
  },
  success: {
    color: green[600]
  },
  info: {
    color: cyan[700]
  },
  warning: {
    color: amber[600]
  },
  danger: {
    color: red[500]
  },
  dark: {
    color: 'black'
  },
  inherit: {
    color: 'inherit'
  },
  small: {
    fontSize: '0.8rem'
  },
  default: {
    fontSize: '1rem'
  },
  large: {
    fontSize: '1.25rem'
  }
}))

type IconProps = {
  icon: IconName
  color?:
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'dark'
  | 'inherit'
  size?: 'large' | 'default' | 'small'
}

export default function Icon({
  icon,
  color = 'primary',
  size = 'default'
}: IconProps): JSX.Element {
  const classes = useStyles()
  return (
    <FontAwesomeIcon
      icon={icon}
      className={clsx(classes[color], classes[size])}
    />
  )
}
