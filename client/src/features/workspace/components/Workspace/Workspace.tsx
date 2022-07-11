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
import Loader from '../../../../common/components/Loader/Loader';
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch';
import {useAppSelector} from '../../../../common/hooks/useAppSelector';
import {File} from '../../../files/file';
import {filesApi} from '../../../files/filesService';
import {openCreateDirectoryDialog} from '../../../files/filesSlice';
import CreateDirectoryDialog from '../Dialogs/CreateDirectoryDialog/CreateDirectoryDialog';
import ListFile from '../ListFile';
import StackItem from '../StackItem';
import styles from './Workspace.module.scss';

const Workspace = () => {
  const [dense] = React.useState(false);
  const [selectedItemId, setSelectedItemId] = React.useState('');

  const {user} = useAppSelector(state => state.usersReducer);
  const {currentDirectory, stack} = useAppSelector(state => state.filesReducer);
  const dispatch = useAppDispatch();

  const {data: files, isFetching, isSuccess} = filesApi.useGetFilesQuery(
    {userId: user.id, parentId: currentDirectory.id} as File
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
              <StackItem
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
              <>
                {isSuccess && files.map((file) =>
                  <ListFile
                    key={file.id}
                    file={file}
                    onClick={handleItemClick}
                    selected={selectedItemId === file.id}
                  />
                )}
              </>
            }
          </Box>
        </List>
      </Box>

      <CreateDirectoryDialog />
    </Box>
  );
};

export default Workspace;
