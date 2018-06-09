import { CategoryModel } from 'app/models/category-model';
import { UserModel } from 'app/models/user-model';
import { observable } from 'mobx';

export class BoardModel {
  @observable id: number;
  @observable title: string;
  @observable categories?: Array<CategoryModel>;
  @observable user?: UserModel;

  constructor({id, title, categories, user}: BoardModel) {
    this.id = id;
    this.title = title;
    this.categories = categories.map(cat => new CategoryModel(cat));
    this.user = user;
  }
}