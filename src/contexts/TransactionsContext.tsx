import { ReactNode, useEffect, useState, useCallback } from 'react'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'
interface Transaction {
  id: number
  description: string
  value: number
  date: Date
}

interface CreateTransaction {
  description: string
  value: number
  date: Date
}

interface DeleteTransaction {
  id: number
}

interface TransactionsContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransaction) => Promise<void>
  deleteTransaction: (data: DeleteTransaction) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    console.log('query', query);
    const response = await api.get('transactions', {
      params: {
        _sort: 'date',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(response.data)
  }, [])

  const createTransaction = useCallback(
    async (data: CreateTransaction) => {
      const { description, value, date } = data

      const response = await api.post('transactions', {
        description,
        value,
        date,
      })

      setTransactions((state) => [response.data, ...state])
    },
    [],
  )

  const deleteTransaction = useCallback(
    async (data: DeleteTransaction) => {
      const { id } = data
      await api.delete(`transactions/${id}`)
      setTransactions((state) => state.filter((transaction) => transaction.id !== id))
    }
  , [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
        deleteTransaction
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}