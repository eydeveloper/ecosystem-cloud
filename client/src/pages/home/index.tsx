import {Workspace} from 'features/workspace';
import React from 'react';
import {useAppSelector} from 'shared/lib/hooks/useAppSelector';
import {viewerModel} from 'entities/viewer';

const HomePage = () => {
  const {viewer} = useAppSelector(state => state.viewerReducer);
  viewerModel.api.useGetViewerQuery({accountId: viewer.id});

  return <Workspace />;
};

export default HomePage;
