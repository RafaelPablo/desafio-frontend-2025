import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { SearchForm } from './components/SearchForm'
import * as Dialog from '@radix-ui/react-dialog'
import { DeleteTransactionModal } from '../../components/DeleteTransactionModal'
import { useReducer } from "react"
import {
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
  DeleteTransactionButton,
  OrderDescriptionTransactionButton,
  OrderTransactionButton
} from './styles'

interface Transaction {
  id: number;
  description: string;
  value: number;
  date: Date;
}

type SortKey = keyof Pick<Transaction, "description" | "value" | "date">;

interface SortState {
  key: SortKey;
  direction: "asc" | "desc";
}

interface SortAction {
  type: "SET_SORT";
  key: SortKey;
}

const sortReducer = (state: SortState, action: SortAction): SortState => {
  if (state.key === action.key) {
    return { key: action.key, direction: state.direction === "asc" ? "desc" : "asc" };
  }
  return { key: action.key, direction: "asc" };
};

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => context.transactions);

  const [sortConfig, dispatch] = useReducer(sortReducer, { key: "date", direction: "asc" });

  const sortedTransactions = [...transactions].sort((a, b) => {
    const key = sortConfig.key;
    const valueA = a[key];
    const valueB = b[key];
  
    if (key === "description") {
      return sortConfig.direction === "asc"
        ? (valueA as string).localeCompare(valueB as string)
        : (valueB as string).localeCompare(valueA as string);
    }
  
    if (key === "value") {
      return sortConfig.direction === "asc"
        ? (valueA as number) - (valueB as number)
        : (valueB as number) - (valueA as number);
    }

    if (key === "date") {
      return sortConfig.direction === "asc"
      ? (valueA as string).localeCompare(valueB as string)
      : (valueB as string).localeCompare(valueA as string);
    }
  
    return 0;
  });
  

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <thead>
          <tr>
            <td>
              <OrderDescriptionTransactionButton onClick={() => dispatch({ type: "SET_SORT", key: "description" })}>
                Descrição {sortConfig.key === "description" ? (sortConfig.direction === "asc" ? "⬆" : "⬇") : ""}
              </OrderDescriptionTransactionButton>
            </td>
            <td>
              <OrderTransactionButton onClick={() => dispatch({ type: "SET_SORT", key: "value" })}>
                Valor {sortConfig.key === "value" ? (sortConfig.direction === "asc" ? "⬆" : "⬇") : ""}
              </OrderTransactionButton>
            </td>
            <td>
              <OrderTransactionButton onClick={() => dispatch({ type: "SET_SORT", key: "date" })}>
                Data {sortConfig.key === "date" ? (sortConfig.direction === "asc" ? "⬆" : "⬇") : ""}
              </OrderTransactionButton>
            </td>
            <td>
              <OrderTransactionButton>Ações</OrderTransactionButton>
            </td>
          </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighLight variant={
                        transaction.value > 0 ? 'income' : 'outcome'
                      }>
                      {priceFormatter.format(transaction.value)}
                    </PriceHighLight>
                  </td>
                  <td>
                    {dateFormatter.format(new Date(transaction.date))}
                  </td>
                  <td>
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                       <DeleteTransactionButton>x</DeleteTransactionButton>
                      </Dialog.Trigger>
                      <DeleteTransactionModal transactionId={transaction.id}/>
                    </Dialog.Root>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}