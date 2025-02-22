import { SearchFormContainer, RadioButton, SearchRadios} from './styles'
import { MagnifyingGlass } from 'phosphor-react'
import { useForm, Controller } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../../../contexts/TransactionsContext'

const searchFormSchema = z.object({
  query: z.string(),
  type: z.enum(["description", "value", "date"]),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    },
  )

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      type: "description",
    },
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    const { query, type } = data
    await fetchTransactions(query, type)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Buscar Transações"
        {...register('query')}
      />

      <Controller
        control={control}
        name="type"
        render={({ field }) => {
          return (
            <SearchRadios
              onValueChange={field.onChange}
              value={field.value ?? "description"}
            >
              <RadioButton value="description">Descrição</RadioButton>
              <RadioButton value="value">Valor</RadioButton>
              <RadioButton value="date">Data</RadioButton>
          </SearchRadios>
          )
        }}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}