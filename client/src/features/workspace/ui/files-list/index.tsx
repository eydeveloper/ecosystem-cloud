import Box from '@mui/material/Box';
import {fileModel} from 'entities/file';
import React, {FC, useState} from 'react';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch';
import {useAppSelector} from 'shared/lib/hooks/useAppSelector';
import {Loader} from 'shared/ui';
import {FilesListItem} from '../files-list-item';
import styles from './styles.module.scss';

export const FilesList: FC = () => {
  const [selectedItemId, setSelectedItemId] = useState('');
  const {viewer} = useAppSelector(state => state.viewerReducer);
  const {currentDirectory} = useAppSelector(state => state.fileReducer);
  const dispatch = useAppDispatch();

  const handleItemClick = (event: React.MouseEvent, fileId: string) => {
    setSelectedItemId(fileId);
  };

  const {data: files, isFetching, isSuccess} = fileModel.api.useGetFilesQuery(
    {userId: viewer.id, parentId: currentDirectory.id} as fileModel.File
  );

  const handleOnDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(fileModel.actions.setDragFileEnter(true));
  };

  const handleOnDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(fileModel.actions.setDragFileEnter(false));
  };

  const handleOnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(fileModel.actions.setDragFileEnter(true));
  };

  return (
    <Box
      className={styles.Container}
      onDragEnter={handleOnDragEnter}
      onDragLeave={handleOnDragLeave}
      onDragOver={handleOnDragOver}
    >
      {isFetching ? <Loader /> :
        <>
          {isSuccess && files.map((file) =>
            <FilesListItem
              key={file.id}
              file={file}
              onClick={handleItemClick}
              selected={selectedItemId === file.id}
            />
          )}
        </>
      }
    </Box>
  );
};
