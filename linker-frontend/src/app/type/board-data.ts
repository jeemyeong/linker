import { CategoryData } from 'app/type/category-data';
import { UserData } from 'app/type/user-data';

export interface BoardData {
  id: number
  title: string
  categories?: Array<CategoryData>
  user?: UserData
}