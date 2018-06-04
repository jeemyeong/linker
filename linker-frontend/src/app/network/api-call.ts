import config from '../../config';
import axios from 'axios';
import { UpdateBoardCommand } from 'app/type/update-board-command';
import { BoardData } from 'app/type/board-data';

const API_URL = config.API_URL;

class ApiCall {
  getBoard = ({id}: {id: number}): Promise<BoardData> =>
    axios.get(`${API_URL}/board/${id}`).then(v => v.data);

  updateBoard = ({id, updateBoardCommand}: {id: number, updateBoardCommand: UpdateBoardCommand}): Promise<BoardData> =>
    axios.put(`${API_URL}/board/${id}`, updateBoardCommand).then(v => v.data)
}

export default new ApiCall();