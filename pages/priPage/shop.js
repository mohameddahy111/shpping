import { Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Catagroys from '../../components/shop/Catagroys';
import { products } from '../../data/products';
import { searchList } from '../../data/data';
import styles from '../../styles/shop.module.css';
import { useStateContext } from '../../context/ContextProvider';
import SearchBox from '../../components/shop/SearchBox';
import Items from '../../components/Items';

export default function shop() {
  const {
    openSearch,
    searchName,
    searchValueText,
    catagroyList,
    setsearchValueText,
    setcatagroyList,
  } = useStateContext();
  const searchNameList = products.filter(x =>
    x.name.toLowerCase().includes(searchValueText.toLowerCase())
  );
  const catagroyListValue = products.filter(x => x.catagroy === catagroyList);
  useEffect(() => {
    setsearchValueText(''), setcatagroyList('');
  }, [searchName]);
  useEffect(() => {
    if (catagroyList === 'all') {
      setcatagroyList('');
    }
  }, [catagroyList]);
  return (
    <div>
      <Layout title={'Shop'}>
        <Box className={styles.contaner}>
          <Box className={openSearch ? styles.leftsetopenSearch : styles.left}>
            <Box className={styles.filter}>
              <SearchBox titel={searchName} />
            </Box>
            <Box className={styles.filterList}>
              <Catagroys data={searchList} />
            </Box>
          </Box>
          <Box className={styles.right}>
            <Grid container spacing={1} p={1}>
              {searchValueText &&
                searchNameList.map(x => (
                  <Grid item md={4} xs={12}>
                    <Items data={x} />
                  </Grid>
                ))}
            </Grid>
            <Grid container spacing={1} p={1}>
              {catagroyListValue &&
                catagroyListValue.map(x => (
                  <Grid item md={4} xs={12}>
                    <Items data={x} />
                  </Grid>
                ))}
            </Grid>
            {searchValueText === '' && catagroyList === '' && (
              <Grid container spacing={1}>
                {products.map(x => (
                  <Grid item md={4} xs={12}>
                    <Items data={x} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Box>
      </Layout>
    </div>
  );
}
