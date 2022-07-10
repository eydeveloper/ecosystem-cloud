import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import {useState} from 'react';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {IFile} from '../../../models/IFile';
import {fileApi} from '../../../services/FileService';
import {closeCreateDirectoryDialog} from '../../../store/reducers/file';
import TextFieldVariantStandard from '../../Common/TextField/_variant/TextField_variant_standart';
import styles from './CreateDirectoryDialog.module.scss';

export default function CreateDirectoryDialog() {
  const {user} = useAppSelector(state => state.user);
  const {currentDirectory, createDirectoryDialog} = useAppSelector(state => state.file);
  const [directoryName, setDirectoryName] = useState('Без названия');
  const dispatch = useAppDispatch();
  const [createDirectory] = fileApi.useCreateDirectoryMutation();

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
    <Dialog open={createDirectoryDialog} onClose={handleCloseCreateDirectoryDialog}>
      <DialogTitle className={styles.DialogTitle}>Новая папка</DialogTitle>
      <DialogContent>
        <TextFieldVariantStandard
          value={directoryName}
          onInput={handleInputDirectoryName}
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
