import { History } from 'history';
import AuthStore from 'app/stores/user-store';
import RouterStore from 'app/stores/router-store';
import UiStore from 'app/stores/ui-store';
import BoardStore from 'app/stores/board-store';
import { STORE_BOARD, STORE_ROUTER, STORE_UI, STORE_AUTH } from 'app/constants/stores';

export const createStores = (history: History) => {
  const authStore = new AuthStore();
  const routerStore = new RouterStore(history);
  const uiStore = new UiStore();
  const boardStore = new BoardStore();
  return {
    [STORE_ROUTER]: routerStore,
    [STORE_AUTH]: authStore,
    [STORE_UI]: uiStore,
    [STORE_BOARD]: boardStore
  };
};
