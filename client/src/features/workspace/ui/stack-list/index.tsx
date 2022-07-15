import Box from '@mui/material/Box';
import React, {FC, memo} from 'react';
import {useAppSelector} from 'shared/lib/hooks/useAppSelector';
import {StackItem} from '../stack-item';
import styles from './styles.module.scss';

export const StackList: FC = memo(() => {
  const {stack} = useAppSelector(state => state.fileReducer);

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
