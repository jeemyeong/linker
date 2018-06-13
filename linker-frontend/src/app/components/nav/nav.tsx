import * as React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Settings from '@material-ui/icons/Settings';
import { colors } from 'app/constants/colors';
import { sizes } from 'app/constants/size';

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