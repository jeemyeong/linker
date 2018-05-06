import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Router, Route, Switch } from 'react-router';
import { Root } from 'app/containers/Root';
import { TodoApp } from 'app/containers/TodoApp';
import { LinkerApp } from 'app/containers/LinkerApp/linker-app';

// render react DOM
export const App = hot(module)(({ history }) => (
  <Root>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={LinkerApp} />
        <Route path="/todos" component={TodoApp} />
      </Switch>
    </Router>
  </Root>
));
