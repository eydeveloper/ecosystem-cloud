import CssBaseline from '@mui/material/CssBaseline';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import React, {FC, useEffect} from 'react';
import Header from '../common/components/Header/Header';
import PageLoader from '../common/components/Loader/PageLoader/PageLoader';
import {useAppSelector} from '../common/hooks/useAppSelector';
import {setJwtToken} from '../common/utils/jwt';
import {authApi} from '../features/auth/authService';
import './App.scss';
import AppRouter from './AppRouter';

const App: FC = () => {
  const {isAuthorized} = useAppSelector(state => state.authReducer);
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
