import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import {useState} from 'react';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {IFile} from '../../models/IFile';
import {fileApi} from '../../services/cloud/FileService';
import {closeCreateDirectoryDialog} from '../../store/reducers/file';

export default function CreateDirectoryDialog() {
  const {user} = useAppSelector(state => state.user);
  const {currentDirectory, createDirectoryDialog} = useAppSelector(state => state.file);
  const [directoryName, setDirectoryName] = useState('Без названия');
  const dispatch = useAppDispatch();
  const [createDirectory, {isLoading, error}] = fileApi.useCreateDirectoryMutation();

  const handleInputDirectoryName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDirectoryName(event.target.value);
  };

  const handleCreateDirectory = async () => {
    await createDirectory({
      name: directoryName,
      userId: user.id,
      parentId: currentDirectory.id
    } as IFile).unwrap();
    dispatch(closeCreateDirectoryDialog());
  };

  const handleCloseCreateDirectoryDialog = () => {
    dispatch(closeCreateDirectoryDialog());
  };

  return (
    <div>
      <Dialog open={createDirectoryDialog} onClose={handleCloseCreateDirectoryDialog}>
        <DialogTitle sx={{userSelect: 'none'}}>Новая папка</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="name"
            fullWidth
            variant="outlined"
            value={directoryName}
            onInput={handleInputDirectoryName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateDirectoryDialog}>Отмена</Button>
          <Button onClick={handleCreateDirectory}>Создать</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
