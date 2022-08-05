import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { useStateContext } from '../../context/ContextProvider';
import styles from '../../styles/dilevery.module.css';
export default function dilevery() {
    const {login }=useStateContext()
  return (
    <div>
      <Layout title={'Delivery'}>
        {login === false ? (
          <Box className={styles.longout}>
            <Typography component={'h1'} variant='h1'>
              you must{' '}
              <Typography component={'a'} href='/users/login' variant={'h1'}>
                login{' '}
              </Typography>{' '}
              in first
            </Typography>
          </Box>
        ) :(
            <Box>
          
                
            </Box>
        )}
      </Layout>
    </div>
  );
}
