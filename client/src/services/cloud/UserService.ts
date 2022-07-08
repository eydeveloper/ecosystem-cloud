import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/users`
  }),
  tagTypes: ['User'],
  endpoints: build => ({
    getData: build.query<any, { userId: string }>({
      query: (arg) => {
        const {userId} = arg;
        return {
          url: '/getData',
          params: {userId}
        };
      }
    })
  })
});