import * as React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

interface AddLinkProps {
  onSubmit: { ({url} : {url: string}): Promise<void> }
  closeModal: { (): void }
}

interface AddLinkState {
  url: string;
}

export class AddLinkDialog extends React.Component<AddLinkProps, AddLinkState> {
  state = {
    url: ''
  };

  _handleKeyPress = (e) => {
    return (e.key === 'Enter') && this.onSubmit()
  };

  onSubmit = () => this.props.onSubmit({url: this.state.url})

  render() {
    const { closeModal } = this.props;
    return (
      <div>
        <DialogTitle>Add Link</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can add link with type URL in this box.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="URL"
            type="url"
            fullWidth
            onChange={(e) => this.setState({ url: e.target.value })}
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

export default AddLinkDialog;