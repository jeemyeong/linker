import * as React from 'react';
import { Suspense, lazy } from 'react';
import { hot } from 'react-hot-loader';
import { Router, Route, Switch } from 'react-router';
import { Root } from 'app/containers/root';
import { createBrowserHistory } from 'history';
import { createStores } from 'app/stores/createStore';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
const Linker = lazy(() => import('app/containers/linker'));
import axios from 'axios';

// enable axios with cookie
axios.defaults.withCredentials = true;

// enable MobX strict mode
useStrict(true);

// prepare MobX stores
const history = createBrowserHistory();
export const rootStore = createStores(history);

// render react DOM
export const AppRouter = hot(module)(({ history }) => (
  <Root>
    <Router history={history}>
      <Suspense fallback={null}>
        <Switch>
          <Route path="/user/:userId" render={(props) => <Linker {...props} />} />
          <Route render={(props) => <Linker {...props} />} />
        </Switch>
      </Suspense>
    </Router>
  </Root>
));

export const App = () => (
  <Provider {...rootStore}>
    <AppRouter history={history} />
  </Provider>
);
