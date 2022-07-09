import {CssBaseline} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import React, {FC, useEffect} from 'react';
import './App.css';
import AppRouter from './components/AppRouter';
import Loader from './components/common/Loader';
import Header from './components/header/Header';
import {useAppSelector} from './hooks/useAppSelector';
import {authApi} from './services/auth/AuthService';
import {setJwtToken} from './utils/jwt';

const theme = createTheme({
  palette: {
    mode: 'light'
  }
});

const App: FC = () => {
  const {isAuthorized} = useAppSelector(state => state.auth);
  const {data, isLoading} = authApi.useVerifyQuery({});

  useEffect(() => {
    if (data?.token) {
      setJwtToken(data.token);
    }
  }, [data]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      {isLoading || !isAuthorized ? <Loader /> : <AppRouter />}
    </ThemeProvider>
  );
};

export default App;
