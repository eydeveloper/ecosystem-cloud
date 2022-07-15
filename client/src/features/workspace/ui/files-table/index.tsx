import List from '@mui/material/List';
import {fileModel} from 'entities/file';
import React, {FC} from 'react';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch';
import {FilesList} from '../files-list';
import {FilesTableHeader} from '../files-table-header';
import styles from './styles.module.scss';

export interface FilesTableProps {
  dense: boolean;
}

export const FilesTable: FC<FilesTableProps> = ({dense}) => {
  const dispatch = useAppDispatch();

  const handleOnDragEnter = (event: React.DragEvent<HTMLUListElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(fileModel.actions.setDragFileEnter(true));
  };

  const handleOnDragLeave = (event: React.DragEvent<HTMLUListElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(fileModel.actions.setDragFileEnter(false));
  };

  const handleOnDragOver = (event: React.DragEvent<HTMLUListElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(fileModel.actions.setDragFileEnter(true));
  };

  return (
    <List
      className={styles.TableList}
      dense={dense}
      onDragEnter={handleOnDragEnter}
      onDragLeave={handleOnDragLeave}
      onDragOver={handleOnDragOver}
    >
      <FilesTableHeader />
      <FilesList />
    </List>
  );
};
