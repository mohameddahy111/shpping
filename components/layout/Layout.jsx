import {
  AppBar,
  Avatar,
  Badge,
  Box,
  createTheme,
  CssBaseline,
  IconButton,
  Link,
  List,
  ListItem,
  Switch,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import styles from '../../styles/layout.module.css';
import NextLink from 'next/link';
import Image from 'next/image';
import { langList, iconList } from '../../data/data';
import {
  ArrowDropDownOutlined,
  Close,
  DarkMode,
  LightMode,
  Menu,
  Search,
  ShoppingCart,
} from '@mui/icons-material';
import Head from 'next/head';
import { useStateContext } from '../../context/ContextProvider';
import SideMenu from '../home/SideMenu';
import { Store } from '../../context/Store';

export default function Layout({ children, title }) {
  const {
    openList,
    setopenList,
    setsearchValueText,
    icon,
    login,
    setlogin,
    loginAvatar,
    setloginAvatar,
  } = useStateContext();
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const [leng, setLeng] = useState({
    name: langList[0].name,
    img: langList[0].img,
  });
  const [showSearch, setShowSearch] = useState(false);
  const [lengList, setLengList] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '2rem',
        fontStyle: 'italic',
        fontWeight: '700',
        textTransform: 'capitalize',
      },
      h2: {
        fontSize: '1.8rem',
        fontStyle: 'italic',
        fontWeight: '600',
        textTransform: 'capitalize',
      },
      h5: {
        fontSize: '1.2rem',
        fontStyle: 'italic',
        fontWeight: '600',
        textTransform: 'capitalize',
      },
    },
    palette: {
      // mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#203040',
      },
      secondary: {
        main: '#f0c000',
      },
    },
  });

  useEffect(() => {
    if (title === 'Home' || title === 'Shop') {
      setShowSearch(true);
    }
  }, [title]);
  function lengClick(x) {
    setLeng({
      name: x.name,
      img: x.img,
    });
    setLengList(false);
  }
  const darkModeHandler = () => {
    setDarkMode(!darkMode);
  };
  const logoutHandler = () => {
    setloginAvatar(false);
    setlogin(false);
  };
  const handlerLogin = () => {
    setloginAvatar(!loginAvatar);
  };
  return (
    <>
      <Head>
        <title>{title ? title + '- Shopping' : 'Shopping'} </title>
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box>
          <AppBar position='static'>
            <Toolbar className={styles.Toolbar}>
              <Box className={darkMode ? styles.logo1 : styles.logo}>
                <NextLink href={'/'} passHref>
                  <Link>
                    <Image
                      src={icon ? icon : '/image/cart1.png'}
                      width={100}
                      height={100}
                    />
                    <Typography component={'h1'} variant='h1'>
                      shopping
                    </Typography>
                  </Link>
                </NextLink>
              </Box>
              {showSearch && (
                <Box className={styles.searchBox}>
                  <label htmlFor='search'>
                    <Search />
                  </label>
                  <input
                    type='text'
                    name='search'
                    id='search'
                    placeholder='Search ....'
                    className={styles.input}
                    onChange={e => {
                      setsearchValueText(e.target.value);
                    }}
                  />
                </Box>
              )}

              <Box className={darkMode ? styles.links : styles.links1}>
                <Box className={styles.iconBar}>
                  <Box className={styles.lang}>
                    <Image
                      src={leng.img}
                      width={20}
                      height={20}
                      style={{ borderRadius: '20px' }}
                    />
                    <ArrowDropDownOutlined
                      onClick={() => {
                        setLengList(!lengList);
                      }}
                      sx={{ cursor: 'pointer' }}
                    />
                    {lengList && (
                      <List
                        className={styles.lengList}
                        onMouseLeave={() => {
                          setLengList(false);
                        }}
                      >
                        {langList.map(x => (
                          <ListItem
                            className={styles.lengListItem}
                            onClick={() => {
                              lengClick(x);
                            }}
                          >
                            <Box>
                              <Image
                                src={x.img}
                                width={20}
                                height={20}
                                style={{ borderRadius: '20px' }}
                              />
                            </Box>
                            <Box>
                              <p>{x.name} </p>
                            </Box>
                          </ListItem>
                        ))}
                      </List>
                    )}
                    <p> {leng.name}</p>
                  </Box>
                </Box>
                <Box className={styles.darkMode}>
                  <Switch
                    checked={darkMode}
                    onChange={darkModeHandler}
                    icon={<LightMode sx={{ color: '#f0c000' }} />}
                    checkedIcon={<DarkMode sx={{ color: '#208080' }} />}
                  />
                </Box>
                {cartItems.length > 0 ? (
                  <NextLink href={'/priPage/cart'} passHref>
                    <Link>
                      <Badge badgeContent={cartItems.length}>
                        <ShoppingCart />
                      </Badge>
                    </Link>
                  </NextLink>
                ) : (
                  <NextLink href={'/priPage/cart'} passHref>
                    <Link>
                      <Typography component={'h2'} variant='h2'>
                        cart
                      </Typography>
                    </Link>
                  </NextLink>
                )}
                {login ? (
                  <Box
                    className={styles.avatar}
                    onClick={handlerLogin}
                    sx={{ cursor: 'pointer' }}
                  >
                    <Box className={styles.avatarContener}>
                      <Avatar src='https://i.pinimg.com/564x/8a/91/bf/8a91bf7cede4e87ad9d4fac6ffec4baa.jpg' />
                      <ArrowDropDownOutlined />
                    </Box>
                    <Box>
                      <p>hi ,mohamed </p>
                    </Box>
                    {loginAvatar && (
                      <Box className={styles.loninList}>
                        <list>
                          <ListItem>
                            <Typography component={'h5'} variant='h5'>
                              profile
                            </Typography>
                          </ListItem>
                          <ListItem>
                            <Typography component={'h5'} variant='h5'>
                              setting
                            </Typography>
                          </ListItem>
                          <ListItem onClick={logoutHandler}>
                            <Typography component={'h5'} variant='h5'>
                              long out
                            </Typography>
                          </ListItem>
                        </list>
                        <IconButton
                          onClick={handlerLogin}
                          sx={{ backgroundColor: '#fff' }}
                        >
                          <Close />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <NextLink href={'/users/login'} passHref>
                    <Link>
                      <Typography component={'h2'} variant='h2'>
                        login
                      </Typography>
                    </Link>
                  </NextLink>
                )}
              </Box>
            </Toolbar>
            {showSearch && (
              <Box className={styles.logoText}>
                <Typography component={'h2'} variant='h2'>
                  Shop with us, find your dreams
                </Typography>
                <Typography component={'h5'} variant='h5'>
                  Every time a new surprise
                </Typography>
              </Box>
            )}
            <Box>
              <IconButton
                onClick={() => {
                  setopenList(!openList);
                }}
              >
                <Menu sx={{ color: '#fff' }} />
              </IconButton>
              <SideMenu title={title} />
            </Box>
          </AppBar>
          <Box>
            <main className={styles.main}>{children}</main>
          </Box>
          <footer className={styles.footer}></footer>
        </Box>
      </ThemeProvider>
    </>
  );
}
