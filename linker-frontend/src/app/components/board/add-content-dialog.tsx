import * as React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

interface UpdateContentProps {
  onSubmit: { ({value} : {value: string}): Promise<void> }
  closeModal: { (): void }
  msg: string
  title: string
  label?: string
  defaultValue?: string
  deleteContent?: {(): void}
}

interface UpdateContentState {
  value: string;
}

export class UpdateContentDialog extends React.Component<UpdateContentProps, UpdateContentState> {
  state = {
    value: this.props.defaultValue || ''
  };

  _handleKeyPress = (e) => {
    return (e.key === 'Enter') && this.onSubmit()
  };

  onSubmit = () => this.props.onSubmit({value: this.state.value})

  render() {
    const { deleteContent, closeModal, msg, title, label } = this.props;
    return (
      <div>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {msg}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={label}
            type="content"
            fullWidth
            onChange={(e) => this.setState({ value: e.target.value })}
            onKeyPress={this._handleKeyPress}
            value={this.state.value}
            required={true}
          />
        </DialogContent>
        <DialogActions>
          {deleteContent &&
            <Button onClick={deleteContent} color="primary">
              Delete
            </Button>
          }
          <Button onClick={closeModal} color="primary">
            Cancel
          </Button>
          <Button onClick={this.onSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </div>
    )
  }
}

export default UpdateContentDialog;