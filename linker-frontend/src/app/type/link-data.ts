import { CategoryData } from 'app/type/category-data';
import { UserData } from 'app/type/user-data';

export interface LinkData {
  id: number
  url: string
  content: string
  order: number
  ogImage?: string
  ogTitle?: string
  ogDescription?: string
  category?: CategoryData
  user?: UserData
}