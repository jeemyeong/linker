import { observable } from 'mobx';

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

  constructor({id, title, order}: CategoryModel) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}