import * as React from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';

export const DialogModal = ({children, ...args}: {children?} & DialogProps) => (
  <Dialog
    {...args}
  >
    {children}
  </Dialog>
);