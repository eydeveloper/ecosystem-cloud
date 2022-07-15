import Button from '@mui/material/Button';
import {fileModel} from 'entities/file';
import React, {FC, memo} from 'react';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch';
import styles from './styles.module.scss';

export interface StackItemProps {
  directory: fileModel.File;
  className: string;
}

export const StackItem: FC<StackItemProps> = memo(({directory}) => {
  const dispatch = useAppDispatch();

  const handlerItemClick = () => {
    dispatch(fileModel.actions.setCurrentDirectoryId(directory.id));
    dispatch(fileModel.actions.removeDirectoriesFromStack(directory.id));
  };

  return (
    <Button className={styles.Container} onClick={handlerItemClick}>
      {directory.name}
    </Button>
  );
});
