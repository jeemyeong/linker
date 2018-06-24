import * as React from 'react';
import GoogleLogin from 'react-google-login';
import googleSigninImg from '../../../assets/google_signin.png';
import styled from 'styled-components';
import { DialogActions, DialogButton, DialogContent, DialogModal, DialogTitle } from 'app/components/ui/dialog-modal';
import config from '../../../config';

const Container = styled.div`
  padding: 20px;
`;
const StyledGoogleLogin = styled(GoogleLogin)`
  && {
    width: 267.4px;
    height: 64.4px;
    margin: 10px;
    background: transparent url(${googleSigninImg}) no-repeat 10px center;
    background-size: contain;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: 0px 0px;
    border: none;
    cursor: pointer;       
    vertical-align: middle;
    outline: none;
  }
  & * {
    display: none;
  }
`;

export const SignIn = ({closeModal, onSuccess, onFailure}) => (
  <DialogModal>
    <Container>
      <DialogTitle>Sign In</DialogTitle>
      <DialogContent>
        <StyledGoogleLogin
          clientId={config.GOOGLE_CLIENT_ID}
          onSuccess={onSuccess}
          onFailure={onFailure}
          buttonText=""
        >
        </StyledGoogleLogin>
      </DialogContent>
      <DialogActions>
        <DialogButton onClick={closeModal}>
          Cancel
        </DialogButton>
      </DialogActions>
    </Container>
  </DialogModal>
);