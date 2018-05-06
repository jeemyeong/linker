import { observable } from 'mobx';

export type Title = string
export type ColumnTitle = Title
export type Id = number;
export type ColumnId = Id;
export type Order = number;
export type ColumnOrder = Order;

export class LinkColumnModel {
  @observable public id: ColumnId;
  @observable public title: ColumnTitle;
  @observable public order: ColumnOrder;

  constructor({id, title, order}: LinkColumnModel) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}