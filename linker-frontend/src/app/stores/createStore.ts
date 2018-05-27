import { History } from 'history';
import {
  STORE_ROUTER,
  STORE_USER,
  STORE_UI,
  STORE_BOARD
} from 'app/constants';
import UserStore from 'app/stores/user-store';
import RouterStore from 'app/stores/router-store';
import UiStore from 'app/stores/ui-store';
import BoardStore from 'app/stores/board-store';

export const createStores = (history: History) => {
  const userStore = new UserStore();
  const routerStore = new RouterStore(history);
  const uiStore = new UiStore();
  const boardStore = new BoardStore();
  return {
    [STORE_ROUTER]: routerStore,
    [STORE_USER]: userStore,
    [STORE_UI]: uiStore,
    [STORE_BOARD]: boardStore
  };
};
