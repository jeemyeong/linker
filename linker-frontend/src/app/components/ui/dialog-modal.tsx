import styled from 'styled-components';
import { colors } from 'app/constants/colors';
import { sizes } from 'app/constants/size';

export const DialogModal = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  filter: none;
  z-index: 9998;
`;

export const DialogTitle = styled.h1`
  font-size: 3.5em;
  font-weight: 800;
  margin: 10px;
  margin-bottom: 20px;
  user-select: none;
  color: ${colors.black}
`;

export const DialogContent = styled.div`
  margin-top: 40px;
  margin-bottom: 30px;
`;

export const DialogLabel = styled.label`
  color: ${colors.grey.light2}
  font-size: ${sizes.dialogModal.dialogContent.dialogLabel.fontSize};
  font-weight: 600;
  margin: 10px;
`;


export const TextField = styled.input`
  margin: 10px;
  min-width: 100%;
  width: ${sizes.dialogModal.dialogContent.textField.width};
  height: ${sizes.dialogModal.dialogContent.textField.height};
  padding: 10px 30px;
  background: rgba(0,0,0,0.03);
  border-radius: 10px;
  font-size: ${sizes.dialogModal.dialogContent.textField.fontSize};
  font-weight: 700;
  border: none;
  outline: none;
  color: ${colors.black};
  &::placeholder {
    color: ${colors.grey.light};
  };
`;

export const DialogActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const DialogButton = styled.button` 
  ${({backgroundColor, color}: { backgroundColor?, color? }) => `
    background: ${backgroundColor || ''};
    &: hover {
      background: ${backgroundColor ? backgroundColor : `rgba(0,0,0,0.03)`};
    };
    color: ${color || colors.grey.light};
    cursor: pointer;
    padding: 10px 30px;
    width: ${sizes.dialogModal.dialogAction.dialogButton.width};
    margin: 5px;
    font-weight: 700;
    border-radius: 15px;
    font-size: 1.2em;
    outline: none;
  `}
`;
