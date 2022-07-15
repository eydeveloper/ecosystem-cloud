import {createSlice} from '@reduxjs/toolkit';
import {api} from './api';
import {
  CreateDirectoryAction,
  File,
  FileState,
  GetFilesAction,
  PushDirectoryToStackAction,
  RemoveDirectoriesFromStack,
  SetCurrentDirectoryIdAction
} from './types';

const initialState: FileState = {
  files: [],
  currentDirectory: {} as File,
  stack: [{id: '', name: 'Мои файлы'} as File],
  createDirectoryDialog: false,
  isDragFileEnter: false
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
    },

    setDragFileEnter(state: FileState, action) {
      state.isDragFileEnter = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      api.endpoints.getFiles.matchFulfilled,
      (state: FileState, action: GetFilesAction) => {
        state.files = action.payload;
      }
    );
    builder.addMatcher(
      api.endpoints.createDirectory.matchFulfilled,
      (state: FileState, action: CreateDirectoryAction) => {
        state.files.push(action.payload);
      }
    );
  }
});

export const actions = fileSlice.actions;
export const reducer = fileSlice.reducer;
