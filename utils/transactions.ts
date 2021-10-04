import { Transaction, TransactionType } from "../types/transactions"

export const displayTransaction = (transaction: Transaction) => {
  switch (transaction.transactionType) {
    case TransactionType.BuyStock:
      return `Bought ${transaction.amount} of ${
        transaction.stock
      } for ${transaction?.cost?.toFixed(2)} on ${new Date(
        transaction.timestamp
      ).toLocaleString("en-US")}`
    case TransactionType.SellStock:
      return `Sold ${transaction.amount} of ${
        transaction.stock
      } for ${transaction?.cost?.toFixed(2)} on ${new Date(
        transaction.timestamp
      ).toLocaleString("en-US")}`
  }
}
