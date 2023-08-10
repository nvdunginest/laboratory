import React, { useState } from 'react';

import { LayoutContext } from '../components/Layout';
import {
  IconButton,
} from '../components/ui-shared';
import { Grid, LinearProgress, TextField, Typography } from '@material-ui/core';

import service from '../services/request';
import history from '../configs/history';

export default function Home(): JSX.Element {
  const { changeIndex } = React.useContext(LayoutContext);
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = await service.create({
        ownerEmail: email,
        ownerPhone: phone,
      });

      history.push(`/success/${data.data}/${email}/${phone}`);
    }
    catch {
      console.log('err');
    }
    finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    changeIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container>
      <Grid item container xs={12} md={4} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">
            Gửi yêu cầu
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            placeholder='abc@email.com'
            value={email}
            fullWidth
            onChange={(e) => { setEmail(e.currentTarget.value) }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="phone"
            label="Số điện thoại"
            type="phone"
            variant="outlined"
            placeholder='0123456789'
            value={phone}
            fullWidth
            onChange={(e) => { setPhone(e.currentTarget.value) }}
          />
        </Grid>
        {loading
          ? <Grid item xs={12}><LinearProgress /></Grid>
          : (
            <Grid container item xs={12} spacing={2}>
              {/* {state.isError && (
                <Grid item xs={12}>
                  <Typography color="error" variant="subtitle2">
                    {state.errorMessage}
                  </Typography>
                </Grid>
              )} */}
              <Grid item xs={12}>
                <IconButton
                  variant="contained"
                  color="primary"
                  text="Gửi yêu cầu"
                  icon="sign-in-alt"
                  onClick={handleSubmit}
                />
              </Grid>
            </Grid>
          )}
      </Grid>
    </Grid>
  )
}