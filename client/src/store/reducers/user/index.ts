import {createSlice} from '@reduxjs/toolkit';
import {IUser} from '../../../models/IUser';
import {userApi} from '../../../services/cloud/UserService';
import {UserState} from './types';

const initialState: UserState = {
  user: {} as IUser
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      userApi.endpoints.getByAccountId.matchFulfilled,
      (state, action) => {
        state.user.id = action.payload.user.id;
        state.user.limitSpace = action.payload.user.limitSpace;
        state.user.usedSpace = action.payload.user.usedSpace;
      }
    );
  }
});

export default userSlice.reducer;
