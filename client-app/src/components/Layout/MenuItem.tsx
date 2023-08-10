import React from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const useStyles = makeStyles((theme) => ({
  plugin: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    height: '36px',
    minWidth: '68px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  pluginNormal: {
    '&:hover': {
      backgroundColor: '#08915f',
    },
  },
  pluginActive: {
    borderBottom: '3px solid #fff',
  },
  text: {
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    marginLeft: '8px',
    fontWeight: 600,
  }
}));

type MenuItemProps = {
  text: string;
  icon: IconProp;
  path: string;
  isActive?: boolean;
}

export default function MenuItem({
  text,
  icon,
  path,
  isActive = false,
}: MenuItemProps): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div
      className={clsx(classes.plugin, isActive ? classes.pluginActive : classes.pluginNormal)}
      onClick={() => { history.push(path); }}
    >
      <FontAwesomeIcon style={{ fontSize: '1.2rem' }} icon={icon} />
      <Typography variant="caption" className={classes.text}>
        {text}
      </Typography>
    </div>
  )
}
