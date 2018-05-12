import { observable } from 'mobx';
import { CategoryModel } from 'app/models/category-model';

export interface LinkModelProps {
  id?: number
  order?: number
  content?: string
  category: CategoryModel
  url?: string
}

export class LinkModel {
  @observable public id: number;
  @observable public order: number;
  @observable public content: string;
  @observable public category: CategoryModel;
  @observable public url: string;

  constructor({
    id = 0,
    content = '',
    category,
    url = '',
    order = 0
  } : LinkModelProps) {
    this.id = id;
    this.content = content;
    this.category = category;
    this.url = url;
    this.order = order;
  }
}
