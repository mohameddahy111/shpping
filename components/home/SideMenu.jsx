import { Close } from '@mui/icons-material';
import { Box, IconButton, List, ListItem, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';
import { useStateContext } from '../../context/ContextProvider';
import { iconList } from '../../data/data';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function SideMenu({ title }) {
  const router = useRouter();
  const { openList, setopenList, icon, setIcon } = useStateContext();
  const [tit, setTit] = useState('');
  // const [icon, setIcon] = useState('');
  useEffect(() => {
    iconList.map(x => {
      if (title === x.name) {
        setIcon(x.icon);
        setTit(x.name);
      }
    });
  }, [title]);

  function clickHandler(x) {
    router.push(x);
    setopenList(false);
  }
  return (
    <>
      {openList && (
        <Box className={styles.sideMenu}>
          {tit ? (
            <Box className={styles.tit}>
              <Image
                src={icon}
                width={50}
                height={50}
              />
              <Typography variant='h2'>{tit} </Typography>
              <IconButton
                onClick={() => {
                  setopenList(false);
                }}
              >
                <Close />
              </IconButton>
            </Box>
          ) : (
            <Box className={styles.title}>
              <Typography variant='h2'>menu </Typography>
              <IconButton
                onClick={() => {
                  setopenList(false);
                }}
              >
                <Close />
              </IconButton>
            </Box>
          )}
          <Box className={styles.listItem}>
            <List>
              {iconList.map(x => (
                <ListItem key={x.name} onClick={() => clickHandler(x.href)}>
                  <Image src={x.icon} width={40} height={40} />
                  <Typography>{x.name} </Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      )}
    </>
  );
}
