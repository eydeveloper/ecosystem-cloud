import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, {useState} from 'react';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch';
import {useAppSelector} from 'shared/lib/hooks/useAppSelector';
import {fileModel} from 'entities/file'
import styles from './styles.module.scss';

export const CreateDirectoryDialog = () => {
  const {viewer} = useAppSelector(state => state.viewerReducer);
  const {currentDirectory, createDirectoryDialog} = useAppSelector(state => state.fileReducer);
  const [directoryName, setDirectoryName] = useState('Без названия');
  const dispatch = useAppDispatch();
  const [createDirectory] = fileModel.api.useCreateDirectoryMutation();

  const handleInputDirectoryName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDirectoryName(event.target.value);
  };

  const handleCreateDirectory = async () => {
    await createDirectory({
      name: directoryName,
      userId: viewer.id,
      parentId: currentDirectory.id
    } as fileModel.File).unwrap();
    dispatch(fileModel.actions.closeCreateDirectoryDialog());
    setDirectoryName('Без названия');
  };

  const handleCloseCreateDirectoryDialog = () => {
    dispatch(fileModel.actions.closeCreateDirectoryDialog());
  };

  return (
    <Dialog open={createDirectoryDialog} onClose={handleCloseCreateDirectoryDialog}>
      <DialogTitle className={styles['Dialog-Title']}>Новая папка</DialogTitle>
      <DialogContent>
        <TextField
          value={directoryName}
          onInput={handleInputDirectoryName}
          variant="standard"
          autoComplete="off"
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
