export enum TransactionType {
  BuyStock = "BuyStock",
  SellStock = "SellStock",
}

export type Transaction = {
  stock: string
  cost: number
  profileId: StaticRange
  amount: number
  transactionType: TransactionType
  timestamp: Date
}
