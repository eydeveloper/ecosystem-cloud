import React, {FC} from 'react';
import Workspace from '../components/Home/Workspace';
import {useAppSelector} from '../hooks/useAppSelector';
import {userApi} from '../services/UserService';

const Home: FC = () => {
  const {user: accountUser} = useAppSelector(state => state.auth);
  const {} = userApi.useGetByAccountIdQuery({accountId: accountUser.accountId});

  return <Workspace />;
};

export default Home;
