import { observable, action } from 'mobx';
import { UserData } from 'app/type/user-data';

export class UserStore {
  constructor(fixtures: UserData[] = []) {
    this.users = fixtures;
  }

  @observable public users: Array<UserData>;

  @action
  addUser = (user: UserData): void => {
    this.users.push(user);
  };

  @action
  deleteUser = (id: number): void => {
    this.users = this.users.filter((user) => user.id !== id);
  };
}

export default UserStore;
