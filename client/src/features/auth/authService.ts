import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getJwtToken} from '../../common/utils/jwt';
import {Auth} from './auth';

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

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  tagTypes: ['Auth'],
  endpoints: build => ({
    verify: build.query<Auth, {}>({
      query: () => ({
        url: '/verify'
      })
    })
  })
});
