import * as React from 'react';
import styled from 'styled-components';

export interface HeaderProps {}

export interface HeaderState {
  /* empty */
}

const Title = styled.h4`
  position: absolute;
  top: -3vh;
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  -ms-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
`;

export class Banner extends React.Component<HeaderProps, HeaderState> {
  render() {
    return <Title>Linker</Title>;
  }
}

export default Banner;
