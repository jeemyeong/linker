import { CategoryData } from 'app/type/category-data';

export interface LinkData {
  id: number
  url: string
  content: string
  ogImage?: string
  ogTitle?: string
  ogDescription?: string
  category?: CategoryData
}