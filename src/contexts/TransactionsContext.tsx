import { ReactNode, useEffect, useState, useCallback } from 'react'
import { api } from '../services/api'
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
  fetchTransactions: (query?: string, field?: "description" | "value" | "date") => Promise<void>;
  createTransaction: (data: CreateTransaction) => Promise<void>
  deleteTransaction: (data: DeleteTransaction) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(async (query?: string, field: "description" | "value" | "date" = "description") => {
 
    let formattedQuery = query;
  
    if (field === "date" && query) {
      const [day, month, year] = query.split("/");
      const targetDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`).toISOString().split("T")[0];
  
      const response = await api.get("transactions");
  
      const filteredTransactions = response.data.filter((transaction: Transaction) => {
        const transactionDate = new Date(transaction.date).toISOString().split("T")[0];
        return transactionDate === targetDate;
      });
   
      setTransactions(filteredTransactions);
      return;
    }
  
    const response = await api.get("transactions", {
      params: {
        _sort: field,
        _order: "desc",
        [field]: formattedQuery,
      },
    });
  
    setTransactions(response.data);
  }, []);
  

  const createTransaction = useCallback(
    async (data: CreateTransaction) => {
      const { description, value, date } = data

      const [year, month, day] = date.toISOString().split("T")[0].split("-").map(Number);

      const now = new Date();
    
      const formattedDate = new Date(year, month - 1, day, now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds()).toISOString(); 

      const response = await api.post('transactions', {
        description,
        value,
        date: formattedDate,
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