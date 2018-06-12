import * as React from 'react';
import { colors } from 'app/constants/colors';
import styled from 'styled-components';
import { sizes } from 'app/constants/size';
import Button from '@material-ui/core/Button';

export const AddCategoryButtonContainer = styled.div`
  border-radius: 15px;
  background-color: ${colors.grey.bright};
  height: ${sizes.columnTitleHeight};
  display: flex;
  flex-direction: row;
`;

export const StyledButton = styled(Button)`
  && {
    width: 100%;
    justify-content: flex-start;
    color: ${colors.grey.lighter};
    font-size: 1em;
    font-weight: 600;
    text-transform: none;
    &:hover {
      background-color: transparent;
      color: ${colors.apricot}
    }
  }
`;

export interface AddCategoryButtonProps {
  onClick: {(e): void}
  defaultCategoryName: string
}

export const AddCategoryButton = ({onClick, defaultCategoryName}: AddCategoryButtonProps) => (
  <AddCategoryButtonContainer>
    <StyledButton onClick={onClick}>
      {defaultCategoryName}
    </StyledButton>
  </AddCategoryButtonContainer>
);