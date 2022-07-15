import AddIcon from '@mui/icons-material/Add';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {Divider, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {fileModel} from 'entities/file';
import React, {memo, useState} from 'react';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch';
import {useAppSelector} from 'shared/lib/hooks/useAppSelector';
import styles from './styles.module.scss';

export const Sidebar = memo(() => {
  const {viewer} = useAppSelector(state => state.viewerReducer);
  const {currentDirectory} = useAppSelector(state => state.fileReducer);
  const [anchorElCreate, setAnchorElCreate] = useState<null | HTMLElement>(null);
  const [uploadFile] = fileModel.api.useUploadFileMutation();
  const dispatch = useAppDispatch();

  const handleOpenCreateMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCreate(event.currentTarget);
  };

  const handleCloseCreateMenu = () => {
    setAnchorElCreate(null);
  };

  const handleCreateDirectory = () => {
    dispatch(fileModel.actions.openCreateDirectoryDialog());
    setAnchorElCreate(null);
  };

  const handleClickUploadFile = () => {
    setAnchorElCreate(null);
  }

  const handleUploadFile = async (event: any) => {
    const files = [...event.target.files];

    for (const file of files) {
      await uploadFile({file, userId: viewer.id, parentId: currentDirectory.id})
        .unwrap();
    }
  };

  return (
    <Box className={styles.Container}>
      <Button className={styles.CreateButton} onClick={handleOpenCreateMenu}>
        <AddIcon className={styles.CreateButtonIcon} />
        Создать
      </Button>

      <Menu
        className={styles.CreateMenu}
        open={Boolean(anchorElCreate)}
        onClose={handleCloseCreateMenu}
        anchorEl={anchorElCreate}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        keepMounted
      >
        <MenuItem className={styles.CreateMenuItem} onClick={handleCreateDirectory}>
          <CreateNewFolderOutlinedIcon className={styles.CreateMenuItemIcon} />
          <Typography className={styles.CreateMenuItemText}>
            Папку
          </Typography>
        </MenuItem>

        <Divider />

        <label htmlFor="uploadFile">
          <input
            onChange={handleUploadFile}
            accept="*"
            id="uploadFile"
            multiple
            type="file"
            style={{display: 'none'}}
          />
          <MenuItem className={styles.CreateMenuItem} onClick={handleClickUploadFile}>
            <UploadFileIcon className={styles.CreateMenuItemIcon} />
            <Typography className={styles.CreateMenuItemText}>
              Загрузить файлы
            </Typography>
          </MenuItem>
        </label>
      </Menu>
    </Box>
  );
});
