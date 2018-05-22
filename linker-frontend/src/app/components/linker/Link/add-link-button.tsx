import * as React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { colors } from 'app/components/linker/Board/constants';
import { CategoryModel } from 'app/models';

const Container = styled.div`
  background: ${colors.red.light}
`;
interface AddLinkButtonProps {
  category: CategoryModel,
  openAddLinkModal: {(category: CategoryModel): void}
}
export const AddLinkButton = ({ category, openAddLinkModal }: AddLinkButtonProps) => {
  return (
    <Container>
      <Button onClick={() => openAddLinkModal(category)}>
        Add Link
      </Button>
    </Container>
  );
}
