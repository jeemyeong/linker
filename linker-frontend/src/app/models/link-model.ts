import { observable } from 'mobx';

export interface LinkModelProps {
  id?: number
  order?: number
  content?: string
  url?: string
  ogImage?: string
  ogTitle?: string
  ogDescription?: string
}

export class LinkModel {
  @observable public id: number;
  @observable public order: number;
  @observable public content: string;
  @observable public url: string;
  @observable public ogImage: string;
  @observable public ogTitle: string;
  @observable public ogDescription: string;

  constructor({
    id = 0,
    content = '',
    url = '',
    order = 0,
    ogImage = '',
    ogTitle = '',
    ogDescription = ''
  } : LinkModelProps) {
    this.id = id;
    this.content = content;
    this.url = url;
    this.order = order;
    this.ogImage = ogImage;
    this.ogTitle = ogTitle;
    this.ogDescription = ogDescription;
  }
}
