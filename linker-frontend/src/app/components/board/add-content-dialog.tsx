import * as React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

interface AddContentProps {
  onSubmit: { ({content} : {content: string}): Promise<void> }
  closeModal: { (): void }
  msg: string
  title: string
}

interface AddContentState {
  content: string;
}

export class AddContentDialog extends React.Component<AddContentProps, AddContentState> {
  state = {
    content: ''
  };

  _handleKeyPress = (e) => {
    return (e.key === 'Enter') && this.onSubmit()
  };

  onSubmit = () => this.props.onSubmit({content: this.state.content})

  render() {
    const { closeModal, msg, title } = this.props;
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
            label="URL"
            type="content"
            fullWidth
            onChange={(e) => this.setState({ content: e.target.value })}
            onKeyPress={this._handleKeyPress}
          />
        </DialogContent>
        <DialogActions>
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

export default AddContentDialog;