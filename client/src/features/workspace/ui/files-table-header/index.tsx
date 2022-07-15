import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React, {memo} from 'react';
import styles from '../workspace/styles.module.scss';

export const FilesTableHeader = memo(() => {
  return (
    <ListItem className={styles.TableListHeader}>
      <ListItemText
        className={styles.TableListColumn}
        secondary="Название"
      />
      <ListItemText
        className={styles.TableListColumn}
        secondary="Дата создания"
      />
      <ListItemText
        className={styles.TableListColumn}
        secondary="Размер файла"
      />
    </ListItem>
  );
});
