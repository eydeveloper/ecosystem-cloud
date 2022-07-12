import DeleteIcon from '@mui/icons-material/Delete';
import ViewCompactOutlined from '@mui/icons-material/ViewCompactOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import CreateDirectoryDialog from '../Dialogs/CreateDirectoryDialog/CreateDirectoryDialog';
import FilesTable from '../FilesTable';
import Sidebar from '../Sidebar';
import StackList from '../StackList';
import styles from './Workspace.module.scss';

const Workspace = () => {
  const [dense, setDense] = React.useState(false);

  const handleViewCompactButtonClick = () => {
    setDense(!dense);
  };

  return (
    <Box className={styles.Container}>
      <Sidebar />

      <Box className={styles.Table}>
        <Box className={styles.TableHeader}>
          <StackList />

          <Box className={styles.TableHeaderControls}>
            <IconButton>
              <DeleteIcon />
            </IconButton>

            <IconButton onClick={handleViewCompactButtonClick}>
              <ViewCompactOutlined />
            </IconButton>
          </Box>
        </Box>

        <FilesTable dense={dense} />
      </Box>

      <CreateDirectoryDialog />
    </Box>
  );
};

export default Workspace;
