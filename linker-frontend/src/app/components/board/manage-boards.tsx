import * as React from 'react';
import styled from 'styled-components';
import { colors } from 'app/constants/colors';
import { inject, observer } from 'mobx-react';
import { STORE_NAV, STORE_UI } from 'app/constants/stores';
import { NavStore } from 'app/stores/nav-store';
import UiStore from 'app/stores/ui-store';
import { BoardData } from 'app/type/board-data';

const DialogTitle = styled.h1`
  font-size: 3.5em;
  font-weight: 800;
  margin: 10px;
  margin-bottom: 20px;
  user-select: none;
  color: ${colors.black}
`;

const DialogContent = styled.div`
  margin-top: 50px;
  margin-bottom: 30px;
`;

const Label = styled.label`
  color: ${colors.grey.light2}
  font-size: 1.8em;
  font-weight: 600;
  margin: 10px;
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
    border-radius: 15px;
    font-size: 1.2em;
    outline: none;
    margin: 5px;
  `}
`;

const List = styled.ul`
  margin: 10px;
  min-width: 100%;
  width: 30vw;
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
      <div>
        <DialogTitle>Boards</DialogTitle>
        <DialogContent>
          <Label htmlFor='input'>Create New</Label>
          <TextField
            autoFocus
            id="input"
            type="content"
            onChange={(e) => this.setState({ title: e.target.value })}
            onKeyPress={this._handleKeyPress}
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
          <Button onClick={uiStore.closeDialog}>
            Cancel
          </Button>
          <Button
            onClick={this.onSubmit}
            color={colors.white}
            backgroundColor={colors.main}
          >
            Create
          </Button>
        </DialogActions>

      </div>
    )
  }
}