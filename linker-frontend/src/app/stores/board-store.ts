import { action, observable } from 'mobx';
import { BoardData } from 'app/type/board-data';
import ApiCall from 'app/network/api-call';
import { LinkData } from 'app/type/link-data';
import { UpdateBoardCommand } from 'app/type/update-board-command';
import { CategoryData } from 'app/type/category-data';
import * as R from 'ramda';

export class BoardStore {
  constructor(board: BoardData = null) {
    this.board = board;
    this.isLoading = true;
  }

  @observable public board?: BoardData;
  @observable public isLoading: boolean;

  @action
  getBoard = (id: number) => {
    this.isLoading = true;
    return ApiCall.getBoard({id})
      .then(board => action(() =>{
        this.board = board;
        this.isLoading = false
      })())
      .catch(() => action(() => {
        this.board = null;
        this.isLoading = false
      })());
  };



  reorder = <T>({list, originIndex, newIndex}: {list: T[], originIndex: number, newIndex: number}): T[] => {
    const result = Array.from(list);
    const [removed] = result.splice(originIndex, 1);
    result.splice(newIndex, 0, removed);
    return result;
  };

  update = () => ApiCall.updateBoard({id: 1, updateBoardCommand: new UpdateBoardCommand({board: this.board})});

  @action
  reorderCategories = ({originIndex, newIndex}) => {
    const newBoard = {
      ...this.board,
      categories: this.reorder({list: this.board.categories, originIndex, newIndex})
    };
    this.board = newBoard;

    return this.update()
  };

  @action
  reorderLink = ({ originColumnIndex, originIndex, newColumnIndex, newIndex }) => {
    const current: Array<LinkData> = [...this.board.categories[originColumnIndex].links];
    const next: Array<LinkData> = [...this.board.categories[newColumnIndex].links];
    const target = current[originIndex];

    // moving to same list
    if (originColumnIndex === newColumnIndex) {
      const newBoard = {
        ...this.board
      };
      newBoard.categories[originColumnIndex].links = this.reorder<LinkData>({list: current, originIndex, newIndex});
      this.board = newBoard;
      return this.update()
    }

    // moving to different list
    // remove from original
    current.splice(originIndex, 1);
    // insert into next
    next.splice(newIndex, 0, target);

    const newBoard = {
      ...this.board,
    };
    newBoard.categories[originColumnIndex].links = current;
    newBoard.categories[newColumnIndex].links = next;
    this.board = newBoard;
    return this.update()
  };

  @action
  addLink = ({url, category}: {url: string, category: CategoryData}) => {
    const link: LinkData = {
      id: 0,
      url,
      content: '',
    };
    const categories = [...this.board.categories];
    categories.find(c => c.id == category.id).links.push(link);

    this.board = {
      ...this.board,
      categories: categories
    };

    return this.update()
  };

  @action
  deleteLink = ({ targetLink }: {targetLink: LinkData}) => {
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
  addCategory = ({title}: {title: string}) => {
    const category: CategoryData = {
      id: 0,
      title,
      links: []
    };
    this.board = {
      ...this.board,
      categories: [...this.board.categories, category]
    };

    return this.update()
  };

  @action
  updateCategory = ({category, title}: {category: CategoryData, title: string}) => {
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
