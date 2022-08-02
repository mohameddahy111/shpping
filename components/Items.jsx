import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Grid,
  Link,
  List,
  ListItem,
  Rating,
  Typography,
} from '@mui/material';
import React from 'react';
import NextLink from 'next/link';

export default function Items({ data }) {
  return (
    <Card>
      <NextLink href={`/product/${data.slug}`} passHref>
        <Link>
          <CardMedia component={'img'} src={data.img} width={300} height={300} />
          <CardActions>
            <CardActionArea>
              <Typography component={'h2'} variant='h2'>
                {data.name}{' '}
              </Typography>
            </CardActionArea>
          </CardActions>
        </Link>
      </NextLink>
      <List>
        <ListItem>
          <Rating value={data.rating} precision={0.5} readOnly />
        </ListItem>
        <ListItem>
          <Typography component={'h5'} variant={'h5'}>
            {' '}
            $ {data.price}{' '}
          </Typography>
        </ListItem>
      </List>
    </Card>
  );
}
