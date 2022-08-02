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

function cart() {
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems },
  } = state;
  const removItme = item => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: { ...item } });
  };
  const router = useRouter();
  const checkedHandler = () => {
    if (userInfo) {
      router.push('/priPage/shipping');
    }
    router.push('/users/login');
  };

  return (
    <div>
      <Layout title={'Cart'}>
        <Box className={styles.addButton}>
          <IconButton
            onClick={() => {
              router.push('/priPage/shop');
            }}
          >
            <Add />
          </IconButton>
        </Box>
        <Box>
          <Typography component={'h1'} variant='h1' align='center' m={2}>
            cart items{' '}
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
          <Grid container spacing={1} p={1}>
            <Grid item md={9} xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Item name</TableCell>
                      <TableCell>Quntatiy </TableCell>
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
            </Grid>
            <Grid item md={3} xs={12}>
              <Card>
                <Typography align='center' m={1} component={'h5'} variant='h5'>
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
                        {cartItems.reduce(
                          (a, c) =>
                            a +
                            c.quantity * (c.newPrice ? c.newPrice : c.price),
                          0
                        )}
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
                        checked
                      </Typography>
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        )}
      </Layout>
    </div>
  );
}
export default dynamic(() => Promise.resolve(cart), { ssr: false });
