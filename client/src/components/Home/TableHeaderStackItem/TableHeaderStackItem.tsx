import Button from '@mui/material/Button';
import React, {FC} from 'react';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {removeDirectoriesFromStack, setCurrentDirectoryId} from '../../../store/reducers/file';
import styles from '../Workspace.module.scss';
import {ITableHeaderStackItemProps} from './index';

const TableHeaderStackItem: FC<ITableHeaderStackItemProps> = ({directory}) => {
  const dispatch = useAppDispatch();

  const handlerItemClick = () => {
    dispatch(setCurrentDirectoryId(directory.id));
    dispatch(removeDirectoriesFromStack(directory.id));
  };

  return (
    <Button className={styles['Table-Header-Stack-Item']} onClick={handlerItemClick}>
      {directory.name}
    </Button>
  );
};

export default TableHeaderStackItem;
