import {createSlice} from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import {IUser} from '../../../models/IUser';
import {authApi} from '../../../services/auth/AuthService';
import {AuthState} from './types';

const initialState: AuthState = {
  isAuthorized: false,
  user: {} as IUser,
  isLoading: false,
  error: ''
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state: AuthState) {
      Cookies.remove('jwtToken');
      state.isAuthorized = false;
      window.location.href = `${process.env.REACT_APP_ACCOUNT_URL}/login`;
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.verify.matchFulfilled,
      (state: AuthState, action) => {
        state.isAuthorized = true;
        state.user = {...action.payload.user, accountId: action.payload.user.id};
      }
    );

    builder.addMatcher(
      authApi.endpoints.verify.matchRejected,
      (state: AuthState) => {
        state.isAuthorized = false;
        window.location.href = `${process.env.REACT_APP_ACCOUNT_URL}/login`;
      }
    );
  }
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
