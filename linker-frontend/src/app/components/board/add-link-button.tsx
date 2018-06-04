import * as React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { CategoryData } from 'app/type/category-data';
import * as R from 'ramda';
import { colors } from 'app/constants/colors';

const Container = styled.div`
  border-radius: 15px;
  background-color: ${colors.grey.bright};
  margin-top: 10px;
  margin-bottom: 10px;
  height: 75px;
  display: flex;
  flex-direction: row;
  padding: 10px 20px 10px 20px;
`;

const StyledButton = styled(Button)`
  && {
    color: ${colors.grey.lighter};
    font-size: 1.4rem;
    font-weight: 600;
    text-transform: none;
    &:hover {
      background-color: transparent;
      color: ${colors.apricot}
    }
  }
`;

const H1 = styled.div`
  font-size: 2rem;
  margin-right: 15px;
  display: inline-block;
  margin-bottom: 7px;
`;

interface AddLinkButtonProps {
  category: CategoryData,
  openAddLinkModal: {(category: CategoryData): void}
}
export class AddLinkButton extends React.Component<AddLinkButtonProps, {}> {

  shouldComponentUpdate(nextProps, nextState) {
    return !R.equals(nextProps, this.props)
  }

  render() {
    return (
      <Container>
        <StyledButton onClick={() => this.props.openAddLinkModal(this.props.category)}>
          <H1>+</H1> Add Link...
        </StyledButton>
      </Container>
    );
  }
};
