import * as React from 'react';
import GoogleLogin from 'react-google-login';
import googleSigninImg from '../../../assets/google_signin.png';
import styled from 'styled-components';
import { colors } from 'app/constants/colors';

const Container = styled.div`
  padding: 20px;
`;

const DialogTitle = styled.h1`
  font-size: 3em;
  font-weight: 800;
  margin: 10px;
  margin-bottom: 20px;
  user-select: none;
  color: ${colors.black}
`;

const DialogContent = styled.div`
  margin-bottom: 30px;
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
    user-select: none;
  }
  & * {
    display: none;
  }
`;

const DialogActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const Button = styled.button` 
  ${({backgroundColor, color}: { backgroundColor?, color? }) => `
    background: ${backgroundColor || ''};
    &: hover {
      background: ${backgroundColor ? backgroundColor : `rgba(0,0,0,0.03)`};
    };
    color: ${color || colors.grey.light};
    cursor: pointer;
    padding: 10px 30px;
    font-weight: 700;
    border-radius: 10px;
    font-size: 1.2em;
    outline: none;
  `}
`;

export const SignIn = ({closeModal, onSuccess, onFailure}) => (
  <Container>
    <DialogTitle>Sign In</DialogTitle>
    <DialogContent>
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