import { observable } from 'mobx';
import { LinkColumnModel } from 'app/models/link-column-model';

export class LinkModel {
  @observable public id: number;
  @observable public order: number;
  @observable public content: string;
  @observable public linkColumn: LinkColumnModel;
  @observable public url: string;

  constructor({id = 0, content = "", linkColumn, url = "", order = 0}: LinkModel) {
    this.id = id;
    this.content = content;
    this.linkColumn = linkColumn;
    this.url = url;
    this.order = order;
  }
}
