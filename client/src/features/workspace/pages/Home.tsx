import React, {FC} from 'react';
import Workspace from '../components/Workspace';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import {usersApi} from '../../users/usersService';

const Home: FC = () => {
  const {user: accountUser} = useAppSelector(state => state.authReducer);
  usersApi.useGetByAccountIdQuery({accountId: accountUser.id});

  return <Workspace />;
};

export default Home;
