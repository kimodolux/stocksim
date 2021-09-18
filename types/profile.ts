import { Stock } from "./stocks"

export type Profile = {
  id: string
  stocks: Stock[]
  money: number
}
