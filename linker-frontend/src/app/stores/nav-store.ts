import { action, observable, runInAction } from 'mobx';
import { BoardData } from 'app/type/board-data';
import { ApiCall } from 'app/network/api-call';

export class NavStore {
  @observable boards: BoardData[] = [];
  @observable currentBoardId? :number;

  @action
  getBoards = ({userId}: {userId: number}) =>
    ApiCall.getUserBoards({userId})
      .then(boards => runInAction(() => {
        this.boards = boards;
        this.currentBoardId = boards[0] && boards[0].id;
        return this.currentBoardId;
      }))
}