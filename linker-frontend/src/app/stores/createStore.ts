import { History } from 'history';
import { RouterStore } from './router-store';
import { STORE_TODO, STORE_ROUTER, STORE_LINK, STORE_USER, STORE_CATEGORY } from 'app/constants';
import { UserModel, TodoModel, LinkModel, CategoryModel } from 'app/models';
import LinkStore from 'app/stores/link-store';
import UserStore from 'app/stores/user-store';
import TodoStore from 'app/stores/todo-store';
import CategoryStore from 'app/stores/category-store';

interface createStoresProps {
  history: History;
  defaultTodos?: TodoModel[];
  defaultLinks?: LinkModel[];
  defaultUsers?: UserModel[];
  defaultCategories?: CategoryModel[];
}
export const createStores = ({
  history,
  defaultTodos,
  defaultLinks,
  defaultUsers,
  defaultCategories
}: createStoresProps) => {
  const todoStore = new TodoStore(defaultTodos);
  const linkStore = new LinkStore(defaultLinks);
  const userStore = new UserStore(defaultUsers);
  const categoryStore = new CategoryStore(defaultCategories);
  const routerStore = new RouterStore(history);
  return {
    [STORE_TODO]: todoStore,
    [STORE_ROUTER]: routerStore,
    [STORE_LINK]: linkStore,
    [STORE_USER]: userStore,
    [STORE_CATEGORY]: categoryStore
  };
};
