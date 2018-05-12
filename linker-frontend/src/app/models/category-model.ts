import { observable } from 'mobx';
import { UserModel } from 'app/models/user-model';

export type Title = string
export type CategoryTitle = Title
export type Id = number;
export type CategoryId = Id;
export type Order = number;
export type CategoryOrder = Order;

export class CategoryModel {
  @observable public id: CategoryId;
  @observable public title: CategoryTitle;
  @observable public order: CategoryOrder;
  @observable public user: UserModel;

  constructor({id, title, order, user}: CategoryModel) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.user = user
  }
}