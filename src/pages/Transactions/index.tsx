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
  OrderTransactionButton,
  FilterTransactionButton
} from './styles'
import { sortReducer, sortTransactions } from '../../utils/sorting'
import { filterReducer, filterTransactions } from '../../utils/filters'

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => context.transactions);

  const [sortConfig, dispatch] = useReducer(sortReducer, { key: "date", direction: "asc" });
  const sortedTransactions = sortTransactions(transactions, sortConfig);

  const [filterType, dispatchFilter] = useReducer(filterReducer, "all");
  const sortedfiltedTransactions = filterTransactions(sortedTransactions, filterType);

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
              <FilterTransactionButton onClick={() => dispatchFilter()}>
                {filterType === "all" ? "Todos" : filterType === "income" ? "Entradas" : "Saídas"}
              </FilterTransactionButton>
            </td>
          </tr>
          </thead>
          <tbody>
            {sortedfiltedTransactions.map((transaction) => {
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