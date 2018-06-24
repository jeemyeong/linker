import { action, observable, runInAction } from 'mobx';
import { BoardData } from 'app/type/board-data';
import { ApiCall } from 'app/network/api-call';
import { rootStore } from 'app/app';
import { STORE_BOARD } from 'app/constants/stores';

export class NavStore {
  @observable boards: BoardData[] = [];
  @observable currentBoardId? :number;

  @action
  getBoards = ({userId}: {userId: number}) =>
    ApiCall.getUserBoards({userId})
      .then(boards => runInAction(() => {
        this.boards = boards;
        return boards[0] && boards[0].id;
      })).then((boardId => this.changeCurrentBoard({boardId})));

  @action
  createBoard = ({title}: {title: string}) => {
    return ApiCall.newBoard({title})
      .then( board => runInAction(() =>{
          this.boards.push(board);
          return board.id
      })).then((boardId => this.changeCurrentBoard({boardId})));
  };

  @action
  deleteBoard = ({board}: {board: BoardData}) => {
    return ApiCall.deleteBoard({boardId: board.id})
      .then(() => runInAction(() => {
        this.boards = this.boards.filter(
          (b) => b.id !== board.id
        );
        if (this.currentBoardId == board.id) {
          const boardId = this.boards[0] && this.boards[0].id || null;
          return this.changeCurrentBoard({boardId});
        }
        return Promise.resolve();
      }))
  };

  @action
  updateBoardTitle = ({board, title}: {board: BoardData, title: string}) => {
    return ApiCall.updateBoardTitle({boardId: board.id, title})
      .then(board => runInAction(() => {
        this.boards.find(b => b.id == board.id).title = board.title;
        return board.id
      }))
  };

  @action
  changeCurrentBoard = ({boardId}: {boardId: number}): Promise<void> => {
    this.currentBoardId = boardId;
    return this.currentBoardId && rootStore[STORE_BOARD].getBoard({id: this.currentBoardId})
  }
}