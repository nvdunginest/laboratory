import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { blue, green, grey, cyan, amber, red } from '@material-ui/core/colors'
import { Button, Tooltip, Hidden } from '@material-ui/core'
import { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const buttonStyles = makeStyles((theme) => ({
  root: {
    lineHeight: '0.8em',
    minWidth: '0px',
    whiteSpace: 'nowrap'
  },
  textSizeSmall: {
    alignItems: 'flex-end'
  },
  containedSizeSmall: {
    height: '29px',
    minWidth: '68px'
  },
  label: {
    alignItems: 'flex-end'
  },
  startIcon: {
    marginRight: theme.spacing(0.5)
  },
  iconSizeSmall: {
    '& *:first-child': {
      fontSize: '0.8rem'
    }
  }
}))

const textStyles = makeStyles(() => ({
  primary: {
    color: blue[500],
    '&:hover': {
      color: blue[900]
    }
  },
  secondary: {
    color: grey[600],
    '&:hover': {
      color: grey[900]
    }
  },
  success: {
    color: green[600],
    '&:hover': {
      color: green[900]
    }
  },
  info: {
    color: cyan[700],
    '&:hover': {
      color: cyan[900]
    }
  },
  warning: {
    color: amber[600],
    '&:hover': {
      color: amber[900]
    }
  },
  danger: {
    color: red[500],
    '&:hover': {
      color: red[900]
    }
  },
  dark: {
    color: 'black',
    '&:hover': {
      color: grey[700]
    }
  },
  inherit: {
    color: 'inherit',
    '&:hover': {
      color: 'inherit'
    }
  }
}))

const containedStyles = makeStyles(() => ({
  primary: {
    backgroundColor: blue[500],
    color: 'white',
    '&:hover': {
      backgroundColor: blue[900]
    }
  },
  secondary: {
    backgroundColor: grey[400],
    color: 'black',
    '&:hover': {
      backgroundColor: grey[500]
    }
  },
  success: {
    backgroundColor: green[600],
    color: 'white',
    '&:hover': {
      backgroundColor: green[900]
    }
  },
  info: {
    backgroundColor: cyan[700],
    color: 'white',
    '&:hover': {
      backgroundColor: cyan[900]
    }
  },
  warning: {
    backgroundColor: amber[600],
    color: 'black',
    '&:hover': {
      backgroundColor: amber[900]
    }
  },
  danger: {
    backgroundColor: red[500],
    color: 'white',
    '&:hover': {
      backgroundColor: red[900]
    }
  },
  dark: {
    backgroundColor: 'black',
    color: 'white',
    '&:hover': {
      backgroundColor: grey[700]
    }
  },
  inherit: {
    backgroundColor: 'inherit',
    color: 'inherit',
    '&:hover': {
      backgroundColor: 'inherit'
    }
  }
}))

type IconButtonProps = {
  icon: IconName
  text?: string
  color?:
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'dark'
  | 'inherit'
  variant?: 'text' | 'contained'
  size?: 'medium' | 'large' | 'small'
  tooltip?: string
  hideTitleOnMobile?: boolean
  disabled?: boolean
  onClick?: () => void
  onMouseDown?: () => void
  onMouseUp?: () => void
}

export default function IconButton({
  icon,
  text = '',
  color = 'primary',
  variant = 'text',
  size = 'small',
  tooltip = '',
  hideTitleOnMobile = false,
  disabled = false,
  onClick = () => { return; },
  onMouseDown = () => { return; },
  onMouseUp = () => { return; }
}: IconButtonProps): JSX.Element {
  const buttonClasses = buttonStyles()
  const textClasses = textStyles()
  const containedClasses = containedStyles()
  return (
    <Tooltip title={tooltip}>
      <Button
        variant={variant}
        classes={buttonClasses}
        size={size}
        disabled={disabled}
        className={
          variant === 'contained' ? containedClasses[color] : textClasses[color]
        }
        startIcon={<FontAwesomeIcon icon={icon} />}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        {hideTitleOnMobile ? <Hidden smDown>{text}</Hidden> : text}
      </Button>
    </Tooltip>
  )
}
