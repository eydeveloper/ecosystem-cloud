import {createSlice} from '@reduxjs/toolkit';
import {fileApi} from '../../../services/cloud/FileService';
import {FileState} from './types';

const initialState: FileState = {
  files: [],
  currentDirectory: {}
};

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      fileApi.endpoints.getFiles.matchFulfilled,
      (state: FileState, action) => {
        state.files = action.payload;
      }
    );
  }
});

export default fileSlice.reducer;
