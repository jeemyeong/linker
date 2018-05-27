import { CategoryData } from 'app/type/category-data';

export interface ReorderBoardCommand {
  categories: Array<CategoryData>
  email: string
}

export class ReorderBoardCommand {
  constructor({categories, email}: {categories: Array<CategoryData>, email: string}) {
    this.categories = categories;
    this.email = email;
  }
}