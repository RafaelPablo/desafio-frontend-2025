import * as Dialog from '@radix-ui/react-dialog'
import {
  CloseButton,
  Content,
  Overlay
} from './styles'
import { X } from 'phosphor-react'
import * as z from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { NumericFormat } from 'react-number-format'

const newTransactionFormSchema = z.object({
  description: z.string()
    .min(3, 'A descrição deve ter pelo menos 3 caracteres')
    .nonempty('A descrição é obrigatória')
    .max(100, 'A descrição deve ter no máximo 50 caracteres'),
  
  value: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        const numericValue = parseFloat(val.replace(/[^0-9,-]/g, "").replace(",", "."));
        return isNaN(numericValue) ? NaN : numericValue;
      }
      return val;
    },
    z.number()
      .refine((val) => val !== 0, "O valor não pode ser zero")
      .refine((val) => !isNaN(val), "O valor deve ser um número válido")
  ),    

  date: z.preprocess(
    (val) => new Date(val as string),
    z.date()
      .refine((date) => !isNaN(date.getTime()), 'Data inválida')
      .refine((date) => date <= new Date(), 'A data não pode ser no futuro')
  )
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
    control,
    formState: { errors, isSubmitting },
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
          {errors.description && <span>{errors.description.message}</span>}
          
          <Controller
            control={control}
            name="value"
            render={({ field }) => (
              <NumericFormat
                {...field}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                decimalScale={2}
                fixedDecimalScale
                allowNegative={false}
                placeholder="R$ 0,00"
                onValueChange={(values) => {
                  field.onChange(values.floatValue || 0);
                }}
              />
            )}
          />
          {errors.value && <span>{errors.value.message}</span>}

          <input
            type="date"
            placeholder="Data"
            required
            {...register('date')}
          />
          {errors.date && <span>{errors.date.message}</span>}

          <button type="submit" disabled={isSubmitting}>
            Salvar
          </button>
        </form>
        
      </Content>
    </Dialog.Portal>
  )
}