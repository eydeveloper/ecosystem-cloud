import {createSlice} from '@reduxjs/toolkit';
import {IUser} from '../../../models/IUser';
import {userApi} from '../../../services/cloud/UserService';
import {GetByAccountIdAction, UserState} from './types';

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
      (state: UserState, action: GetByAccountIdAction) => {
        const {id, limitSpace, usedSpace} = action.payload;
        state.user.id = id;
        state.user.limitSpace = limitSpace;
        state.user.usedSpace = usedSpace;
      }
    );
  }
});

export default userSlice.reducer;
