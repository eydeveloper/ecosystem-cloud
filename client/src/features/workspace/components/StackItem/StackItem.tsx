import Button from '@mui/material/Button';
import React, {FC, memo} from 'react';
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch';
import {removeDirectoriesFromStack, setCurrentDirectoryId} from '../../../files/filesSlice';
import {StackItemProps} from './index';
import styles from './StackItem.module.scss';

const StackItem: FC<StackItemProps> = memo(({directory}) => {
  const dispatch = useAppDispatch();

  const handlerItemClick = () => {
    dispatch(setCurrentDirectoryId(directory.id));
    dispatch(removeDirectoriesFromStack(directory.id));
  };

  return (
    <Button className={styles.Container} onClick={handlerItemClick}>
      {directory.name}
    </Button>
  );
});

export default StackItem;
