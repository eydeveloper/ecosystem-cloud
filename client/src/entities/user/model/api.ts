import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getJwtToken} from 'shared/lib/utils/jwt';
import {User} from './types';

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_ACCOUNT_API_URL}/auth`,
  prepareHeaders: (headers) => {
    const token = getJwtToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

export const api = createApi({
  reducerPath: 'userApi',
  baseQuery,
  tagTypes: ['User'],
  endpoints: build => ({
    verify: build.query<{ token: string, user: User }, {}>({
      query: () => ({
        url: '/verify'
      })
    })
  })
});
