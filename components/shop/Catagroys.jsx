import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import React from 'react';
import { useStateContext } from '../../context/ContextProvider';
import styles from '../../styles/shop.module.css';

export default function Catagroys({ data }) {
  const {  setopenSearch, setsearchName } = useStateContext();

  const clickHandler = (x) => {
    setopenSearch(true);
    setsearchName(x)
  };
  return (
    <div>
      <Box className={styles.titleContaner}>
        <Typography component={'h1'} variant='h1'>
          filter
        </Typography>
      </Box>
      <Box>
        <List  > 
          {data.map(x => (
            <ListItem  sx={{borderRight :`20px solid ${x.color}`}}
              className={styles.list}
              onClick={() => clickHandler(x.name)}
            >
              <Button fullWidth>
                <Typography component={'h5'} variant='h5'>
                  {x.name}
                </Typography>{' '}
              </Button>{' '}
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
}
