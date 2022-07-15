import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewCompactOutlined from '@mui/icons-material/ViewCompactOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import React from 'react';
import {useAppSelector} from 'shared/lib/hooks/useAppSelector';
import {CreateDirectoryDialog} from '../create-directory-dialog';
import {FilesTable} from '../files-table';
import {Sidebar} from '../sidebar';
import {StackList} from '../stack-list';
import styles from './styles.module.scss';

export const Workspace = () => {
  const [dense, setDense] = React.useState(false);
  const {isDragFileEnter} = useAppSelector(state => state.fileReducer)

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

      {isDragFileEnter &&
        <Box sx={{
          position: 'absolute',
          bgcolor: 'primary.main',
          color: '#fff',
          left: 'calc(50% - 15rem)',
          bottom: '20px',
          padding: 2,
          maxWidth: '30rem',
          textAlign: 'center',
          zIndex: 1,
          borderRadius: 1
        }}>
          <CloudUploadIcon />
          <Typography>Перемещенные файлы будут сразу загружены в эту папку:</Typography>
          <Typography>Мои файлы</Typography>
        </Box>
      }

      <CreateDirectoryDialog />
    </Box>
  );
};
