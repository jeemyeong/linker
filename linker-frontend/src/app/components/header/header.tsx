import * as React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { observer } from 'mobx-react';
import Avatar from '@material-ui/core/Avatar';
import { colors } from 'app/constants/colors';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

const Container = styled.header`
  width: 100%;
  height: 200px;
`;

const StickyContainer = styled.div`
  padding: 100px 140px 80px 150px;
  position: fixed;
  right: 0;
  top: 0;
`;

const StyledButton = styled(Button)`
  && {
    font-size: 1rem;
    font-weight: 600;
    text-transform: none;
    color: #ff7473;
    border-radius: 10px;
    background-color: #f4f4f4;
    padding: 15px 40px;
    cursor: pointer;
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  cursor: pointer;
 
`;

const AvatarName = styled.h1`
  margin:15px;
  font-size: 1.3em;
  font-weight: 800;
  color: ${colors.grey.light}
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

export const Header = observer(({onClickSignIn, onClickSignOut, authed, authData, redirectToUserBoard, ...props}) => {
  return (
    <Container>
      <StickyContainer>
        {authed ?
            <ContextMenuTrigger id="avatar_context_menu">
              <AvatarContainer>
                <Avatar
                  alt={authData.name}
                  src={authData.picture}
                />
                <AvatarName>
                  {authData.name}
                </AvatarName>
              </AvatarContainer>
              <StyledContextMenu id="avatar_context_menu">
                <MenuItem onClick={redirectToUserBoard}>
                  <StyledMenuItem>
                    Home
                  </StyledMenuItem>
                </MenuItem>
                <MenuItem onClick={onClickSignOut}>
                  <StyledMenuItem>
                    Sign Out
                  </StyledMenuItem>
                </MenuItem>
              </StyledContextMenu>
            </ContextMenuTrigger>
          :
          <StyledButton onClick={onClickSignIn}>Sign In</StyledButton>}
      </StickyContainer>
    </Container>
  )
});

export default Header;
