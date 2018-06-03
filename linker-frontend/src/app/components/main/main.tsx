import * as React from 'react';
import styled from 'styled-components';
import { BoardContainer } from 'app/containers/board-container';
import { RouteComponentProps } from 'react-router';

const Container = styled.div`
  padding: 20px 140px 100px 140px;
`;

export const Main = (props: RouteComponentProps<any>) => (
  <Container>
    <BoardContainer
      {...props}
    />
  </Container>
);