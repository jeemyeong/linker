import { CategoryData } from 'app/type/category-data';
import { BoardData } from 'app/type/board-data';

export interface UpdateBoardCommand {
  id: number,
  title: string,
  categories: Array<CategoryData>

}

export class UpdateBoardCommand {
  constructor({board}: {board: BoardData}) {
    this.id = board.id;
    this.categories = board.categories;
    this.title = board.title;
  }
}