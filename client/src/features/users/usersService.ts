import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getJwtToken} from '../../common/utils/jwt';
import {User} from './user';

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_API_URL}/users`,
  prepareHeaders: (headers) => {
    const token = getJwtToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery,
  tagTypes: ['User'],
  endpoints: build => ({
    getByAccountId: build.query<User, { accountId: string }>({
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