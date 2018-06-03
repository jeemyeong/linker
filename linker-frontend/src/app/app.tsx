import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Router, Route, Switch } from 'react-router';
import { Root } from 'app/containers/Root';
import { EmptyBoard } from "app/components/ui/empty-board";
import { createBrowserHistory } from 'history';
import { createStores } from 'app/stores/createStore';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { Linker } from 'app/containers/linker';

// enable MobX strict mode
useStrict(true);

// prepare MobX stores
const history = createBrowserHistory();
export const rootStore = createStores(history);

// render react DOM
export const AppRouter = hot(module)(({ history }) => (
  <Root>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={EmptyBoard} />
        <Route exact path="/board" component={EmptyBoard} />
        <Route path="/board/:boardId" component={Linker} />
      </Switch>
    </Router>
  </Root>
));

export const App = () => (
  <Provider {...rootStore}>
    <AppRouter history={history} />
  </Provider>
);