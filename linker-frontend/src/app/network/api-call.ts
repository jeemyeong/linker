import config from '../../config';
import axios from 'axios';
import { BoardResponse } from 'app/type/board-response';
import { ReorderBoardCommand } from 'app/type/reorder-board-command';

const API_URL = config.API_URL;

class ApiCall {
  getBoard = ({id}: {id: number}): Promise<BoardResponse> =>
    axios.get(`${API_URL}/board/${id}`).then(v => v.data);

  updateBoard = ({id, reorderBoardCommand}: {id: number, reorderBoardCommand: ReorderBoardCommand}): Promise<BoardResponse> =>
    axios.put(`${API_URL}/board/${id}`, reorderBoardCommand).then(v => v.data)
}

export default new ApiCall();