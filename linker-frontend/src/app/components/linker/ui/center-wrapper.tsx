import styled from "styled-components";

export const CenterWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  marginRight: -50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
`;
