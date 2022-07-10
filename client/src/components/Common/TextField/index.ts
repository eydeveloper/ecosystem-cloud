import React from 'react';

export interface ITextFieldProps {
  value?: string;
  onInput?: React.FormEventHandler<HTMLDivElement>;
  autoFocus?: boolean;
}
