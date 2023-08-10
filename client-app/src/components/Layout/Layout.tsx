import React from 'react';
import {
  CssBaseline,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from './AppBar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 'calc(100vh - 146px)',
    overflow: 'auto',
  },
  content: {
    padding: theme.spacing(1),
    width: '90%',
    margin: 'auto',
  },
  toolbar: theme.mixins.toolbar,
}));

type LayoutStore = {
  index: number;
  changeIndex: (id: number) => void;
}

const defaultStore: LayoutStore = {
  index: 0,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changeIndex: (id: number) => { return; },
}

type LayoutProviderProps = {
  children: JSX.Element | JSX.Element[];
}

export const LayoutContext = React.createContext(defaultStore);

export default function Layout({ children }: LayoutProviderProps): JSX.Element {
  const classes = useStyles();
  const [index, setIndex] = React.useState(0);

  const changeIndex = (id: number) => {
    setIndex(id);
  };

  const store: LayoutStore = {
    index,
    changeIndex,
  };

  return (
    <LayoutContext.Provider value={store}>
      <CssBaseline />
      <AppBar />
      <main className={classes.root}>
        <div className={classes.content}>
          {children}
        </div>
      </main>
      <div style={{ backgroundColor: '#006F3C', height: '40px' }}>
        <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
          <Typography style={{ color: '#fff', opacity: 0.8, fontWeight: 500, height: '40px', lineHeight: '40px' }} variant="body2" color="textSecondary" align="center">
            {`© ${new Date().getFullYear()}. All rights reserved. Designed by R&D Team.`}
          </Typography>
        </div>
      </div>
    </LayoutContext.Provider>
  );
}

