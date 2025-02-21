import * as Dialog from '@radix-ui/react-dialog'
import {
  CloseButton,
  Content,
  Overlay
} from './styles'
import { X } from 'phosphor-react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../contexts/TransactionsContext'

const newTransactionFormSchema = z.object({
  description: z.string(),
  value: z.number(),
  date: z.date(),
})

type NewTransactionsFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction
    },
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionsFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  })

  async function handleCreateNewTransaction(data: NewTransactionsFormInputs) {
    let { description, value, date } = data

    await createTransaction({
      description,
      value,
      date
    })

    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>
        
        <Dialog.Description></Dialog.Description>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="currency"
            placeholder="Valor"
            required
            {...register('value', { valueAsNumber: true })}
          />
          <input
            type="date"
            placeholder="Data"
            required
            {...register('date', { valueAsDate: true })}
          />
          <button type="submit" disabled={isSubmitting}>
            Salvar
          </button>
        </form>
        
      </Content>
    </Dialog.Portal>
  )
}