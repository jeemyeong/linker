import { observable } from 'mobx';
import { LinkModel } from 'app/models/link-model';

export type Title = string;
export type CategoryTitle = Title;
export type Id = number;
export type CategoryId = Id;
export type Order = number;
export type CategoryOrder = Order;

export class CategoryModel {
  @observable public id: CategoryId;
  @observable public title: CategoryTitle;
  @observable public order: CategoryOrder;
  @observable public links: LinkModel[];

  constructor({ id, title, order, links }: CategoryModel) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.links = links.map((link) => new LinkModel(link));
  }
}
