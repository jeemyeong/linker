import { BoardData } from 'app/type/board-data';
import { LinkData } from 'app/type/link-data';

export interface CategoryData {
  id: number
  title: string
  order: number
  links?: Array<LinkData>
  board?: BoardData
}