import {createSlice} from '@reduxjs/toolkit';
import {api} from './api';
import {GetViewerAction, Viewer, ViewerState} from './types';

const initialState: ViewerState = {
  viewer: {} as Viewer
};

export const viewerSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      api.endpoints.getViewer.matchFulfilled,
      (state: ViewerState, action: GetViewerAction) => {
        const {id, limitSpace, usedSpace} = action.payload;
        state.viewer.id = id;
        state.viewer.limitSpace = limitSpace;
        state.viewer.usedSpace = usedSpace;
      }
    );
  }
});

export const actions = viewerSlice.actions;
export const reducer = viewerSlice.reducer;
