import * as React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const Title = styled.h4`
  font-size: 5.5em;
  font-weight: 600;
  color: #a3a1a1;
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  -ms-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
`;

const Container = styled.header`
  width: 100%;
  height: 270px;
`;

const StickyContainer = styled.div`
  padding: 100px 140px 80px 150px;
  position: sticky;
  left: 0;
  width: 99.5vw;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
      <Title>Linker</Title>
      <StyledButton>Sign In</StyledButton>
    </StickyContainer>
  </Container>
);

export default Header;
