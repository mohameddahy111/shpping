import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useStateContext } from '../../context/ContextProvider';
import { catagroyList } from '../../data/data';
import styles from '../../styles/shop.module.css';

export default function SearchBox({ titel }) {
  const { setopenSearch, openSearch, setsearchValueText, setcatagroyList } =
    useStateContext();

  return (
    <div>
      {openSearch && (
        <Box className={styles.contanerAllSearch}>
          <Box className={styles.searchTitleContaner}>
            <Typography component={'h2'} variant='h2'>
              {titel}
            </Typography>
            <IconButton onClick={() => setopenSearch(false)}>
              <Close />
            </IconButton>
          </Box>
          <Box>
            {titel === 'name' && (
              <Box>
                <TextField
                  inputProps={{ type: 'text' }}
                  label='search'
                  placeholder='search by name'
                  onChange={e => {
                    setsearchValueText(e.target.value);
                  }}
                />
              </Box>
            )}
            {titel === 'catagroy' && (
              <Box>
                <List>
                  {catagroyList.map(x => (
                    <ListItem
                      onClick={() => {
                        setcatagroyList(x.name);
                      }}
                    >
                      <Button>{x.name} </Button>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </div>
  );
}
