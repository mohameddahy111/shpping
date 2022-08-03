import {
  Box,
  Button,
  Card,
  Grid,
  List,
  ListItem,
  MenuItem,
  Rating,
  Select,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import { products } from '../../data/products';
import styles from '../../styles/singlPage.module.css';
import MorSale from '../../components/home/MorSale';
import { useSnackbar } from 'notistack';
import { useStateContext } from '../../context/ContextProvider';
import { Store } from '../../context/Store';
import Cookies from 'js-cookie';

export default function productScreen() {
  const [items, setitems] = useState([]);
  const [size, setsize] = useState([]);
  const [gallary, setgallary] = useState([]);
  const [newImage, setnewImage] = useState('');
  const [catagroy, setcatagroy] = useState('');
  const [newPrice, setnewPrice] = useState('');
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;
  const { slug } = router.query;
  useEffect(() => {
    const item = products.find(x => x.slug === slug);
    setitems({ ...item });
    setnewImage('');
  }, [slug]);
  useEffect(() => {
    const size = products.find(x => {
      if (x.slug === slug) {
        setsize(x.priceSize);
        setgallary(x.gallary);
        setcatagroy(x.catagroy);
      }
      return size;
    });
  }, [slug]);
  const listLike = products.filter(x => x.catagroy === catagroy);
  // const addTocartItem = (item, newImage) => {
  //   const checkProductInCart = cartItems.find(x => x._id === item._id);
  //   if (checkProductInCart) {
  //     enqueueSnackbar('this item in your cart', { variant: 'warning' });
  //   } else {
  //     if (newImage) {
  //       item.img = newImage;
  //     }
  //     Cookies.set('cartItems', JSON.stringify(cartItems));
  //     setcartItems([...cartItems, { ...item }]);
  //     enqueueSnackbar(`${items.name} add to cart`, { variant: 'success' });
  //   }
  // };
  const updateSize = size => {
    setnewPrice(size);
  };
  const addToCartHandler = item => {
    if (newPrice === '') {
      enqueueSnackbar('plece shoesse the size', { variant: 'error' });
      return;
    }
    const existItem = cartItems?.find(x => x._id === item._id);
    if (existItem) {
      enqueueSnackbar(`${items.name} update`, { variant: 'success' });
      dispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...items, newPrice, quantity, newImage },
      });
    } else {
      dispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...items, newPrice, quantity, newImage },
      });
      enqueueSnackbar(`${items.name} add to cart`, { variant: 'success' });
    }
  };
  return (
    <div>
      <Layout title={items.name}>
        <Box className={styles.backButton}>
          <Button variant='contained' onClick={() => router.back()}>
            <Typography component={'h2'} variant='h2'>
              back
            </Typography>{' '}
          </Button>
        </Box>
        <Box>
          <Grid container spacing={1} p={1}>
            <Grid item md={4} xs={12}>
              <img
                src={newImage ? newImage : items.img}
                width={400}
                height={400}
                className={styles.imgImg}
              />
            </Grid>
            <Grid item md={4} xs={12} sx={{ marginLeft: '10px' }}>
              <List>
                <ListItem className={styles.listItems}>
                  <Typography component={'h5'} variant='h5'>
                    <span>name </span> :
                  </Typography>
                  <Typography component={'h2'} variant='h2'>
                    {items.name}{' '}
                  </Typography>
                </ListItem>
                <ListItem className={styles.listItems}>
                  <Typography component={'h5'} variant='h5'>
                    <span>brand </span> :
                  </Typography>
                  <Typography component={'h2'} variant='h2'>
                    {items.brand}{' '}
                  </Typography>
                </ListItem>
                <ListItem className={styles.listItems}>
                  <Typography component={'h5'} variant='h5'>
                    <span>catagroy </span> :
                  </Typography>
                  <Typography component={'h2'} variant='h2'>
                    {items.catagroy}{' '}
                  </Typography>
                </ListItem>
                <ListItem className={styles.listItemss}>
                  <Typography component={'h5'} variant='h5'>
                    <span className={styles.span}>rating </span> :
                  </Typography>
                  <Rating value={`${items.rating}`} precision={0.5} readOnly />(
                  {items.reviwes} reviwes)
                </ListItem>
                <ListItem className={styles.listItems}>
                  <Typography component={'h5'} variant='h5'>
                    <span>size </span> :
                  </Typography>
                  <Typography component={'h2'} variant='h2'>
                    {size.map(x => (
                      <> {x.size}, </>
                    ))}
                  </Typography>
                </ListItem>
                <ListItem className={styles.listItems}>
                  <Typography component={'h5'} variant='h5'>
                    <span>discrpione</span>
                  </Typography>
                  <Typography>{items.discrpione} </Typography>
                </ListItem>
                <ListItem className={styles.listItems}>
                  <Typography component={'h5'} variant='h5'>
                    <span>choose size : </span>
                  </Typography>
                  <Select
                    onChange={e => {
                      updateSize(e.target.value);
                    }}
                  >
                    {size.map((x, index) => (
                      <MenuItem key={index} value={x.price}>
                        {x.size}{' '}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography component={'h5'} variant='h5'>
                    <span>quantity : </span>
                    <Select
                      value={quantity}
                      onChange={e => {
                        setQuantity(e.target.value);
                      }}
                      required={true}
                    >
                      {[...Array(items.stock).keys()].map(x => (
                        <MenuItem key={x + 1} value={x + 1}>
                          {x + 1}{' '}
                        </MenuItem>
                      ))}
                    </Select>
                  </Typography>
                </ListItem>
              </List>
            </Grid>
            <Grid item md={3} xs={12}>
              <Card>
                <List>
                  <ListItem>
                    <Grid item xs={12}>
                      <Typography component={'h2'} variant='h2'>
                        {' '}
                        price :
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        component={'h2'}
                        variant='h2'
                        sx={{ color: 'tomato' }}
                      >
                        $ {newPrice ? newPrice : items.price}
                      </Typography>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid item xs={12}>
                      <Typography component={'h2'} variant='h2'>
                        {' '}
                        statues :
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      {items.stock > 0 ? (
                        <Typography component={'h2'} variant='h2'>
                          in Stock
                        </Typography>
                      ) : (
                        <Typography component={'h5'} variant='h5'>
                          out off Stock
                        </Typography>
                      )}
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Button
                      fullWidth
                      variant='contained'
                      disabled={items.stock > 0 ? false : true}
                      onClick={() => addToCartHandler(items)}
                    >
                      {items.stock > 0 ? (
                        <Typography component={'h2'} variant='h2'>
                          add to cart
                        </Typography>
                      ) : (
                        <h5> &#128553; &#128553; &#128553;</h5>
                      )}
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
          <Box className={styles.gallayImage}>
            {gallary.map((x,index) => (
              <Box className={styles.gallayImageq} key={index}>
                <img
                  src={x.img}
                  width={100}
                  height={100}
                  onClick={() => {
                    setnewImage(x.img);
                  }}
                  className={styles.imgImg}
                />
              </Box>
            ))}
          </Box>
        </Box>
        <Box className={styles.reviwes}>
          <Typography component={'h2'} variant='h2'>
            reviwes
          </Typography>
          <Box>
            <p>commetes </p>
          </Box>
        </Box>

        <Box>
          <Box>
            <MorSale data={listLike} text={'may love it'} />
          </Box>
        </Box>
      </Layout>
    </div>
  );
}
