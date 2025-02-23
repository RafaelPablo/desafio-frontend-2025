import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../contexts/TransactionsContext'
import { useMemo } from 'react'

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.value > 0) {
          acc.income += transaction.value
          acc.balance += transaction.value
        } else {
          acc.outcome += transaction.value
          acc.balance += transaction.value
        }
        return acc
      },
      { income: 0, outcome: 0, balance: 0 },
    )
  }, [transactions])

  return summary
}