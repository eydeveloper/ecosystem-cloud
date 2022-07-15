import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {fileModel} from 'entities/file';
import React, {FC, memo} from 'react';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch';
import styles from './styles.module.scss';

export interface ListFileProps {
  onClick: (event: React.MouseEvent, fileId: string) => void;
  file: fileModel.File;
  selected: boolean;
}

export const FilesListItem: FC<ListFileProps> = memo(({file, onClick, selected}) => {
  const dispatch = useAppDispatch();

  const handlerItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onClick(event, file.id);

    if (file.type === 'directory' && event.detail >= 2) {
      dispatch(fileModel.actions.setCurrentDirectoryId(file.id));
      dispatch(fileModel.actions.pushDirectoryToStack(file));
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
