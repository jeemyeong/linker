import { observable, runInAction } from 'mobx';
import { AuthData } from 'app/type/user-data';
import { ApiCall } from 'app/network/api-call';

export class AuthStore {
  constructor(authData: AuthData = null) {
    this.authData = authData;
  }

  @observable public authData?: AuthData;
  @observable public authed: boolean = false;

  public signInWithGoogle = ({gToken}): Promise<void> =>
    ApiCall.signInWithGoogle({gToken})
      .then(authData => runInAction(() => {
        this.authData = authData;
        this.authed = true;
        console.log(this.authed, 'AuthStore')
      }));


  public signInWithToken = () =>
    ApiCall.signInWithToken()
      .then(authData => runInAction(() => {
        this.authData = authData;
        this.authed = true;
        console.log(this.authed, 'AuthStore')
      }));

  public signOut = () =>
    ApiCall.signOut()
      .then(user => runInAction(() => {
        this.authData = null;
        this.authed = false;
        console.log(this.authed, 'AuthStore')
      }))
}

export default AuthStore;
