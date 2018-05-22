import * as React from 'react';
import styled from 'styled-components';

export interface HeaderProps {}

export interface HeaderState {
  /* empty */
}

const Title = styled.h4`
  position: absolute;
  font-style: italic;
  top: 1vh;
  width: 100%;
  font-size: 3em;
  font-weight: 600;
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
