import { describe, it, vi, expect } from 'vitest'
import { handleCreateNewTransaction, type NewTransactionsFormInputs } from '../src/components/NewTransactionModal/index'

const mockCreateTransaction = vi.fn()

describe('handleCreateNewTransaction', () => {
  it('Deve criar uma nova transação corretamente', async () => {

    const mockCreateTransaction = vi.fn()
    const mockReset = vi.fn()

    const validData: NewTransactionsFormInputs = {
      description: 'Compra de livro',
      value: 100.50,
      date: new Date('2024-02-25'),
    }

    await handleCreateNewTransaction(validData, mockCreateTransaction, mockReset)

    expect(mockCreateTransaction).toHaveBeenCalledOnce()
    expect(mockCreateTransaction).toHaveBeenCalledWith(validData)
    expect(mockReset).toHaveBeenCalledOnce()
  })
})

