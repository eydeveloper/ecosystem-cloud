import React, {FC} from 'react';
import CloudWorkspace from '../components/cloud/CloudWorkspace';
import {useAppSelector} from '../hooks/useAppSelector';
import {userApi} from '../services/cloud/UserService';

const Cloud: FC = () => {
  const {user: accountUser} = useAppSelector(state => state.auth);
  const {} = userApi.useGetByAccountIdQuery({accountId: accountUser.accountId});

  return <CloudWorkspace />;
};

export default Cloud;
