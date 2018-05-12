import { observable, action } from 'mobx';
import { CategoryModel } from 'app/models';
import config from '../../config';
import axios from 'axios';
export class CategoryStore {
  constructor(categories: CategoryModel[] = []) {
    this.updateCategories(categories);
  }

  @observable public categories = new Array<CategoryModel>();

  @action
  addCategories = (categories: CategoryModel[]): void =>
    this.updateCategories([...this.categories, ...categories]);

  @action
  updateCategories = (categories: CategoryModel[]): void => {
    this.categories = [...categories].sort((a, b) => a.order - b.order);
  };

  @action
  getAllCategories = (): Promise<void> =>
    axios
      .get<Array<CategoryModel>>(`${config.API_URL}/categories/all`)
      .then(this.updateCategoriesFromResponse);

  @action
  editCategories = (id: number, data: Partial<CategoryModel>): void => {
    this.categories = this.categories.map((category) => {
      if (category.id === id) {
        if (typeof data.title == 'string') {
          category.title = data.title;
        }
      }
      return category;
    });
  };

  @action
  deleteCategories = (category: CategoryModel): void => {
    this.categories = this.categories.filter((i) => i !== category);
  };

  reorderCategories = ({ originIndex, newIndex }): Promise<void> => {
    const originOrder = originIndex + 1;
    const newOrder = newIndex + 1;

    const categories = [...this.categories];
    const originCategory = categories.find(
      (category) => category.order == originOrder
    );
    if (originOrder < newOrder) {
      categories
        .filter(
          (category) =>
            category.order > originOrder && category.order <= newOrder
        )
        .forEach((category) => {
          category.order -= 1;
        });
    } else {
      categories
        .filter(
          (category) =>
            category.order >= newOrder && category.order < originOrder
        )
        .forEach((category) => {
          category.order += 1;
        });
    }
    originCategory.order = newOrder;

    this.updateCategories(categories);

    return axios
      .post<Array<CategoryModel>>(
        `${config.API_URL}/categories/reorder`,
        categories
      )
      .then(this.updateCategoriesFromResponse);
  };

  updateCategoriesFromResponse = ({
    data: categories
  }: {
    data: Array<CategoryModel>;
  }) => this.updateCategories(categories);
}

export default CategoryStore;
