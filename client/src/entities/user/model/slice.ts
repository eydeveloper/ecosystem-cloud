import {createSlice} from '@reduxjs/toolkit';
import {removeJwtToken} from 'shared/lib/utils/jwt';
import {api} from './api';
import {User, UserState, VerifyActionSuccess} from './types';

const initialState: UserState = {
  user: {} as User,
  isAuthorized: false,
  isLoading: true,
  error: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state: UserState) {
      removeJwtToken();
      state.isAuthorized = false;
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      api.endpoints.verify.matchFulfilled,
      (state: UserState, action: VerifyActionSuccess) => {
        const user = action.payload.user;
        state.isAuthorized = true;
        state.user = {...user};
      }
    );
    builder.addMatcher(
      api.endpoints.verify.matchRejected,
      (state: UserState, action) => {
        if (action.payload?.status === 401) {
          state.isAuthorized = false;
          window.location.href = `${process.env.REACT_APP_ACCOUNT_URL}/login`;
        }
      }
    );
  }
});

export const actions = userSlice.actions;
export const reducer = userSlice.reducer;
