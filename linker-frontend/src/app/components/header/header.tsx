import * as React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { inject, observer } from 'mobx-react';
import { STORE_USER } from 'app/constants/stores';
import UserStore from 'app/stores/user-store';
import Avatar from '@material-ui/core/Avatar';

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

export const Header = inject(STORE_USER)(observer(({onClickSignIn, ...props}) => {
  const userStore = props[STORE_USER] as UserStore;
  console.log(document.cookie)
  return (
    <Container>
      <StickyContainer>
        {userStore.authed ?
          <Avatar
            alt={userStore.user.name}
            src={userStore.user.picture}
          />
          :
          <StyledButton onClick={onClickSignIn}>Sign In</StyledButton>}
      </StickyContainer>
    </Container>
  )
}));

export default Header;
