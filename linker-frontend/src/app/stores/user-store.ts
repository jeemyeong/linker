import { observable, action } from 'mobx';
import { UserModel } from 'app/models';

export class UserStore {
  constructor(fixtures: UserModel[] = []) {
    this.users = fixtures;
  }

  @observable public users: Array<UserModel>;

  @action
  addUser = (user: UserModel): void => {
    this.users.push(user);
  };

  @action
  deleteUser = (id: number): void => {
    this.users = this.users.filter((user) => user.id !== id);
  };
}

export default UserStore;
