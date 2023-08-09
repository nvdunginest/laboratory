import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar as AppBarMui,
  Toolbar,
  Typography,
} from '@material-ui/core';

import { AuthContext } from '../../stores/AuthStore';
import { LayoutContext } from './Layout';
import { guestMenu, menu } from './menu';
import Banner from './Banner';
import MenuItem from './MenuItem';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    width: '90%',
    margin: 'auto',
    paddingLeft: 0,
    paddingRight: 0,
  },
  pluginBar: {
    color: 'white',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    display: 'block',
    flexGrow: 1,
    textAlign: 'center',
  },
}));

export default function AppBar(): JSX.Element {
  const classes = useStyles();
  const { index } = React.useContext(LayoutContext);
  const { state } = React.useContext(AuthContext);

  const appMenu = state.user.code !== '' ? menu : guestMenu;

  return (
    <>
      <Banner />
      <AppBarMui position="relative" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.pluginBar}>
            {appMenu.map(menu => (
              <MenuItem
                key={menu.id}
                icon={menu.icon}
                text={menu.text}
                path={menu.path}
                isActive={menu.id === index}
              />
            ))}
          </div>
          <Typography className={classes.title} variant="h6" noWrap />
        </Toolbar>
      </AppBarMui>
    </>
  );
}
