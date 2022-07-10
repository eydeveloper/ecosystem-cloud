import Button from '@mui/material/Button';
import React, {FC} from 'react';
import {IButtonProps} from '../index';

const ButtonVariantContained: FC<IButtonProps> = ({children}) => {
  return (
    <Button variant="contained">
      {children}
    </Button>
  );
};

export default ButtonVariantContained;
