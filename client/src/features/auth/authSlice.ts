import {createSlice} from '@reduxjs/toolkit';
import {removeJwtToken} from '../../common/utils/jwt';
import {AccountUser} from '../users/user';
import {authApi} from './authService';
import {AuthState, VerifyActionSuccess} from './types';

const initialState: AuthState = {
  isAuthorized: false,
  user: {} as AccountUser,
  isLoading: false,
  error: ''
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state: AuthState) {
      removeJwtToken();
      state.isAuthorized = false;
      window.location.href = `${process.env.REACT_APP_ACCOUNT_URL}/login`;
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.verify.matchFulfilled,
      (state: AuthState, action: VerifyActionSuccess) => {
        const user = action.payload.user;
        state.isAuthorized = true;
        state.user = {...user};
      }
    );
    builder.addMatcher(
      authApi.endpoints.verify.matchRejected,
      (state: AuthState, action) => {
        if (action.payload?.status === 401) {
          state.isAuthorized = false;
          window.location.href = `${process.env.REACT_APP_ACCOUNT_URL}/login`;
        }
      }
    );
  }
});

export const {logout} = authSlice.actions;

export const authReducer = authSlice.reducer;
