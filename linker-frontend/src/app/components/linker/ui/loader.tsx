import * as React from 'react';
import styled from 'styled-components';
import { Overlay } from 'app/components/linker/ui/overlay';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoaderWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  marginRight: -50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
`;

export const Loader = () => {
  return (
  <Overlay>
    <LoaderWrapper>
      <CircularProgress
        style={{color: "white"}}
      />
    </LoaderWrapper>
  </Overlay>
)};