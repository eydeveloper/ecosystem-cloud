import {createSlice} from '@reduxjs/toolkit';
import {IFile} from '../../../models/IFile';
import {fileApi} from '../../../services/FileService';
import {
  CreateDirectoryAction,
  FileState,
  GetFilesAction,
  PushDirectoryToStackAction, RemoveDirectoriesFromStack,
  SetCurrentDirectoryIdAction
} from './types';

const initialState: FileState = {
  files: [],
  currentDirectory: {} as IFile,
  stack: [{id: '', name: 'Мои файлы'} as IFile],
  createDirectoryDialog: false
};

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setCurrentDirectoryId(state: FileState, action: SetCurrentDirectoryIdAction) {
      state.currentDirectory.id = action.payload;
    },

    pushDirectoryToStack(state: FileState, action: PushDirectoryToStackAction) {
      state.stack.push(action.payload);
    },

    removeDirectoriesFromStack(state: FileState, action: RemoveDirectoriesFromStack) {
      const targetIndex = state.stack.findIndex(
        directory => directory.id === action.payload
      );

      state.stack = state.stack.filter(
        (_, index) => index <= targetIndex
      );
    },

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
      (state: FileState, action: CreateDirectoryAction) => {
        state.files.push(action.payload);
      }
    );
  }
});

export const {
  setCurrentDirectoryId,
  pushDirectoryToStack,
  removeDirectoriesFromStack,
  openCreateDirectoryDialog,
  closeCreateDirectoryDialog
} = fileSlice.actions;

export default fileSlice.reducer;
