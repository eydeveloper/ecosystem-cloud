import React from 'react';
import {File} from '../../../files/file';

export interface ListFileProps {
  onClick: (event: React.MouseEvent, fileId: string) => void;
  file: File;
  selected: boolean;
}

export {default} from './ListFile';
