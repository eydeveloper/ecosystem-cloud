import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getJwtToken} from 'shared/lib/utils/jwt';
import {Viewer} from './types';

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

export const api = createApi({
  reducerPath: 'viewerApi',
  baseQuery,
  tagTypes: ['Viewer'],
  endpoints: build => ({
    getViewer: build.query<Viewer, {}>({
      query: () => {
        return {
          url: '/'
        };
      }
    })
  })
});
