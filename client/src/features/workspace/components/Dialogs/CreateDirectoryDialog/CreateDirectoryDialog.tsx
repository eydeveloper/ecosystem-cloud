import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, {useState} from 'react';
import {useAppDispatch} from '../../../../../common/hooks/useAppDispatch';
import {useAppSelector} from '../../../../../common/hooks/useAppSelector';
import {File} from '../../../../files/file';
import {filesApi} from '../../../../files/filesService';
import {closeCreateDirectoryDialog} from '../../../../files/filesSlice';
import styles from './CreateDirectoryDialog.module.scss';

export default function CreateDirectoryDialog() {
  const {user} = useAppSelector(state => state.usersReducer);
  const {currentDirectory, createDirectoryDialog} = useAppSelector(state => state.filesReducer);
  const [directoryName, setDirectoryName] = useState('Без названия');
  const dispatch = useAppDispatch();
  const [createDirectory] = filesApi.useCreateDirectoryMutation();

  const handleInputDirectoryName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDirectoryName(event.target.value);
  };

  const handleCreateDirectory = async () => {
    await createDirectory({
      name: directoryName,
      userId: user.id,
      parentId: currentDirectory.id
    } as File).unwrap();
    dispatch(closeCreateDirectoryDialog());
    setDirectoryName('Без названия');
  };

  const handleCloseCreateDirectoryDialog = () => {
    dispatch(closeCreateDirectoryDialog());
  };

  return (
    <Dialog open={createDirectoryDialog} onClose={handleCloseCreateDirectoryDialog}>
      <DialogTitle className={styles['Dialog-Title']}>Новая папка</DialogTitle>
      <DialogContent>
        <TextField
          value={directoryName}
          onInput={handleInputDirectoryName}
          variant="standard"
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseCreateDirectoryDialog}>Отмена</Button>
        <Button onClick={handleCreateDirectory}>Создать</Button>
      </DialogActions>
    </Dialog>
  );
}
