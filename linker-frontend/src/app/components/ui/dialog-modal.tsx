import * as React from 'react';
import styled from 'styled-components';

const Dialog = styled.div`
`;

export const DialogModal = ({children, isOpen, onClose}: {children?, isOpen, onClose}) => (
  <Dialog>
    {children}
  </Dialog>
);