import CssBaseline from '@mui/material/CssBaseline';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import React, {FC, useEffect} from 'react';
import './App.css';
import AppRouter from './components/AppRouter';
import PageLoader from './components/Common/PageLoader/PageLoader';
import Header from './components/Header/Header';
import {useAppSelector} from './hooks/useAppSelector';
import {authApi} from './services/AuthService';
import {setJwtToken} from './utils/jwt';

const App: FC = () => {
  const {isAuthorized} = useAppSelector(state => state.auth);
  const {data, isLoading} = authApi.useVerifyQuery({});

  useEffect(() => {
    if (data?.token) {
      setJwtToken(data.token);
    }
  }, [data]);

  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <Header />
      {isLoading || !isAuthorized ? <PageLoader /> : <AppRouter />}
    </StyledEngineProvider>
  );
};

export default App;
