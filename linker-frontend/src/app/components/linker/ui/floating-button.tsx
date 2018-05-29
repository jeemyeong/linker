import * as React from 'react'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const Container = styled.div`
  position: fixed;
  right: 10vw;
  bottom: 15vh;
  z-index: 1000; 
`;

export const FloatingButton = ({handleClick}: {handleClick: {(): void}}) => (
  <Container>
    <Button variant="fab" color="primary" aria-label="add" onClick={handleClick}>
      <AddIcon />
    </Button>
  </Container>
);
