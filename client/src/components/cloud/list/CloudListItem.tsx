import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, {FC} from 'react';

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

export default CloudListItem;
