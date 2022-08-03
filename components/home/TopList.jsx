import { List, ListItem, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { topList } from '../../data/data';
import styles from '../../styles/Home.module.css';

export default function TopList() {
  useEffect(() => {
    if (window.screen.width > 1024) {
      document.querySelector('#topList').style.justifyContent = 'center';
    }
  }, []);
  return (
    <List className={styles.topList} id='topList'>
      {topList.map((x ,index) => (
        <ListItem  key={index} >
          <Typography component={'a'} href={x.href}>{x.name}</Typography>
        </ListItem>
      ))}
      <ListItem className={styles.sell} >
        <Typography component={'a'} href={'/'} variant='h5'>
          Sell with us
        </Typography>
      </ListItem>
      <ListItem >
        <Typography component={'a'} href={'/'} variant='h5'>
          singin
        </Typography>
      </ListItem>
    </List>
  );
}
