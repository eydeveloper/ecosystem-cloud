import {createSlice} from '@reduxjs/toolkit';
import {IFile} from '../../../models/IFile';
import {fileApi} from '../../../services/cloud/FileService';
import {FileState, GetFilesAction} from './types';

const initialState: FileState = {
  files: [],
  currentDirectory: {} as IFile
};

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      fileApi.endpoints.getFiles.matchFulfilled,
      (state: FileState, action: GetFilesAction) => {
        state.files = action.payload;
      }
    );
  }
});

export default fileSlice.reducer;
