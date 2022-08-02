import { Box, Grid } from '@mui/material';
import TopList from '../components/home/TopList';
import Layout from '../components/layout/Layout';
import { products } from '../data/products';
import SlidedShow from '../components/home/SlidedShow';
import MorSale from '../components/home/MorSale';
import { useStateContext } from '../context/ContextProvider';
import Items from '../components/Items';

export default function Home() {
  const { openSearch, searchName, searchValueText } = useStateContext();

  const slideShow = products.filter(x => (x.show = true));
  const morSale = products.filter(x => x.rating > 3.5);
  const searchNameList = products.filter(x =>
    x.name.toLowerCase().includes(searchValueText.toLowerCase())
  );

  return (
    <div>
      <Layout title={'Home'}>
        <Box position='relative'>
          <TopList />
          {searchValueText ? (
            <Grid container spacing={1} p={1}>
              {searchNameList.map(x => (
                <Grid item md={4} xs={12}>
                  <Items data={x} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box>
              <SlidedShow data={slideShow} />

              <MorSale data={morSale} text={'more sale'} />
            </Box>
          )}
        </Box>
      </Layout>
    </div>
  );
}
