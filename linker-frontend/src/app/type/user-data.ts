import { BoardData } from 'app/type/board-data';

export interface UserData {
  id: number
  email: string
  boards?: Array<BoardData>
}