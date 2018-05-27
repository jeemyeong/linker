import { CommonResponse } from 'app/type/common-response';
import { BoardData } from 'app/type/board-data';

export interface BoardResponse extends CommonResponse {
  board: BoardData
}