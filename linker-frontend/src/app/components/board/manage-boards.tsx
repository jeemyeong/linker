import * as React from 'react';
import styled from 'styled-components';
import { colors } from 'app/constants/colors';
import { inject, observer } from 'mobx-react';
import { STORE_NAV, STORE_UI } from 'app/constants/stores';
import { NavStore } from 'app/stores/nav-store';
import UiStore from 'app/stores/ui-store';
import { BoardData } from 'app/type/board-data';
import {
  DialogActions, DialogButton, DialogContent, DialogLabel, DialogModal, DialogTitle,
  TextField
} from 'app/components/ui/dialog-modal';
import { sizes } from 'app/constants/size';

const List = styled.ul`
  margin: 10px;
  min-width: 100%;
  width: ${sizes.dialogModal.dialogContent.textField.width};
  padding: 50px 60px;
  background: rgba(0,0,0,0.03);
  border-radius: 10px;
  font-size: 1.8em;
  font-weight: 700;
  border: none;
  outline: none;
`;

const Item = styled.li`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DeleteItemButton = styled.button`
  outline: none;
  cursor: pointer;
`;

interface ManageBoardsProps {
}

interface ManageBoardsState {
  title: string;
}

@inject(STORE_NAV, STORE_UI)
@observer
export class ManageBoards extends React.Component<ManageBoardsProps, ManageBoardsState> {
  state = {
    title: ''
  };

  _handleKeyPress = (e) => {
    return (e.key === 'Enter') && this.onSubmit()
  };

  _handleKeyDown = (e) => {
    const uiStore = this.props[STORE_UI] as UiStore;
    return (e.keyCode === 27) && uiStore.closeDialog()
  };


  onSubmit = () => {
    if (!this.state.title) {
      return;
    }
    const uiStore = this.props[STORE_UI] as UiStore;
    const title = this.state.title;
    uiStore.closeDialogWithActions(
      () => this.newBoard({title}).then(
        () => uiStore.openSnackbar({message: `${title} has been created`})
      ).catch(
        (err) => uiStore.openSnackbar({message: `${err}`})
      )
    )
  };

  onDelete = ({board}: {board: BoardData}) => {
    const uiStore = this.props[STORE_UI] as UiStore;
    this.deleteBoard({board}).then(
      () => uiStore.openSnackbar({message: `${board.title} has been deleted`})
    ).catch(
      (err) => uiStore.openSnackbar({message: `${err}`})
    )
  };


  newBoard = ({title}: {title: string}) => {
    const navStore = this.props[STORE_NAV] as NavStore;
    return navStore.createBoard({title})
  };

  deleteBoard = ({board}: {board: BoardData}) => {
    const navStore = this.props[STORE_NAV] as NavStore;
    return navStore.deleteBoard({board})
  };


  render() {
    const navStore = this.props[STORE_NAV] as NavStore;
    const uiStore = this.props[STORE_UI] as UiStore;
    return (
      <DialogModal>
        <DialogTitle>Boards</DialogTitle>
        <DialogContent>
          <DialogLabel htmlFor='input'>Create New</DialogLabel>
          <TextField
            autoFocus
            id="input"
            type="content"
            onChange={(e) => this.setState({ title: e.target.value })}
            onKeyPress={this._handleKeyPress}
            onKeyDown={this._handleKeyDown}
            value={this.state.title}
            required={true}
            placeholder={"New Board"}
          />
          {navStore.boards.length > 0 && <List>
            {navStore.boards.map(board =>
              <Item key={board.id}>
                <div>{board.title}</div>
                <DeleteItemButton
                  onClick={() => this.onDelete({board})}
                >
                  ✖️
                </DeleteItemButton>
              </Item>
            )}
          </List> }
        </DialogContent>
        <DialogActions>
          <DialogButton onClick={uiStore.closeDialog}>
            Cancel
          </DialogButton>
          <DialogButton
            onClick={this.onSubmit}
            color={colors.white}
            backgroundColor={colors.main}
          >
            Create
          </DialogButton>
        </DialogActions>
      </DialogModal>
    )
  }
}