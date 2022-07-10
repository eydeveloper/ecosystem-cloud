import React from 'react';
import {IFile} from '../../../models/IFile';

export interface ITableListItemButtonProps {
  onClick: (event: React.MouseEvent, fileId: string) => void;
  file: IFile;
  selected: boolean;
}
