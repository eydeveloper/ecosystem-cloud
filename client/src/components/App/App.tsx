import {CssBaseline} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import React, {FC, useEffect} from 'react';
import {useAppSelector} from '../../hooks/useAppSelector';
import {authApi} from '../../services/auth/AuthService';
import {saveJwtToken} from '../../utils/jwt';
import Loader from '../Common/Loader';
import Header from '../Header';
import './App.css';
import AppRouter from './AppRouter';

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
      saveJwtToken(data.token);
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