import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {authApi} from '../features/auth/authService';
import {authReducer} from '../features/auth/authSlice';
import {filesApi} from '../features/files/filesService';
import {filesReducer} from '../features/files/filesSlice';
import {usersApi} from '../features/users/usersService';
import {usersReducer} from '../features/users/usersSlice';

const rootReducer = combineReducers({
  authReducer,
  filesReducer,
  usersReducer,
  [authApi.reducerPath]: authApi.reducer,
  [filesApi.reducerPath]: filesApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(filesApi.middleware)
        .concat(usersApi.middleware)
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
