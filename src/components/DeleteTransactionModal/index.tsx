import * as Dialog from '@radix-ui/react-dialog'
import {
  CloseButton,
  Content,
  Overlay
} from './styles'
import { X } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import * as z from 'zod'

interface DeleteTransactionModalProps {
  transactionId: number;
}

const deleteTransactionFormSchema = z.object({
  transactionId: z.number(),
})

export function DeleteTransactionModal({ transactionId }: DeleteTransactionModalProps) {
  
  const deleteTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.deleteTransaction
    },
  )

  const {
    register,
  } = useForm({
    resolver: zodResolver(deleteTransactionFormSchema),
    defaultValues: { transactionId },
  })

  async function handleDeleteTransaction(data: { transactionId: number }) {
    await deleteTransaction({ id: data.transactionId })
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Excluir Transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form>
          <input type="hidden" {...register('transactionId')} />
          <Dialog.Description>
            Deseja realmente excluir a transação? (Essa ação é irreversível)
          </Dialog.Description>
          <button type="button" onClick={() => handleDeleteTransaction({ transactionId })}>
            Excluir
          </button>
        </form>
        
      </Content>
    </Dialog.Portal>
  )
}