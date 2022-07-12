import {createSlice} from '@reduxjs/toolkit';
import {File} from './file';
import {filesApi} from './filesService';
import {
  CreateDirectoryAction,
  FileState,
  GetFilesAction,
  PushDirectoryToStackAction, RemoveDirectoriesFromStack,
  SetCurrentDirectoryIdAction
} from './types';

const initialState: FileState = {
  files: [],
  currentDirectory: {} as File,
  stack: [{id: '', name: 'Мои файлы'} as File],
  createDirectoryDialog: false
};

export const filesSlice = createSlice({
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
    },

    addFile(state: FileState, action) {
      state.files.push(action.payload);
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      filesApi.endpoints.getFiles.matchFulfilled,
      (state: FileState, action: GetFilesAction) => {
        state.files = action.payload;
      }
    );

    builder.addMatcher(
      filesApi.endpoints.createDirectory.matchFulfilled,
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
  closeCreateDirectoryDialog,
  addFile
} = filesSlice.actions;

export const filesReducer = filesSlice.reducer;
