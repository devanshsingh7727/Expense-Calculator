import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import createCache from '@emotion/cache';

import { CacheProvider } from '@emotion/react';

import CssBaseline from '@mui/material/CssBaseline';
import Icon from '@mui/material/Icon';
import { ThemeProvider } from '@mui/material/styles';

import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

import MDBox from '/components/MDBox';

import theme from '/assets/theme';
import themeRTL from '/assets/theme/theme-rtl';
import themeDark from '/assets/theme-dark';
import themeDarkRTL from '/assets/theme-dark/theme-rtl';

import rtlPlugin from 'stylis-plugin-rtl';

import {
  MaterialUIControllerProvider,
  setMiniSidenav,
  setOpenConfigurator,
  useMaterialUIController,
} from '/context';

// import appleIcon from '/assets/images/apple-icon.png';
// import favicon from '/assets/images/favicon.png';
// import brandDark from '/assets/images/logo-ct-dark.png';
// import brandWhite from '/assets/images/logo-ct.png';

const clientSideEmotionCache = createCache({ key: 'css', prepend: true });

function Main({ Component, pageProps }) {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useRouter();

  useMemo(() => {
    const cacheRtl = createCache({
      key: 'rtl',
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute('dir', direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  // const brandIcon =
  //   (transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite;

  const configsButton = (
    <MDBox
      display='flex'
      justifyContent='center'
      alignItems='center'
      width='3.25rem'
      height='3.25rem'
      bgColor='white'
      shadow='sm'
      borderRadius='50%'
      position='fixed'
      right='2rem'
      bottom='2rem'
      zIndex={99}
      color='dark'
      sx={{ cursor: 'pointer' }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize='small' color='inherit'>
        settings
      </Icon>
    </MDBox>
  );

  return (
    <ThemeProvider theme={true ? themeDark : theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  return (
    <MaterialUIControllerProvider>
      <CacheProvider value={emotionCache}>
        <Head>
          {/* <meta name='viewport' content='width=device-width, initial-scale=1' /> */}
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
          />
          {/* <link rel='shortcut icon' href={favicon.src} /> */}
          {/* <link rel='apple-touch-icon' sizes='76x76' href={appleIcon.src} /> */}
          <title>Expense Calculator </title>
        </Head>
        <Main Component={Component} pageProps={pageProps} />
      </CacheProvider>
    </MaterialUIControllerProvider>
  );
}

export default MyApp;
