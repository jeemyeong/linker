import { observable, runInAction } from 'mobx';
import { UserData } from 'app/type/user-data';
import { ApiCall } from 'app/network/api-call';

export class UserStore {
  constructor(user: UserData = null) {
    this.user = user;
  }

  @observable public user?: UserData;
  @observable public authed: boolean = false;

  public signIn = ({gToken}): Promise<void> => {
    return ApiCall.signIn({gToken}).then(user => runInAction(() => {
      this.user = user;
      this.authed = true;
    }))
  }
}

export default UserStore;
