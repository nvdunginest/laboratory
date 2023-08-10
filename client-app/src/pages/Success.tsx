import React from 'react';

import { LayoutContext } from '../components/Layout';
import { useParams } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';

export default function Success(): JSX.Element {
  const { changeIndex } = React.useContext(LayoutContext);
  const { id, email, phone }: never = useParams();

  React.useEffect(() => {
    changeIndex(9);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container>
      <Grid item container xs={12} md={4} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">
            Gửi yêu cầu thành công
          </Typography>
        </Grid>
        <Grid item xs={12}>
          Mã yêu cầu: <strong>{id}</strong>
        </Grid>
        <Grid item xs={12}>
          Email: <strong>{email}</strong>
        </Grid>
        <Grid item xs={12}>
          Phone: <strong>{phone}</strong>
        </Grid>
      </Grid>
    </Grid>
  )
}