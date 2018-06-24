import * as React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Settings from '@material-ui/icons/Settings';
import { colors } from 'app/constants/colors';
import { sizes } from 'app/constants/size';
import { inject, observer } from 'mobx-react';
import { STORE_AUTH, STORE_NAV, STORE_UI } from 'app/constants/stores';
import { NavStore } from 'app/stores/nav-store';
import AuthStore from 'app/stores/auth-store';
import UiStore from 'app/stores/ui-store';
import { ManageBoards } from 'app/components/board/manage-boards';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import UpdateContentDialog from 'app/components/board/update-content-dialog';
import { BoardData } from 'app/type/board-data';

const StyledNav = styled.nav`
  position: absolute;
  padding: 90px 50px 10px 60px;
  background-clip: content-box, padding-box;

  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  width: 100%;
  padding-bottom: 30px;
  font-size: ${sizes.leftSide.title.fontSize};
  font-weight: 600;
  color: ${colors.black};
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  -ms-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
`;

const Tabs = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Tab = styled.h3`
  flex:1 1 auto;
  width: 200px;
  height: ${sizes.leftSide.tab.height};
  font-size: ${sizes.leftSide.tab.fontSize};
  font-weight: 600;
  margin-top: 10px;
  cursor: pointer;
  user-select: none;
  color: ${({isSelected}: {isSelected?: boolean}) => isSelected? colors.main : colors.grey.light};
`;

const StyledButton = styled(Button)`
  && {
    font-size: 1em;
    font-weight: 600;
    height: 50px;
    
    text-transform: none;
    color: ${colors.main};
    transition: color 0.3s ease;
    border-radius: 10px;
    background-color: ${colors.purple.bright};
    width: 100%;
    cursor: pointer;
    margin-top: 10px;
    padding: 5px;
    &:hover {
      background-color: ${colors.purple.bright};
      color: ${colors.purple.raspberry}
    }
    & span {
      height: 100%;
    }
  }
`;

const StyledSettingsIcon = styled(Settings)`
  && {
    height: 15px;
    margin-right: 0px;
    margin-left: 0px;
  }
`;

const StyledContextMenu = styled(ContextMenu)`
  && {
    background: ${colors.white};
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    z-index: 9997;
    min-width: 130px;
  }
`;

const StyledMenuItem = styled.button`
  min-height: 50px;
  width: 100%;
  text-align: left;
  padding: 10px;
  font-size: 1.1em;
  font-weight: 600;
  color: ${colors.grey.light};
  cursor: pointer;
  outline: none;
  user-select: none;
  &:hover {
    background: rgba(0,0,0,0.03);
  }
`;

@inject(STORE_NAV, STORE_AUTH, STORE_UI)
@observer
export class NavContainer extends React.Component<{}, {}> {

  manageBoards = () => {
    const uiStore = this.props[STORE_UI] as UiStore;
    uiStore.openDialog({
      DialogComponent: <ManageBoards/>
    })
  };

  openEditBoardTitleModal = ({board}: {board: BoardData}) => {
    const uiStore = this.props[STORE_UI] as UiStore;
    const navStore = this.props[STORE_NAV] as NavStore;

    return uiStore.openDialog({
      DialogComponent: <UpdateContentDialog
        onSubmit={({value: title}) => uiStore.closeDialogWithActions(
          () => navStore.updateBoardTitle({board: board, title}).then(
            () => uiStore.openSnackbar({message: 'Board has been saved'})
          ).catch(
            (err) => uiStore.openSnackbar({message: `${err}`})
          )
        )}
        closeModal={uiStore.closeDialog}
        title={'Edit Board'}
        defaultValue={board.title}
      />
    })
  };


  render() {
    const uiStore = this.props[STORE_UI] as UiStore;
    const navStore = this.props[STORE_NAV] as NavStore;
    const authStore = this.props[STORE_AUTH] as AuthStore;
    return (
      <StyledNav>
        <Title>Linker</Title>
        {
          authStore.authed && (
            <StyledButton
              onClick={this.manageBoards}
            >
              <StyledSettingsIcon/>
              Boards
            </StyledButton>
          )
        }
        <Tabs>
          {navStore.boards.map(board =>
            <ContextMenuTrigger id={`board_title_context|${board.id}`} key={board.id}>
              <Tab isSelected={board.id == navStore.currentBoardId} onClick={() => navStore.changeCurrentBoard({boardId: board.id})}>
                {board.title}
              </Tab>
              <StyledContextMenu id={`board_title_context|${board.id}`}>
                <MenuItem onClick={() => this.openEditBoardTitleModal({board})}>
                  <StyledMenuItem>
                    Edit
                  </StyledMenuItem>
                </MenuItem>
                <MenuItem onClick={() => navStore.deleteBoard({board}).then(
                  () => uiStore.openSnackbar({message: 'Category has been deleted'})
                ).catch(
                  (err) => uiStore.openSnackbar({message: `${err}`})
                )}>
                  <StyledMenuItem>
                    Remove
                  </StyledMenuItem>
                </MenuItem>
              </StyledContextMenu>
            </ContextMenuTrigger>
          )}
        </Tabs>
      </StyledNav>
    )
  }
}