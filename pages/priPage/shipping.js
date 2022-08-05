import { Button, List, ListItem, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Layout from '../../components/layout/Layout';
import StepCheck from '../../components/shipping/StepCheck'
import { useStateContext } from '../../context/ContextProvider';
function shipping() {
  const {login  , setLogin}=useStateContext()
  useEffect(()=>{
    if (!login) {
      router.push('/')
    }
  },[login])
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();


  const submitHandler = (
    name,
    email,
    address,
    mobile,
    floor,
    nots,
    building
  ) => {
    router.push('/pay');
  };
  return (
    <Layout>
      <StepCheck activeStep={1} />
      <Typography
        align='center'
        sx={{ margin: '30px 0px' }}
        component={'h1'}
        variant='h1'
      >
        shipping address
      </Typography>
      <form
        style={{ width: '60%', margin: 'auto' }}
        onSubmit={handleSubmit(submitHandler)}
      >
        <List>
          <ListItem>
            <Controller
              name='name'
              defaultValue={''}
              control={control}
              rules={{
                required: true,
                minLength: 4,
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label='Name'
                  id='name'
                  error={Boolean(errors.name)}
                  inputProps={{ type: 'text' }}
                  placeholder='Full Name'
                  helperText={
                    errors.name
                      ? errors.name.type === 'minLength'
                        ? 'Name is vaild'
                        : 'Name Is required '
                      : null
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='email'
              defaultValue={''}
              control={control}
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label='Email'
                  id='email'
                  error={Boolean(errors.email)}
                  inputProps={{ type: 'text' }}
                  placeholder='Email'
                  helperText={
                    errors.email
                      ? errors.email.type === 'pattern'
                        ? 'Email is vaild'
                        : 'Email Is required '
                      : null
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='address'
              defaultValue={''}
              control={control}
              rules={{
                required: true,
                minLength: 1,
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label='address'
                  id='address'
                  error={Boolean(errors.address)}
                  inputProps={{ type: 'text' }}
                  placeholder='address'
                  helperText={
                    errors.address
                      ? errors.address.type === 'minLength'
                        ? 'address is vaild'
                        : 'address Is required '
                      : null
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px',
            }}
          >
            <Controller
              name='building'
              defaultValue={''}
              control={control}
              rules={{
                required: true,
                minLength: 1,
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label='Building'
                  id='building'
                  error={Boolean(errors.building)}
                  inputProps={{ type: 'text' }}
                  placeholder='building'
                  helperText={
                    errors.building
                      ? errors.building.type === 'minLength'
                        ? 'building is vaild'
                        : 'building Is required '
                      : null
                  }
                  {...field}
                />
              )}
            />
            <Controller
              name='floor'
              defaultValue={''}
              control={control}
              rules={{
                required: true,
                minLength: 1,
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label='floor'
                  id='floor'
                  error={Boolean(errors.floor)}
                  inputProps={{ type: 'text' }}
                  placeholder='floor'
                  helperText={
                    errors.floor
                      ? errors.floor.type === 'minLength'
                        ? 'floor is vaild'
                        : 'floor Is required '
                      : null
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='mobile'
              defaultValue={''}
              control={control}
              rules={{
                required: true,
                pattern: /^[+0-9]/,
                minLength: 11,
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label='mobile'
                  id='mobile'
                  error={Boolean(errors.mobile)}
                  inputProps={{ type: 'tel' }}
                  placeholder='mobile'
                  helperText={
                    errors.mobile
                      ? errors.mobile.type === 'pattern'
                        ? 'mobile is vaild'
                        : 'mobile Is required '
                      : null
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <TextField
              fullWidth
              variant='filled'
              inputProps={{ type: 'text' }}
              placeholder='Delivery notes'
              id='note'
            />
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              variant='contained'
              type='submit'
              color='secondary'
            >
              <Typography component={'h2'} variant='h2'>
                pay now
              </Typography>
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}

export default shipping;
