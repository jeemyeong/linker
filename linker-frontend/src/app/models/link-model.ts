import { observable } from 'mobx';
import { CategoryModel } from 'app/models/category-model';

export interface LinkModelProps {
  id?: number
  order?: number
  content?: string
  category: CategoryModel
  url?: string
  ogImage?: string
  ogTitle?: string
  ogDescription?: string
}

export class LinkModel {
  @observable public id: number;
  @observable public order: number;
  @observable public content: string;
  @observable public category: CategoryModel;
  @observable public url: string;
  @observable public ogImage: string;
  @observable public ogTitle: string;
  @observable public ogDescription: string;


  constructor({
    id = 0,
    content = '',
    category,
    url = '',
    order = 0,
    ogImage = '',
    ogTitle = '',
    ogDescription = ''
  } : LinkModelProps) {
    this.id = id;
    this.content = content;
    this.category = category;
    this.url = url;
    this.order = order;
    this.ogImage = ogImage;
    this.ogTitle = ogTitle;
    this.ogDescription = ogDescription;
  }
}
