import * as React from 'react';
import MaterialSnackBar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

interface SnackbarProps {
  message: string,
  handleClose: { (): void }
}

export const Snackbar = ({message, handleClose}: SnackbarProps) => (
  <MaterialSnackBar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={true}
    autoHideDuration={4000}
    onClose={handleClose}
    ContentProps={{
      'aria-describedby': 'message-id',
    }}
    message={<span id="message-id">{message}</span>}
    action={[
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon/>
      </IconButton>,
    ]}
  />
);