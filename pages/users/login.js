import { Box, List, ListItem, TextField, Typography,Button, Link } from '@mui/material';
import React from 'react';
import NextLink from 'next/link';
import Layout from '../../components/layout/Layout';
import { Controller, useForm } from 'react-hook-form';

function login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitHandler = () => {};
  return (
    <div>
      <Layout>
        <Box
          sx={{
            textAlign: 'center',
            margin: '20px',
            textTransform: 'capitalize',
          }}
        >
          <h1
            style={{ fontSize: '50px', fontStyle: 'italic', fontWeight: 800 }}
          >
            login{' '}
          </h1>
        </Box>
        <Box>
          <form
            onSubmit={handleSubmit(submitHandler)}
            style={{ width: '60%', margin: 'auto' }}
          >
            <List>
              <ListItem>
                <Controller
                  name='email'
                  defaultValue={''}
                  control={control}
                  rules={{
                    required: true,
                    minLength: 3,
                    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  }}
                  render={({ field }) => (
                    <TextField
                      id='email'
                      label='Email'
                      fullWidth
                      inputProps={{ type: 'email' }}
                      error={Boolean(errors.email)}
                      placeholder='Enter Your Email'
                      helperText={
                        errors.email
                          ? errors.email.type === 'pattern'
                            ? 'Email is vild'
                            : 'Email is required '
                          : null
                      }
                      {...field}
                    />
                  )}
                />
              </ListItem>
              <ListItem>
                <Controller
                  name='password'
                  defaultValue={''}
                  control={control}
                  rules={{
                    required: true,
                    minLength: 6,
                  }}
                  render={({ field }) => (
                    <TextField
                      id='password'
                      label='Password'
                      fullWidth
                      inputProps={{ type: 'password' }}
                      error={Boolean(errors.password)}
                      placeholder='Password'
                      helperText={
                        errors.password
                          ? errors.password.type === 'minLength'
                            ? 'password is vild'
                            : 'password is required '
                          : null
                      }
                      {...field}
                    />
                  )}
                />
              </ListItem>
              <ListItem>
                <Button  fullWidth variant='contained'  color='secondary' type='submit'>
                  <Typography component={'h2'} variant='h2'>
                    login
                  </Typography>
                </Button>
              </ListItem>
              <ListItem>
                <Typography sx={{display :'flex' , alignItems :'center' , gap :'10px'}}>
                  Daon't have Accont ? 
                  <NextLink href={'/users/register'}passHref >
                    <Link sx={{textDecoration :'none'}}>
                      <Typography component={'h6'} variant='h6'>
                      Register
                      </Typography>
                    </Link>
                  </NextLink>
                </Typography>
              </ListItem>
            </List>
          </form>
        </Box>
      </Layout>
    </div>
  );
}

export default login;
