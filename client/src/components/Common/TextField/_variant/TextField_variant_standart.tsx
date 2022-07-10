import TextField from '@mui/material/TextField';
import React, {FC} from 'react';
import {ITextFieldProps} from '../index';

const TextFieldVariantStandard: FC<ITextFieldProps> = ({value, onInput, autoFocus}) => {
  return (
    <TextField
      value={value}
      onInput={onInput}
      autoFocus={autoFocus}
      variant="standard"
    />
  );
};

export default TextFieldVariantStandard;
