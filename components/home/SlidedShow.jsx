import { Box } from '@mui/material';
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styles from '../../styles/Home.module.css';

export default function SlidedShow({ data }) {
  return (
    <Box className={styles.contanier}>
      <Carousel fade>
        {data.map(x => (
            <Carousel.Item>
          <Box className={styles.items} >
              <img
                className={styles.showImage}
                src={x.img}
                width={'100%'}
                height={380}
                alt='First slide'
              />
              <Carousel.Caption>
                <h3> {x.name}</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
          </Box>
            </Carousel.Item>
        ))}
      </Carousel>
    </Box>
  );
}
