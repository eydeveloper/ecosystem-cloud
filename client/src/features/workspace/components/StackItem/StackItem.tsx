import Button from '@mui/material/Button';
import React, {FC} from 'react';
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch';
import {removeDirectoriesFromStack, setCurrentDirectoryId} from '../../../files/filesSlice';
import styles from '../Workspace/Workspace.module.scss';
import {StackItemProps} from './index';

const StackItem: FC<StackItemProps> = ({directory}) => {
  const dispatch = useAppDispatch();

  const handlerItemClick = () => {
    dispatch(setCurrentDirectoryId(directory.id));
    dispatch(removeDirectoriesFromStack(directory.id));
  };

  return (
    <Button className={styles.TableHeaderStackItem} onClick={handlerItemClick}>
      {directory.name}
    </Button>
  );
};

export default StackItem;
