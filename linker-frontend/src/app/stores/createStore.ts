import { History } from 'history';
import AuthStore from 'app/stores/auth-store';
import RouterStore from 'app/stores/router-store';
import UiStore from 'app/stores/ui-store';
import BoardStore from 'app/stores/board-store';
import { STORE_BOARD, STORE_ROUTER, STORE_UI, STORE_AUTH, STORE_NAV } from 'app/constants/stores';
import { NavStore } from 'app/stores/nav-store';

export const createStores = (history: History) => {
  const authStore = new AuthStore();
  const routerStore = new RouterStore(history);
  const uiStore = new UiStore();
  const boardStore = new BoardStore();
  const navStore = new NavStore();
  return {
    [STORE_ROUTER]: routerStore,
    [STORE_AUTH]: authStore,
    [STORE_UI]: uiStore,
    [STORE_BOARD]: boardStore,
    [STORE_NAV]: navStore,
  };
};
