import React, {FC, useEffect} from 'react';
import {useAppSelector} from '../hooks/useAppSelector';
import {userApi} from '../services/cloud/UserService';

const Cloud: FC = () => {
  const {user: accountUser} = useAppSelector(state => state.auth);
  const {} = userApi.useGetDataQuery({userId: accountUser.accountId});

  return (
    <div>
      Cloud
    </div>
  );
};

export default Cloud;