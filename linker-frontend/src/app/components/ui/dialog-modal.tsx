import * as React from 'react';
import styled from 'styled-components';

const Dialog = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  filter: none;
  z-index: 9998;
`;

export const DialogModal = ({children, isOpen, onClose}: {children?, isOpen, onClose}) => (
  <Dialog>
    {children}
  </Dialog>
);