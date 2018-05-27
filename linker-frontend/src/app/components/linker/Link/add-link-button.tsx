import * as React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { colors } from 'app/components/linker/Board/constants';
import { CategoryData } from 'app/type/category-data';
import * as R from 'ramda';

const Container = styled.div`
  background: ${colors.red.light}
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
        <Button onClick={() => this.props.openAddLinkModal(this.props.category)}>
          Add Link
        </Button>
      </Container>
    );
  }
};
