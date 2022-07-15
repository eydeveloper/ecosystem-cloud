import CssBaseline from '@mui/material/CssBaseline';
import {userModel} from 'entities/user';
import {Routing} from '../pages';
import React, {FC, useEffect} from 'react';
import {useAppSelector} from 'shared/lib/hooks/useAppSelector';
import {setJwtToken} from 'shared/lib/utils/jwt';
import {PageLoader} from 'shared/ui';
import {Header} from 'widgets/header/ui';
import './index.scss';
import {withProviders} from './providers';

const App: FC = () => {
  const {isAuthorized} = useAppSelector(state => state.userReducer);
  const {data, isLoading} = userModel.api.useVerifyQuery({});

  useEffect(() => {
    if (data?.token) {
      setJwtToken(data.token);
    }
  }, [data]);

  return (
    <>
      <CssBaseline />
      <Header />
      {isLoading || !isAuthorized ? <PageLoader /> : <Routing />}
    </>
  );
};

export default withProviders(App);
