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

export default function MorSale({ data , text }) {
  return (
    <div>
      <Box>
        <Typography component={'h1'} variant='h1' m={2}>
          {text}
        </Typography>
      </Box>
      <Grid container spacing={1} p={1}>
        {data.map(x => (
          <Grid item md={4} xs={12}>
            <Card>
              <NextLink href={`/product/${x.slug}`} passHref>
                <Link>
                  <CardMedia
                    component={'img'}
                    src={x.img}
                    width={300}
                    height={300}
                  />
                  <CardActions>
                    <CardActionArea>
                      <Typography component={'h2'} variant='h2'>
                        {x.name}{' '}
                      </Typography>
                    </CardActionArea>
                  </CardActions>
                </Link>
              </NextLink>
              <List>
                <ListItem>
                  <Rating value={x.rating} precision={0.5} readOnly />
                </ListItem>
                <ListItem>
                  <Typography component={'h5'} variant={'h5'}>
                    {' '}
                    $ {x.price}{' '}
                  </Typography>
                </ListItem>
              </List>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
