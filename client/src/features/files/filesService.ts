import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import axios from 'axios';
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
      query: ({userId, parentId}) => {
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
    }),

    uploadFile: build.mutation<File, { file: any, userId: string, parentId: string }>({
      async queryFn(args) {
        const {file, userId, parentId} = args;
        const formData = new FormData();

        formData.append('file', file);
        formData.append('userId', userId);

        if (parentId) {
          formData.append('parentId', parentId);
        }

        return await axios.post(`${process.env.REACT_APP_API_URL}/files/uploadFile`, formData, {
          headers: {Authorization: `Bearer ${getJwtToken()}`},
          onUploadProgress: progressEvent => {
            const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
            if (totalLength) {
              let progress = Math.round((progressEvent.loaded * 100) / totalLength);
            }
          }
        });
      },
      invalidatesTags: ['File']
    })
  })
});
