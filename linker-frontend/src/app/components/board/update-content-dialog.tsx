import * as React from 'react'
import { colors } from 'app/constants/colors';
import {
  DialogActions, DialogButton, DialogContent, DialogModal, DialogTitle,
  TextField
} from 'app/components/ui/dialog-modal';

interface UpdateContentProps {
  onSubmit: { ({value} : {value: string}): Promise<void> }
  closeModal: { (): void }
  title: string
  placeholder?: string
  defaultValue?: string
  onDelete?: {(): void}
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

  _handleKeyDown = (e) => {
    return (e.keyCode === 27) && this.props.closeModal()
  };

  onSubmit = () => {
    if (!this.state.value) {
      return;
    }
    return this.props.onSubmit({value: this.state.value})
  };

  render() {
    const { onDelete, closeModal, title, placeholder } = this.props;
    return (
      <DialogModal>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="input"
            type="content"
            onChange={(e) => this.setState({ value: e.target.value })}
            onKeyDown={this._handleKeyDown}
            onKeyPress={this._handleKeyPress}
            value={this.state.value}
            required={true}
            placeholder={placeholder}
            onFocus={(e) => e.currentTarget.select()}
          />

        </DialogContent>
        <DialogActions>
          {onDelete &&
            <DialogButton onClick={onDelete}>
              Delete
            </DialogButton>
          }
          <DialogButton onClick={closeModal}>
            Cancel
          </DialogButton>
          <DialogButton
            onClick={this.onSubmit}
            color={colors.white}
            backgroundColor={colors.main}
          >
            Save
          </DialogButton>
        </DialogActions>
      </DialogModal>
    )
  }
}

export default UpdateContentDialog;