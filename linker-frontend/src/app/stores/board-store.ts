import { action, observable } from 'mobx';
import ApiCall from 'app/network/api-call';
import { UpdateBoardCommand } from 'app/type/update-board-command';
import * as R from 'ramda';
import { BoardData } from 'app/type/board-data';
import { LinkData } from 'app/type/link-data';
import { CategoryData } from 'app/type/category-data';

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

  private reorder = <T>({list, originIndex, newIndex}: {list: T[], originIndex: number, newIndex: number}): T[] => {
    const result = Array.from(list);
    const [removed] = result.splice(originIndex, 1);
    result.splice(newIndex, 0, removed);
    return result;
  };

  private update = () => ApiCall.updateBoard({id: 1, updateBoardCommand: new UpdateBoardCommand({board: this.board})});

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
    const current: Array<LinkData> = this.board.categories[originColumnIndex].links.slice();
    const next: Array<LinkData> = this.board.categories[newColumnIndex].links.slice();
    const target = current[originIndex];

    // moving to same list
    if (originColumnIndex === newColumnIndex) {
      this.board.categories[originColumnIndex].links = this.reorder<LinkData>({list: current, originIndex, newIndex});
      this.board = {
        ...this.board
      };
      // return this.update()
      return
    }

    // moving to different list
    // remove from original
    current.splice(originIndex, 1);
    // insert into next
    next.splice(newIndex, 0, target);

    this.board.categories[originColumnIndex].links = current;
    // this.board.categories[originColumnIndex].links = [];
    this.board.categories[newColumnIndex].links = next;

    this.board = {
      ...this.board
    };
    console.log("moved")
    return this.update().then(() => console.log("Compeleted"))
  };

  @action
  addLink = ({url, category}: {url: string, category: CategoryData}) => {
    const link: LinkData = {
      url,
      id: 0,
      content: '',
    };
    const categories = [...this.board.categories];
    categories.find(c => c.id == category.id).links.push(link);
    this.board = {
      ...this.board,
      categories: categories
    };
    // return this.update()
    return new Promise((resolve, reject) => {return resolve()})
  };

  @action
  deleteLink = ({ targetLink }: {targetLink: LinkData}) => {
    const categories = this.board.categories.slice();

    const category = R.find(category => R.contains(targetLink, category.links), categories);
    category.links = category.links.filter(link => link.id != targetLink.id);

    this.board = {
      ...this.board,
      categories: categories
    };

    // return this.update()
  };

  @action
  addCategory = ({title}: {title: string}) => {
    const category: CategoryData = {
      id: 0,
      title: title,
      links: []
    };
    this.board = {
      ...this.board,
      categories: [...this.board.categories, category]
    };

    // return this.update()
    return new Promise((resolve, reject) => {return resolve()})
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
