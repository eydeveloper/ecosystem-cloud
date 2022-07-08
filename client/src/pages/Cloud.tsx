import React, {FC} from 'react';
import {useAppSelector} from '../hooks/useAppSelector';
import {userApi} from '../services/cloud/UserService';

const Cloud: FC = () => {
  const {user: accountUser} = useAppSelector(state => state.auth);
  const {data} = userApi.useGetByAccountIdQuery({accountId: accountUser.accountId});

  return (
    <div>
      Cloud
    </div>
  );
};

export default Cloud;
