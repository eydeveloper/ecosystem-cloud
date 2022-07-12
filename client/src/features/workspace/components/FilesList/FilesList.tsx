import Box from '@mui/material/Box';
import React, {FC} from 'react';
import Loader from '../../../../common/components/Loader/Loader';
import {useAppSelector} from '../../../../common/hooks/useAppSelector';
import {File} from '../../../files/file';
import {filesApi} from '../../../files/filesService';
import FilesListItem from '../FilesListItem';
import styles from './FilesList.module.scss';

const FilesList: FC = () => {
  const [selectedItemId, setSelectedItemId] = React.useState('');
  const {user} = useAppSelector(state => state.usersReducer);
  const {currentDirectory} = useAppSelector(state => state.filesReducer);

  const handleItemClick = (event: React.MouseEvent, fileId: string) => {
    setSelectedItemId(fileId);
  };

  const {data: files, isFetching, isSuccess} = filesApi.useGetFilesQuery(
    {userId: user.id, parentId: currentDirectory.id} as File
  );

  return (
    <Box className={styles.Container}>
      {isFetching ? <Loader /> :
        <>
          {isSuccess && files.map((file) =>
            <FilesListItem
              key={file.id}
              file={file}
              onClick={handleItemClick}
              selected={selectedItemId === file.id}
            />
          )}
        </>
      }
    </Box>
  );
};

export default FilesList;
