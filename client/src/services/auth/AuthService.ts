import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import {IAuth} from '../../models/IAuth';

interface AuthError {
  data: {
    message: string;
    errors: []
  },
  status: number;
}

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_ACCOUNT_API_URL}/auth`,
  prepareHeaders: (headers) => {
    const token = Cookies.get('jwtToken');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }
}) as BaseQueryFn<string | FetchArgs, unknown, AuthError>;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  tagTypes: ['Auth'],
  endpoints: build => ({
    verify: build.query<IAuth, {}>({
      query: () => ({
        url: '/verify'
      })
    })
  })
});