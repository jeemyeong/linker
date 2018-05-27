import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './reset.css';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { App } from 'app';
import { createStores } from 'app/stores';
import { STORE_BOARD } from 'app/constants';

// enable MobX strict mode
useStrict(true);

// prepare MobX stores
const history = createBrowserHistory();
export const rootStore = createStores(history);

Promise.all([
  rootStore[STORE_BOARD].getBoard(1)
])
  .then(() =>
    // render react DOM
    ReactDOM.render(
      <Provider {...rootStore}>
        <App history={history} />
      </Provider>,
      document.getElementById('root')
    )
  )
  .catch((e) => console.log(e));
