import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { App } from 'app';
import { createStores } from 'app/stores';

// enable MobX strict mode
useStrict(true);

// prepare MobX stores
const history = createBrowserHistory();
export const rootStore = createStores(history);

// render react DOM
ReactDOM.render(
  <Provider {...rootStore}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);
