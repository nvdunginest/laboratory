import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
} from '@material-ui/core';

import format from '../../configs/format';

const useStyles = makeStyles((theme) => ({
  banner: {
    margin: 'auto',
    height: '70px',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    padding: '11px',
    width: '90%',
    alignItems: 'center',
  },
  middle: {
    flexGrow: 1,
    textAlign: 'center',
  },
  title: {
    fontWeight: 800,
    lineHeight: 1.2,
  },
  subTitle: {
    lineHeight: 1.2,
    fontStyle: 'italic',
  },
  right: {
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
  },
}));

export default function Banner(): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      {/* <img src={Logo} alt="Ecoba Online Bidding System" height="40" /> */}
      <div className={classes.middle}>
        <Typography className={classes.title} variant="h5" color="primary" align="center" noWrap>
          HỆ THỐNG
        </Typography>
        {/* <Typography className={classes.subTitle} variant="h6" color="primary" align="center" noWrap>
          Online Bidding System
        </Typography> */}
      </div>
      <div className={classes.right}>
        <Typography variant="caption" color="primary" align="right" noWrap>
          Hotline: 0123456789
        </Typography>
        <Typography variant="caption" color="primary" align="right" noWrap>
          Email: support@email.com
        </Typography>
        <Typography variant="caption" color="primary" align="right" noWrap>
          {`Ngày ${format.formatDate(new Date(), 'dd/MM/yyyy')}`}
        </Typography>
      </div>
    </div>
  );
}
