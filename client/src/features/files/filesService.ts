import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getJwtToken} from '../../common/utils/jwt';
import {File} from './file';

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_API_URL}/files`,
  prepareHeaders: (headers) => {
    const token = getJwtToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

export const filesApi = createApi({
  reducerPath: 'filesApi',
  baseQuery,
  tagTypes: ['File'],
  endpoints: build => ({
    getFiles: build.query<File[], File>({
      query: (arg) => {
        const {userId, parentId} = arg;
        return {
          url: '/',
          params: {userId, parentId}
        };
      },
      providesTags: () => ['File']
    }),
    createDirectory: build.mutation<File, File>({
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
