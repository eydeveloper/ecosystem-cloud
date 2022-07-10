import Typography from '@mui/material/Typography';
import React, {FC} from 'react';
import {ITypographyProps} from '../index';

const TypographyVariantH6: FC<ITypographyProps> = ({className, children}) => {
  return (
    <Typography className={className} variant="h6">
      {children}
    </Typography>
  );
};

export default TypographyVariantH6;
