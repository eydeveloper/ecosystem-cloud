import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {fileModel} from '../entities/file';
import {userModel} from '../entities/user';
import {viewerModel} from '../entities/viewer';

const rootReducer = combineReducers({
  fileReducer: fileModel.reducer,
  userReducer: userModel.reducer,
  viewerReducer: viewerModel.reducer,
  [fileModel.api.reducerPath]: fileModel.api.reducer,
  [userModel.api.reducerPath]: userModel.api.reducer,
  [viewerModel.api.reducerPath]: viewerModel.api.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(userModel.api.middleware)
        .concat(fileModel.api.middleware)
        .concat(viewerModel.api.middleware)
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
