import * as React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

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


export const Header = () => (
  <Container>
    <StickyContainer>
      <StyledButton>Sign In</StyledButton>
    </StickyContainer>
  </Container>
);

export default Header;
