import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import dynamic from 'next/dynamic';
import React, { useContext } from 'react';
import Layout from '../../components/layout/Layout';
import { Store } from '../../context/Store';
import NextLink from 'next/link';
import { Add, Delete } from '@mui/icons-material';
import styles from '../../styles/cart.module.css';
import { useRouter } from 'next/router';
import { useStateContext } from '../../context/ContextProvider';
import { useSnackbar } from 'notistack';
import StepCheck from '../../components/shipping/StepCheck';

export default function PlaceOrder() {
  const { login } = useStateContext();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const removItme = item => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: { ...item } });
    enqueueSnackbar(`${item.name} is removed`, { variant: 'error' });
  };
  const router = useRouter();
  const checkedHandler = () => {
    if (login) {
      router.push('/priPage/finshPage');
      return;
    }
    router.push('/users/login');
  };
  const priceCart = cartItems.reduce(
    (a, c) => a + c.quantity * (c.newPrice ? c.newPrice : c.price),
    0
  );
  const valueShipping = 20
  const valueTax= priceCart * 14/100

  return (
    <div>
      <Layout title={'PlaceOrder'}>
        <Box>
          <StepCheck activeStep={3} />
          <Typography component={'h1'} variant='h1' align='center' m={2}>
            Place Order
          </Typography>
        </Box>
        {cartItems.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              justifyContent: 'center',
              mt: '50px',
            }}
          >
            <Typography component={'h2'} variant='h2'>
              your cart is emty back to{' '}
            </Typography>
            <NextLink href={'/priPage/shop'} passHref>
              <Link
                sx={{
                  textDecoration: 'none',
                  color: '#f0c000',
                  fontSize: '30px',
                }}
              >
                {' '}
                shop{' '}
              </Link>
            </NextLink>
          </Box>
        ) : (
          <Box>
            <Grid container spacing={1} p={1}>
              <Grid item md={6} xs={12} position='relative'>
                <List>
                  <ListItem>
                    <Typography component={'h5'} variant='h5'>
                      full name :
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography component={'h5'} variant='h5'>
                      mail :
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography component={'h5'} variant='h5'>
                      mobile :
                    </Typography>
                  </ListItem>
                </List>
              </Grid>
              <Grid item md={6} xs={12} position='relative'>
                <List>
                  <ListItem>
                    <Typography component={'h5'} variant='h5'>
                      addrees :
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography component={'h5'} variant='h5'>
                      building :
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography component={'h5'} variant='h5'>
                      floor :
                    </Typography>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
            <ListItem>
              <Typography component={'h5'} variant='h5'>
                Delivery notes :
              </Typography>
            </ListItem>
            <Grid container spacing={1} p={1}>
              <Grid item md={9} xs={12} position='relative'>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Item name</TableCell>
                        <TableCell>Quntatiy </TableCell>
                        <TableCell>Size </TableCell>
                        <TableCell>price </TableCell>
                        <TableCell>Action </TableCell>
                      </TableRow>
                    </TableHead>
                    {cartItems.map(x => (
                      <TableBody key={x._id}>
                        <TableRow>
                          <TableCell>
                            <NextLink href={`/product/${x.slug}`} passHref>
                              <Link>
                                <img
                                  src={x.newImage ? x.newImage : x.img}
                                  width={50}
                                  height={50}
                                />
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell>
                            <NextLink href={`/product/${x.slug}`} passHref>
                              <Link>
                                <Typography component={'h5'} variant='h5'>
                                  {x.name}{' '}
                                </Typography>
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell>{x.quantity}</TableCell>
                          <TableCell>{x.newSize}</TableCell>
                          <TableCell>
                            {x.newPrice ? x.newPrice : x.price}
                          </TableCell>
                          <TableCell>
                            <IconButton onClick={() => removItme(x)}>
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    ))}
                  </Table>
                </TableContainer>
                <Box className={styles.addButton} position='absolute'>
                  <IconButton
                    onClick={() => {
                      router.push('/priPage/shop');
                    }}
                  >
                    <Add />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item md={3} xs={12}>
                <Card>
                  <Typography
                    align='center'
                    m={1}
                    component={'h5'}
                    variant='h5'
                  >
                    total{' '}
                  </Typography>
                  <Divider textAlign='center' variant='fullWidth'>
                    <Chip label='Items' />
                  </Divider>
                  <List>
                    <ListItem>
                      <Grid item xs={6}>
                        <Typography component={'h5'} variant='h5'>
                          Item(s) :
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography component={'h5'} variant='h5'>
                          ({cartItems.reduce((a, c) => a + c.quantity, 0)})
                        </Typography>
                      </Grid>
                    </ListItem>
                    <Divider textAlign='center' variant='fullWidth'>
                      <Chip label='Total All' />
                    </Divider>

                    <ListItem>
                      <Grid item xs={6}>
                        <Typography component={'h5'} variant='h5'>
                          price :
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography component={'h5'} variant='h5'>
                        {priceCart} $
                        </Typography>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid item xs={6}>
                        <Typography component={'h5'} variant='h5'>
                          shipping :
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography component={'h5'} variant='h5'>
                        {valueShipping} $
                        </Typography>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid item xs={6}>
                        <Typography component={'h5'} variant='h5'>
                        tax :
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography component={'h5'} variant='h5'>
                       {valueTax} $
                        </Typography>
                      </Grid>
                    </ListItem>
                    <Divider align='center' >
                      <Chip label='subTotal' />
                    </Divider>
                    <ListItem>
                      <Grid item xs={6}>
                        <Typography component={'h2'} variant='h2'>
                          total :
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography component={'h2'} variant='h2' sx={{color :'tomato'}}>
                        {priceCart +valueShipping+valueTax} $
                        </Typography>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Button
                        variant='contained'
                        fullWidth
                        onClick={checkedHandler}
                      >
                        <Typography component={'h2'} variant='h2'>
                        Place Order
                        </Typography>
                      </Button>
                    </ListItem>
                  </List>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </Layout>
    </div>
  );
}
