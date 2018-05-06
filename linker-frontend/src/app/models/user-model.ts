import { observable } from 'mobx';

export class UserModel {
  @observable public id: number;
  @observable public email: string;

  constructor({id, email}: UserModel) {
    this.id = id;
    this.email = email;
  }
}