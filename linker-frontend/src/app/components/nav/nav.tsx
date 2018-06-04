import * as React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Settings from '@material-ui/icons/Settings';
import { colors } from 'app/constants/colors';

const StyledNav = styled.nav`
  position: absolute;
  padding: 100px 70px 10px 90px;
  width: 100%;
  height: 100%;
`;

const Title = styled.h4`
  width: 200px;
  height: 70px;
  font-size: 5em;
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
  height: 40px;
  font-size: 2.5em;
  font-weight: 600;
  margin-top: 30px;
  cursor: pointer;
  color: ${({isSelected}: {isSelected?: boolean}) => isSelected? colors.purple.deep : colors.grey.light};
`;

const StyledButton = styled(Button)`
  && {
    font-size: 1.4rem;
    font-weight: 600;
    text-transform: none;
    color: ${colors.purple.deep};
    transition: color 0.3s ease;
    border-radius: 10px;
    background-color: ${colors.purple.bright};
    padding: 15px 40px;
    width: 200px;
    cursor: pointer;
    margin-top: 10px;
    padding: 20px 5px 20px 0px;
    &:hover {
      background-color: ${colors.purple.bright};
      color: ${colors.purple.raspberry}
    }
  }
`;

const StyledSettingsIcon = styled(Settings)`
  && {
    margin-right: 10px;
    margin-left: 0px;
  }
`;

export const Nav = () => (
  <StyledNav>
    <Title>Linker</Title>
    <StyledButton>
      <StyledSettingsIcon/>
      Board
    </StyledButton>
    <Tabs>
      <Tab isSelected={true}>Development</Tab>
      <Tab>Social</Tab>
      <Tab>Culture</Tab>
    </Tabs>
  </StyledNav>
);