import * as React from 'react'
import styled from 'styled-components';
import { colors } from 'app/constants/colors';

interface UpdateContentProps {
  onSubmit: { ({value} : {value: string}): Promise<void> }
  closeModal: { (): void }
  title: string
  label?: string
  placeholder?: string
  defaultValue?: string
  onDelete?: {(): void}
}

interface UpdateContentState {
  value: string;
}

const DialogTitle = styled.h1`
  font-size: 3em;
  font-weight: 800;
  margin: 10px;
  margin-bottom: 20px;
  user-select: none;
  color: ${colors.black}
`;

const DialogContent = styled.div`
  margin-bottom: 30px;
`;

const TextField = styled.input`
  margin: 10px;
  min-width: 100%;
  width: 30vw;
  height: 70px;
  padding: 10px 30px;
  background: rgba(0,0,0,0.03);
  border-radius: 10px;
  font-size: 2em;
  font-weight: 700;
  border: none;
  outline: none;
  color: ${colors.black};
  &::placeholder {
    color: ${colors.grey.light};
  };
`;

const DialogActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const Button = styled.button` 
  ${({backgroundColor, color}: { backgroundColor?, color? }) => `
    background: ${backgroundColor || ''};
    &: hover {
      background: ${backgroundColor ? backgroundColor : `rgba(0,0,0,0.03)`};
    };
    color: ${color || colors.grey.light};
    cursor: pointer;
    padding: 10px 30px;
    font-weight: 700;
    border-radius: 10px;
    font-size: 1.2em;
    outline: none;
  `}
`;

export class UpdateContentDialog extends React.Component<UpdateContentProps, UpdateContentState> {
  state = {
    value: this.props.defaultValue || ''
  };

  _handleKeyPress = (e) => {
    return (e.key === 'Enter') && this.onSubmit()
  };

  onSubmit = () => this.props.onSubmit({value: this.state.value})

  render() {
    const { onDelete, closeModal, title, placeholder } = this.props;
    return (
      <div>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="input"
            type="content"
            onChange={(e) => this.setState({ value: e.target.value })}
            onKeyPress={this._handleKeyPress}
            value={this.state.value}
            required={true}
            placeholder={placeholder}
          />
        </DialogContent>
        <DialogActions>
          {onDelete &&
            <Button onClick={onDelete}>
              Delete
            </Button>
          }
          <Button onClick={closeModal}>
            Cancel
          </Button>
          <Button
            onClick={this.onSubmit}
            color={colors.white}
            backgroundColor={colors.main}
          >
            Save
          </Button>
        </DialogActions>
      </div>
    )
  }
}

export default UpdateContentDialog;