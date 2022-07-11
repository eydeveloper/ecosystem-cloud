import {createSlice} from '@reduxjs/toolkit';
import {GetByAccountIdAction, UserState} from './types';
import {User} from './user';
import {usersApi} from './usersService';

const initialState: UserState = {
  user: {} as User
};

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      usersApi.endpoints.getByAccountId.matchFulfilled,
      (state: UserState, action: GetByAccountIdAction) => {
        const {id, limitSpace, usedSpace} = action.payload;
        state.user.id = id;
        state.user.limitSpace = limitSpace;
        state.user.usedSpace = usedSpace;
      }
    );
  }
});

export const usersReducer = usersSlice.reducer;
