import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../context/ContextProvider';
import styles from '../../styles/payment.module.css';
import Layout from '../../components/layout/Layout';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import StepCheck from '../../components/shipping/StepCheck';
import { useSnackbar } from 'notistack';

export default function pay() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [payment, setPayment] = useState('');
  const { login } = useStateContext();
  const router = useRouter();
  useEffect(() => {
    if (!login) {
      router.push('/');
    }
  }, [login]);
  const submitHandler = e => {
    e.preventDefault();
    closeSnackbar()
    if (payment === '') {
      enqueueSnackbar('place shoesse payment way', { variant: 'error' });
      return
    }
    router.push('/priPage/placeorder');
  };
  return (
    <div>
      <Layout title={'Payment'}>
        <Box>
          <Typography component={'h1'} variant='h1' align='center' m={3}>
            how you want pay ?
          </Typography>
        </Box>
        <StepCheck activeStep={2} />
        <Box className={styles.fromBox}>
          <form onSubmit={submitHandler}>
            <Typography component='h1' variant='h1'>
              Payment Method
            </Typography>

            <List>
              <ListItem>
                <FormControl component={'fieldset'}>
                  <RadioGroup
                    aria-label='payment mathod'
                    name='payment'
                    value={payment}
                    onChange={e => setPayment(e.target.value)}
                  >
                    <FormControlLabel
                      label={
                        <Typography component={'h5'} variant='h5'>
                          Cash
                        </Typography>
                      }
                      value='cash'
                      control={<Radio />}
                    />
                    <FormControlLabel
                      label={
                        <Typography component={'h5'} variant='h5'>
                          by visa
                        </Typography>
                      }
                      value='Byvisa'
                      control={<Radio />}
                    />
                    <FormControlLabel
                      label={
                        <Typography component={'h5'} variant='h5'>
                          pay pal
                        </Typography>
                      }
                      value='payPal'
                      control={<Radio />}
                    />
                  </RadioGroup>
                </FormControl>
              </ListItem>
              <ListItem className={styles.ButtonGroup}>
                <Button variant='contained' color='secondary' type='submit'>
                  <Typography component={'h2'} variant='h2'>
                    pay now
                  </Typography>
                </Button>
                <Button
                  variant='contained'
                  onClick={() => router.push('/priPage/shipping')}
                >
                  <Typography component={'h2'} variant='h2'>
                    back to shipping
                  </Typography>
                </Button>
              </ListItem>
            </List>
          </form>
        </Box>
      </Layout>
    </div>
  );
}
