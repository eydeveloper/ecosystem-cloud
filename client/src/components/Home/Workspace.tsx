import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewCompactOutlined from '@mui/icons-material/ViewCompactOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {IFile} from '../../models/IFile';
import {fileApi} from '../../services/FileService';
import {openCreateDirectoryDialog} from '../../store/reducers/file';
import Loader from '../Common/Loader/Loader';
import CreateDirectoryDialog from '../Dialogs/CreateDirectoryDialog/CreateDirectoryDialog';
import TableHeaderStackItem from './TableHeaderStackItem/TableHeaderStackItem';
import TableListItemButton from './TableListItemButton/TableListItemButton';
import styles from './Workspace.module.scss';

const Workspace = () => {
  const [dense] = React.useState(false);
  const [selectedItemId, setSelectedItemId] = React.useState('');

  const {user} = useAppSelector(state => state.user);
  const {currentDirectory, stack} = useAppSelector(state => state.file);
  const dispatch = useAppDispatch();

  const {data: files, isLoading, isFetching, isSuccess} = fileApi.useGetFilesQuery(
    {userId: user.id, parentId: currentDirectory.id} as IFile
  );

  const handleItemClick = (event: React.MouseEvent, fileId: string) => {
    setSelectedItemId(fileId);
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
          <Box className={styles['Table-Header-Stack']}>
            {stack.map(directory => (
              <TableHeaderStackItem
                key={directory.id}
                className={styles['Table-Header-Stack-Item']}
                directory={directory}
              />
            ))}
          </Box>

          <Box className={styles['Table-Header-Controls']}>
            <IconButton>
              <DeleteIcon />
            </IconButton>

            <IconButton>
              <ViewCompactOutlined />
            </IconButton>
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
            {isFetching ? <Loader /> :
              <React.Fragment>
                {isSuccess && files.map((file) =>
                  <TableListItemButton
                    key={file.id}
                    file={file}
                    onClick={handleItemClick}
                    selected={selectedItemId === file.id}
                  />
                )}
              </React.Fragment>
            }
          </Box>
        </List>
      </Box>

      <CreateDirectoryDialog />
    </Box>
  );
};

export default Workspace;
