import { History } from 'history';
import {
  STORE_TODO,
  STORE_ROUTER,
  STORE_LINK,
  STORE_USER,
  STORE_CATEGORY, STORE_UI
} from 'app/constants';
import LinkStore from 'app/stores/link-store';
import UserStore from 'app/stores/user-store';
import TodoStore from 'app/stores/todo-store';
import CategoryStore from 'app/stores/category-store';
import RouterStore from 'app/stores/router-store';
import UiStore from 'app/stores/ui-store';

export const createStores = (history: History) => {
  const todoStore = new TodoStore();
  const linkStore = new LinkStore();
  const userStore = new UserStore();
  const categoryStore = new CategoryStore();
  const routerStore = new RouterStore(history);
  const uiStore = new UiStore();
  return {
    [STORE_TODO]: todoStore,
    [STORE_ROUTER]: routerStore,
    [STORE_LINK]: linkStore,
    [STORE_USER]: userStore,
    [STORE_CATEGORY]: categoryStore,
    [STORE_UI]: uiStore
  };
};
