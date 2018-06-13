import { observable } from 'mobx';
import { UserData } from 'app/type/user-data';

export class UserStore {
  constructor(user: UserData = null) {
    this.user = user;
  }

  @observable public user?: UserData;
}

export default UserStore;
