import { useContext } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";
import { formatCurrency } from "../utils/formatCurrency";

export function TransactionsTable() {
  const { transactions } = useContext(TransactionsContext);

  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Valor</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(transaction => (
          <tr key={transaction.id}>
            <td>{transaction.description}</td>
            <td>{formatCurrency(transaction.value)}</td>
            <td>{new Date(transaction.date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
