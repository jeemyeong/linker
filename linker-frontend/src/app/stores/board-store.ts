import { action, observable } from 'mobx';
import { BoardData } from 'app/type/board-data';
import ApiCall from 'app/network/api-call';
import { LinkData } from 'app/type/link-data';
import { UpdateBoardCommand } from 'app/type/update-board-command';
import { CategoryData } from 'app/type/category-data';
import * as R from 'ramda';

export class BoardStore {
  constructor(board: BoardData = undefined) {
    this.board = board;
  }

  @observable public board?: BoardData;

  @action
  getBoard = (id: number): Promise<void> =>
    ApiCall.getBoard({id})
      .then(board => action(() =>{
        this.board = board
      })());

  reorder = <T>({list, originIndex, newIndex}: {list: T[], originIndex: number, newIndex: number}): T[] => {
    const result = Array.from(list);
    const [removed] = result.splice(originIndex, 1);
    result.splice(newIndex, 0, removed);
    return result;
  };

  update = (): Promise<void> => ApiCall.updateBoard({id: 1, updateBoardCommand: new UpdateBoardCommand({board: this.board})})
    .then(board => action(() => {
      this.board = board
    })());

  @action
  reorderCategories = ({originIndex, newIndex}): Promise<void> => {
    this.board.categories = this.reorder({list: this.board.categories, originIndex, newIndex});

    return this.update()
  };

  @action
  reorderLink = ({ originColumnIndex, originIndex, newColumnIndex, newIndex }): Promise<void> => {
    const current: Array<LinkData> = [...this.board.categories[originColumnIndex].links];
    const next: Array<LinkData> = [...this.board.categories[newColumnIndex].links];
    const target = current[originIndex];

    // moving to same list
    if (originColumnIndex === newColumnIndex) {
      this.board.categories[originColumnIndex].links = this.reorder<LinkData>({list: current, originIndex, newIndex});
      return this.update()
    }

    // moving to different list
    // remove from original
    current.splice(originIndex, 1);
    // insert into next
    next.splice(newIndex, 0, target);

    this.board.categories[originColumnIndex].links = current;
    this.board.categories[newColumnIndex].links = next;

    return this.update()
  };

  @action
  addLink = ({link, category}: {link: LinkData, category: CategoryData}): Promise<void> => {
    const categories = [...this.board.categories];
    categories.find(c => c.id == category.id).links.push(link);

    this.board = {
      ...this.board,
      categories: categories
    };

    return this.update()
  };

  @action
  deleteLink = ({ targetLink }: {targetLink: LinkData}): Promise<void> => {
    const categories = [...this.board.categories];

    const category = R.find(category => R.contains(targetLink, category.links), categories);
    category.links = category.links.filter(link => link.id != targetLink.id);

    this.board = {
      ...this.board,
      categories: categories
    };

    return this.update()
  };

  @action
  updateCategory = ({category, title}: {category: CategoryData, title: string}): Promise<void> => {
    const categories = [...this.board.categories];
    categories.find(c => c.id == category.id).title = title;
    this.board = {
      ...this.board,
      categories: categories
    };

    return this.update()
  }
}

export default BoardStore;