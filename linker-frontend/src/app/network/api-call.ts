import config from '../../config';
import axios from 'axios';
import { UpdateBoardCommand } from 'app/type/update-board-command';
import { BoardData } from 'app/type/board-data';

const API_URL = config.API_URL;

export const ApiCall = {
  getBoard: ({id}: {id: number}): Promise<BoardData> =>
    axios.get(`${API_URL}/board/${id}`).then(v => v.data),
  updateBoard: ({id, updateBoardCommand}: {id: number, updateBoardCommand: UpdateBoardCommand}): Promise<BoardData> =>
    axios.put(`${API_URL}/board/${id}`, updateBoardCommand).then(v => v.data),
  signInWithGoogle: ({gToken}) => axios.post(`${API_URL}/user/sign-in/google`, gToken).then(v => v.data),
  signInWithToken: () => axios.get(`${API_URL}/user/sign-in/token`).then(v => v.data),
  signOut: () => axios.get(`${API_URL}/user/sign-out`).then(v => v.data),
  getUserBoards: ({userId}: {userId: number}) => axios.get(`${API_URL}/user/${userId}/boards`).then(v => v.data),
  newBoard: ({title}: {title: string}): Promise<BoardData> =>
    axios.post(`${API_URL}/board`, {title: title}).then(v => v.data),
  deleteBoard: ({boardId}: {boardId: number}): Promise<null> =>
    axios.delete(`${API_URL}/board/${boardId}`).then(v => v.data),
};
