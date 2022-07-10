import {createSlice} from '@reduxjs/toolkit';
import {IFile} from '../../../models/IFile';
import {fileApi} from '../../../services/FileService';
import {FileState, GetFilesAction} from './types';

const initialState: FileState = {
  files: [],
  currentDirectory: {} as IFile,
  createDirectoryDialog: false
};

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    openCreateDirectoryDialog(state: FileState) {
      state.createDirectoryDialog = true;
    },

    closeCreateDirectoryDialog(state: FileState) {
      state.createDirectoryDialog = false;
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      fileApi.endpoints.getFiles.matchFulfilled,
      (state: FileState, action: GetFilesAction) => {
        state.files = action.payload;
      }
    );

    builder.addMatcher(
      fileApi.endpoints.createDirectory.matchFulfilled,
      (state: FileState, action) => {
        state.files.push(action.payload);
      }
    );
  }
});

export const {openCreateDirectoryDialog, closeCreateDirectoryDialog} = fileSlice.actions;

export default fileSlice.reducer;
