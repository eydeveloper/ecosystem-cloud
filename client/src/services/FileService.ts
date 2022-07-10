import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IFile} from '../models/IFile';

export const fileApi = createApi({
  reducerPath: 'fileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/files`
  }),
  tagTypes: ['File'],
  endpoints: build => ({
    getFiles: build.query<IFile[], IFile>({
      query: (arg) => {
        const {userId, parentId} = arg;
        return {
          url: '/',
          params: {userId, parentId}
        };
      },
      providesTags: () => ['File']
    }),

    createDirectory: build.mutation<IFile, IFile>({
      query: ({name, userId, parentId}) => ({
        url: '/createDirectory',
        method: 'POST',
        body: {
          name,
          type: 'directory',
          userId,
          parentId
        }
      }),
      invalidatesTags: ['File']
    })
  })
});
