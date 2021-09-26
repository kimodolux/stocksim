import { Stock, StockRef } from "./stocks"

export type Profile = {
  id: string
  stocks: StockRef[]
  money: number
}
