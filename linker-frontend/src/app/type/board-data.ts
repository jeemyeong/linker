import { CategoryData } from 'app/type/category-data';

export interface BoardData {
  id: number
  title: string
  categories?: Array<CategoryData>
}