import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from 'app/app';
import { initRender } from './init-render';

const render = () =>
  ReactDOM.render(
    <App/>,
    document.getElementById('root')
  );

initRender(render);