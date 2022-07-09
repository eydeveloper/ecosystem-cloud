import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import React, {FC} from 'react';
import {useAppSelector} from '../../hooks/useAppSelector';
import {IFile} from '../../models/IFile';
import {fileApi} from '../../services/cloud/FileService';
import {HasChildren} from '../types/HasChildren';

const CloudWorkspace = () => {
  const [dense, setDense] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const {user} = useAppSelector(state => state.user)
  const {file} = useAppSelector(state => state.file)
  const {data, isLoading} = fileApi.useGetFilesQuery({userId: user.id, parentId: } as IFile);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <CloudContainer>
      <CloudHeader>
        <Typography variant="h6">Файлы</Typography>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </CloudHeader>

      <List dense={dense}>
        <CloudListHeader />
        {data !== undefined && data.map((file, index) =>
          <CloudListItem
            index={index}
            name={file.name}
            type="directory"
            createdDate={new Date(file.createdDate).toLocaleDateString()}
            size={file.size}
            selected={selectedIndex === index}
            onClick={handleListItemClick}
          />
        )}
      </List>
    </CloudContainer>
  );
};

const CloudContainer: FC<HasChildren> = ({children}) => (
  <Container sx={{marginTop: 3}}>
    {children}
  </Container>
);

const CloudHeader: FC<HasChildren> = ({children}) => (
  <Box sx={{display: 'flex', justifyContent: 'space-between', paddingLeft: 2}}>
    {children}
  </Box>
);

const CloudListHeader = () => (
  <ListItem divider>
    <ListItemText
      secondary="Название"
      sx={{width: 0.5}}
    />
    <ListItemText
      secondary="Дата создания"
      sx={{width: 0.25}}
    />
    <ListItemText
      secondary="Размер файла"
      sx={{width: 0.25}}
    />
  </ListItem>
);

interface CloudListItemProps {
  name: string;
  type: string;
  size: number;
  createdDate: string;
  onClick: any;
  selected: boolean;
  index: number;
}

const CloudListItem: FC<CloudListItemProps> = (
  {name, type, size, createdDate, selected, onClick, index}
) => (
  <ListItemButton
    onClick={(event) => onClick(event, index)}
    selected={selected}
    disableGutters
    divider
  >
    <ListItem>
      <Box sx={{width: 0.5, display: 'flex'}}>
        <ListItemIcon>
          {type === 'directory' ? <FolderIcon /> : <InsertDriveFileIcon />}
        </ListItemIcon>
        <ListItemText primary={name} />
      </Box>
      <ListItemText
        secondary={String(createdDate)}
        sx={{width: 0.25}}
      />
      <ListItemText
        secondary={size}
        sx={{width: 0.25}}
      />
    </ListItem>
  </ListItemButton>
);

export default CloudWorkspace;
