import { action, observable, runInAction, toJS } from 'mobx';
import * as R from 'ramda';
import { BoardData } from 'app/type/board-data';
import { LinkData } from 'app/type/link-data';
import { CategoryData } from 'app/type/category-data';
import { UpdateBoardCommand } from "app/type/update-board-command";
import { ApiCall } from 'app/network/api-call';
import { rootStore } from 'app/app';
import { STORE_UI } from 'app/constants/stores';

export class BoardStore {
  constructor(board: BoardData = null) {
    this.board = board;
    this.isLoading = true;
  }

  @observable public board?: BoardData;
  @observable public isLoading: boolean;
  private maxLinkId = 0;
  private maxCategoryId = 0;

  @action
  getBoard = ({id}: {id: number}) => {
    this.isLoading = true;
    return ApiCall.getBoard({id})
      .then(board => runInAction(() =>{
        this.board = board;
        this.isLoading = false;
        this.maxLinkId = Math.max(...R.unnest(this.board.categories.map(category => R.unnest(category.links.map(link => link.id))))) + 1;
        this.maxCategoryId = Math.max(...this.board.categories.map(category => category.id)) + 1;
      }))
      .catch(() => runInAction(() => {
        this.board = null;
        this.isLoading = false;
      }));
  };

  private reorder = <T>({list, originIndex, newIndex}: {list: T[], originIndex: number, newIndex: number}): T[] => {
    const result = Array.from(list);
    const [removed] = result.splice(originIndex, 1);
    result.splice(newIndex, 0, removed);
    return result;
  };

  private update = () => ApiCall
    .updateBoard({id: this.board.id, updateBoardCommand: new UpdateBoardCommand({board: this.board})})
    .then(board => runInAction(() =>{
      if (R.equals(toJS(this.board), board)) {
        return;
      }
      this.board = board;
      this.isLoading = false;
      this.maxLinkId = Math.max(...R.unnest(this.board.categories.map(category => R.unnest(category.links.map(link => link.id))))) + 1;
      this.maxCategoryId = Math.max(...this.board.categories.map(category => category.id)) + 1;
    }))
    .catch((e) => rootStore[STORE_UI].openSnackbar({message: 'Error for update'}) || this.getBoard({id: this.board.id}).then(() => Promise.reject(e)))
  ;

  @action
  reorderCategories = ({originIndex, newIndex}) => {
    this.board.categories = this.reorder({list: this.board.categories, originIndex, newIndex});
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
  addLink = ({url, category}: {url: string, category: CategoryData}) => {
    const link: LinkData = {
      url,
      id: this.maxLinkId,
      content: '',
    };
    this.maxLinkId += 1;
    this.board.categories.find(c => c.id == category.id).links.push(link);
    return this.update()
  };

  @action
  deleteLink = ({ targetLink }: {targetLink: LinkData}) => {
    const category = R.find(category => R.contains(targetLink, category.links), this.board.categories);
    category.links = category.links.filter(link => link.id != targetLink.id);

    return this.update()
  };

  @action
  addCategory = ({title}: {title: string}) => {
    const category: CategoryData = {
      id: this.maxCategoryId,
      title: title,
      links: []
    };
    this.maxCategoryId += 1;
    this.board.categories = [category, ...this.board.categories];
    return this.update()
  };

  @action
  updateCategory = ({category, title}: {category: CategoryData, title: string}) => {
    this.board.categories.find(c => c.id == category.id).title = title;
    return this.update()
  };

  @action
  updateLink = ({link, url}: {link: LinkData, url: string}) => {
    this.board.categories.forEach(
      c => {
        const l = c.links.find(l => l.id == link.id)
        if(l) {
          l.url = url;
        }
      }
    );
    return this.update()
  };

  @action
  deleteCategory = ({category}: {category: CategoryData}) => {
    this.board.categories = this.board.categories.filter(c => c.id != category.id)
    return this.update()
  }
}

export default BoardStore;
