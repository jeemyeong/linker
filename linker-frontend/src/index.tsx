import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App, rootStore } from 'app/app';
import { STORE_USER } from 'app/constants/stores';

const render = () =>
  ReactDOM.render(
    <App/>,
    document.getElementById('root')
  );

rootStore[STORE_USER].signInWithToken()
  .then( // render react DOM
    () => render(),
    () => render()
  );

