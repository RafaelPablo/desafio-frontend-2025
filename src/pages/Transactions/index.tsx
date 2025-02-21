import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { SearchForm } from './components/SearchForm'
import * as Dialog from '@radix-ui/react-dialog'
import { DeleteTransactionModal } from '../../components/DeleteTransactionModal'
import {
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
  DeleteTransactionButton
} from './styles'

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            <tr>
              <td>Descrição</td>
              <td>Valor</td>
              <td>Data</td>
              <td>Ações</td>
            </tr>
            {transactions.map((transaction) => {
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