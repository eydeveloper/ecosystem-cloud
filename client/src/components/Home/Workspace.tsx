import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {Paper} from '@mui/material';
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
    <Box className={styles.Container}>
      <Box className={styles.Sidebar}>
        <Button
          className={styles.CreateButton}
          onClick={handleOpenCreateDirectoryDialog}
          startIcon={<CreateNewFolderOutlinedIcon />}
        >
          Создать папку
        </Button>
      </Box>

      <Box className={styles.TableContainer}>
        <Box className={styles.TableHeader}>
          <TypographyVariantH6 className={styles.TableHeaderTitle}>
            Файлы
          </TypographyVariantH6>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Box>

        <List dense={dense}>
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

          <Box className={styles.TableList}>
          {isSuccess && files.map((file, index) =>
            <ListItemButton
              className={styles.TableListItemButton}
              key={file.id}
              onClick={(event) => handleItemClick(event, index)}
              selected={selectedItemIndex === index}
            >
              <ListItem>
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
          )}
          </Box>
        </List>
      </Box>

      <CreateDirectoryDialog />
    </Box>
  );
};

export default Workspace;
