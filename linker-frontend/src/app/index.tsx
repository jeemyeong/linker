import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Router, Route, Switch } from 'react-router';
import { Root } from 'app/containers/Root';
import { BoardContainer } from 'app/containers/board-container';
import { EmptyBoard } from "app/components/linker/ui/empty-board";

// render react DOM
export const App = hot(module)(({ history }) => (
  <Root>
    <Router history={history}>
      <Switch>
        <Route exact path="/board" component={EmptyBoard} />
        <Route path="/board/:boardId" component={BoardContainer} />
      </Switch>
    </Router>
  </Root>
));
