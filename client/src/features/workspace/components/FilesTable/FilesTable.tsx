import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React, {FC} from 'react';
import FilesList from '../FilesList';
import styles from '../Workspace/Workspace.module.scss';
import {FilesTableProps} from './index';

const FilesTable: FC<FilesTableProps> = ({dense}) => {
  return (
    <List className={styles.TableList} dense={dense}>
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

      <FilesList />
    </List>
  );
};

export default FilesTable;