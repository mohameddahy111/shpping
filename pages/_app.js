import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { ContextProvider } from '../context/ContextProvider';
import { SnackbarProvider } from 'notistack';
import { StoreProvider } from '../context/Store';

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <StoreProvider>
        <ContextProvider>
          <Component {...pageProps} />
        </ContextProvider>
      </StoreProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
