import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IUser} from '../../models/IUser';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/users`
  }),
  tagTypes: ['User'],
  endpoints: build => ({
    getByAccountId: build.query<IUser, { accountId: string }>({
      query: (arg) => {
        const {accountId} = arg;
        return {
          url: '/getByAccountId',
          params: {accountId}
        };
      }
    })
  })
});
