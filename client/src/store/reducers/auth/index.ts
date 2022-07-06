import {createSlice} from '@reduxjs/toolkit';
import {IUser} from '../../../models/IUser';
import {AuthState} from './types';

const initialState: AuthState = {
  isAuthorized: false,
  user: {} as IUser,
  isLoading: false,
  error: ''
};

const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {}
});

export default authSlice.reducer;
