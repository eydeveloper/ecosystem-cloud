import Box from '@mui/material/Box';
import React, {FC, memo} from 'react';
import {useAppSelector} from '../../../../common/hooks/useAppSelector';
import StackItem from '../StackItem';
import styles from './StackList.module.scss';

const StackList: FC = memo(() => {
  const {stack} = useAppSelector(state => state.filesReducer);

  return (
    <Box className={styles.Container}>
      {stack.map(directory => (
        <StackItem
          className={styles.StackItem}
          directory={directory}
          key={directory.id}
        />
      ))}
    </Box>
  );
});

export default StackList;
