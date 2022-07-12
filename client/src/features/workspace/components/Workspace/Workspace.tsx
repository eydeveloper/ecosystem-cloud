import DeleteIcon from '@mui/icons-material/Delete';
import ViewCompactOutlined from '@mui/icons-material/ViewCompactOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import Loader from '../../../../common/components/Loader/Loader';
import {useAppSelector} from '../../../../common/hooks/useAppSelector';
import {File} from '../../../files/file';
import {filesApi} from '../../../files/filesService';
import CreateDirectoryDialog from '../Dialogs/CreateDirectoryDialog/CreateDirectoryDialog';
import ListFile from '../ListFile';
import Sidebar from '../Sidebar';
import StackItem from '../StackItem';
import styles from './Workspace.module.scss';

const Workspace = () => {
  const [dense] = React.useState(false);
  const [selectedItemId, setSelectedItemId] = React.useState('');

  const {user} = useAppSelector(state => state.usersReducer);
  const {currentDirectory, stack} = useAppSelector(state => state.filesReducer);

  const {data: files, isFetching, isSuccess} = filesApi.useGetFilesQuery(
    {userId: user.id, parentId: currentDirectory.id} as File
  );

  const handleItemClick = (event: React.MouseEvent, fileId: string) => {
    setSelectedItemId(fileId);
  };

  return (
    <Box className={styles.Container}>
      <Sidebar />

      <Box className={styles.Table}>
        <Box className={styles.TableHeader}>
          <Box className={styles.TableHeaderStack}>
            {stack.map(directory => (
              <StackItem
                key={directory.id}
                className={styles.TableHeaderStackItem}
                directory={directory}
              />
            ))}
          </Box>

          <Box className={styles.TableHeaderControls}>
            <IconButton>
              <DeleteIcon />
            </IconButton>

            <IconButton>
              <ViewCompactOutlined />
            </IconButton>
          </Box>
        </Box>

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

          <Box className={styles.TableListItems}>
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
