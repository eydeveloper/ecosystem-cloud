import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, {FC} from 'react';
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch';
import {pushDirectoryToStack, setCurrentDirectoryId} from '../../../files/filesSlice';
import styles from '../Workspace/Workspace.module.scss';
import {ListFileProps} from './index';

const ListFile: FC<ListFileProps> = ({file, onClick, selected}) => {
  const dispatch = useAppDispatch();

  const handlerItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onClick(event, file.id);

    if (event.detail >= 2) {
      dispatch(setCurrentDirectoryId(file.id));
      dispatch(pushDirectoryToStack(file));
    }
  };

  return (
    <ListItemButton
      className={styles['Table-List-Item-Button']}
      key={file.id}
      selected={selected}
      onClick={handlerItemClick}
    >
      <ListItem className={styles['Table-List-Item']}>
        <Box className={styles['Table-List-Column']}>
          <ListItemIcon>
            {file.type === 'directory' ? <FolderIcon /> : <InsertDriveFileIcon />}
          </ListItemIcon>
          <ListItemText primary={file.name} />
        </Box>

        <ListItemText
          className={styles['Table-List-Column']}
          secondary={new Date(file.createdDate).toLocaleDateString()}
        />

        <ListItemText
          className={styles['Table-List-Column']}
          secondary={file.size || '–'}
        />
      </ListItem>
    </ListItemButton>
  );
};

export default ListFile;
