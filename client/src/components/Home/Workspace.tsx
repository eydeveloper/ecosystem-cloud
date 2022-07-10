import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ViewCompactOutlined from '@mui/icons-material/ViewCompactOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {IFile} from '../../models/IFile';
import {fileApi} from '../../services/FileService';
import {openCreateDirectoryDialog} from '../../store/reducers/file';
import TypographyVariantH6 from '../Common/Typography/_variant/Typography_variant_h6';
import CreateDirectoryDialog from '../Dialogs/CreateDirectoryDialog/CreateDirectoryDialog';
import styles from './Workspace.module.scss';

const Workspace = () => {
  const [dense] = React.useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(-1);

  const {user} = useAppSelector(state => state.user);
  const {currentDirectory} = useAppSelector(state => state.file);
  const dispatch = useAppDispatch();

  const {data: files, isSuccess} = fileApi.useGetFilesQuery(
    {userId: user.id, parentId: currentDirectory.id} as IFile
  );

  const handleItemClick = (event: React.MouseEvent, index: number) => {
    setSelectedItemIndex(index);
  };

  const handleOpenCreateDirectoryDialog = () => {
    dispatch(openCreateDirectoryDialog());
  };

  return (
    <Box className={styles['Container']}>
      <Box className={styles['Sidebar']}>
        <Button
          className={styles['Create-Button']}
          onClick={handleOpenCreateDirectoryDialog}
          startIcon={<CreateNewFolderOutlinedIcon />}
        >
          Создать папку
        </Button>
      </Box>

      <Box className={styles['Table']}>
        <Box className={styles['Table-Header']}>
          <TypographyVariantH6 className={styles['Table-Header-Title']}>
            Мои файлы
          </TypographyVariantH6>
          <Box className={styles['Table-Header-Controls']}>
            <IconButton>
              <DeleteIcon />
            </IconButton>
            <Box>
              <IconButton>
                <ViewCompactOutlined />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <List className={styles['Table-List']} dense={dense}>
          <ListItem className={styles['Table-List-Header']}>
            <ListItemText
              className={styles['Table-List-Column']}
              secondary="Название"
            />
            <ListItemText
              className={styles['Table-List-Column']}
              secondary="Дата создания"
            />
            <ListItemText
              className={styles['Table-List-Column']}
              secondary="Размер файла"
            />
          </ListItem>

          <Box className={styles['Table-List-Items']}>
            {isSuccess && files.map((file, index) =>
              <ListItemButton
                className={styles['Table-List-Item-Button']}
                key={file.id}
                onClick={(event) => handleItemClick(event, index)}
                selected={selectedItemIndex === index}
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
            )}
          </Box>
        </List>
      </Box>

      <CreateDirectoryDialog />
    </Box>
  );
};

export default Workspace;
