import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, {FC, memo} from 'react';
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch';
import {pushDirectoryToStack, setCurrentDirectoryId} from '../../../files/filesSlice';
import styles from './ListFile.module.scss';
import {ListFileProps} from './index';

const ListFile: FC<ListFileProps> = memo(({file, onClick, selected}) => {
  const dispatch = useAppDispatch();

  const handlerItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onClick(event, file.id);

    if (file.type === 'directory' && event.detail >= 2) {
      dispatch(setCurrentDirectoryId(file.id));
      dispatch(pushDirectoryToStack(file));
    }
  };

  return (
    <ListItemButton
      className={styles.TableListItemButton}
      key={file.id}
      selected={selected}
      onClick={handlerItemClick}
    >
      <ListItem className={styles.TableListItem}>
        <Box className={styles.TableListColumn}>
          <ListItemIcon>
            {file.type === 'directory' ? <FolderIcon /> : <InsertDriveFileIcon />}
          </ListItemIcon>
          <ListItemText primary={file.name} />
        </Box>

        <ListItemText
          className={styles.TableListColumn}
          secondary={new Date(file.createdDate).toLocaleDateString()}
        />

        <ListItemText
          className={styles.TableListColumn}
          secondary={file.size || '–'}
        />
      </ListItem>
    </ListItemButton>
  );
});

export default ListFile;
