import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Layout from '../../components/layout/Layout';
import { useStateContext } from '../../context/ContextProvider';
import { Store } from '../../context/Store';

export default function finshPage() {
    const {state ,dispatch} = useContext(Store)
  const router = useRouter();
  const backHandler=()=>{
    dispatch({type :'Finsh_order'})
    router.push('/')
  }
  return (
    <div>
      <Layout>
        <Box
          sx={{
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '20px',
            mt: '40px',
          }}
        >
          <Typography
            sx={{ color: '#F0c000', fontSize: '50px' }}
            component={'h1'}
            variant='h1'
          >
            Congratulation
          </Typography>
          <Typography
            sx={{ width: '60%', margin: 'auto' }}
            component={'h2'}
            variant='h2'
          >
            We have received your request and will do our best to reach you as
            soon as possible
          </Typography>
          <Typography component={'h2'} variant='h2' sx={{ color: 'tomato' }}>
            We thank you for your trust in us
          </Typography>
          <Button
            fullWidth
            variant='contained'
            sx={{ width: '60%' }}
            onClick={backHandler}
          >
            <Typography component={'h2'} variant='h2'>
              back to Shopping
            </Typography>
          </Button>
        </Box>
      </Layout>
    </div>
  );
}
