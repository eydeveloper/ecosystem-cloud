import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IFile} from '../../models/IFile';

export const fileApi = createApi({
  reducerPath: 'fileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/files`
  }),
  tagTypes: ['File'],
  endpoints: build => ({
    getFiles: build.query<IFile[], IFile>({
      query: (arg) => {
        const {user, parent} = arg;
        const userId = user.id;
        const parentId = parent.id
        return {
          url: '/',
          params: {userId, parentId}
        };
      }
    })
  })
});
