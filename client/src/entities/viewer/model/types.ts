export interface Viewer {
  id: string;
  accountId: string;
  limitSpace: number;
  usedSpace: number;
}

export interface ViewerState {
  viewer: Viewer;
}

export interface GetViewerAction {
  payload: Viewer;
}
