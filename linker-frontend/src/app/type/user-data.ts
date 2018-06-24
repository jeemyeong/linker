export interface AuthData {
  id: number
  email: string
  googleId?: string
  name: string
  link?: string
  locale?: string
  picture?: string
  provider?: string
  role?: string
  boards? : number[]
}