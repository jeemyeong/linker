import * as React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { colors } from 'app/constants/colors';
import { sizes } from 'app/constants/size';

export const AddButtonContainer = styled.div`
  
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
`;

export const StyledButton = styled(Button)`
  && {
    display: flex;
    align-items: center;
    font-size: ${sizes.rightSide.column.addLinkButton.fontSize};
    width: 100%;
    padding: 10px 20px;
    height: ${sizes.rightSide.column.addLinkButton.height};
    border-radius: 10px;
    background-color: ${colors.grey.bright};
    justify-content: flex-start;
    color: ${colors.grey.lighter};
    font-weight: 600;
    text-transform: none;
    &:hover {
      background-color: transparent;
      color: ${colors.apricot}
    }
    & span {
      height: 100%;
    }
  }
`;

export const H1 = styled.div`
  font-size: 1.3em;
  margin-right: 15px;
  display: inline-block;
  margin-bottom: 7px;
`;


export const AddLinkButton = ({onClick}) => (
  <AddButtonContainer>
    <StyledButton onClick={onClick}>
      <H1>+</H1> Add Link...
    </StyledButton>
  </AddButtonContainer>
);
