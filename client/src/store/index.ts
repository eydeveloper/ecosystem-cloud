import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {authApi} from '../services/auth/AuthService';
import {fileApi} from '../services/cloud/FileService';
import {userApi} from '../services/cloud/UserService';
import reducers from './reducers';

const rootReducer = combineReducers({
  ...reducers,
  [authApi.reducerPath]: authApi.reducer,
  [fileApi.reducerPath]: fileApi.reducer,
  [userApi.reducerPath]: userApi.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(fileApi.middleware)
        .concat(userApi.middleware)
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
