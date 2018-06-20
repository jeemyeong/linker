import { observable, runInAction } from 'mobx';
import { UserData } from 'app/type/user-data';
import { ApiCall } from 'app/network/api-call';

export class UserStore {
  constructor(user: UserData = null) {
    this.user = user;
  }

  @observable public user?: UserData;
  @observable public authed: boolean = false;

  public signInWithGoogle = ({gToken}): Promise<void> =>
    ApiCall.signInWithGoogle({gToken})
      .then(user => runInAction(() => {
        this.user = user;
        this.authed = true;
      }));


  public signInWithToken = () =>
    ApiCall.signTestWithToken()
      .then(user => runInAction(() => {
        this.user = user;
        this.authed = true;
      }))
}

export default UserStore;
