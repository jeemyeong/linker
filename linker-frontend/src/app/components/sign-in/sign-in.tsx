import * as React from 'react';
import { DialogTitle } from '@material-ui/core';
import GoogleLogin from 'react-google-login';
import googleSigninImg from '../../../assets/google_signin.png';
import styled from 'styled-components';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';

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
  }
  & * {
    display: none;
  }
`;

export const SignIn = ({closeModal, onSuccess, onFailure}) => (
  <Container>
    <DialogTitle>Sign In</DialogTitle>
    <DialogContent>
      <DialogContentText>
        You can use Google OAuth2.0 to SignIn
      </DialogContentText>
      <StyledGoogleLogin
        clientId="178132627968-qii6o29lgn7l5gatelcq4iqs3ag6vqa0.apps.googleusercontent.com"
        onSuccess={onSuccess}
        onFailure={onFailure}
        buttonText=""
      >
      </StyledGoogleLogin>
    </DialogContent>
    <DialogActions>
      <Button onClick={closeModal} color="primary">
        Cancel
      </Button>
    </DialogActions>

  </Container>
);