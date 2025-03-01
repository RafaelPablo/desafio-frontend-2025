import { Transaction } from "../models/Transaction";

export type FilterState = "all" | "income" | "outcome";

export const filterReducer = (state: FilterState): FilterState => {
  if (state === "all") return "income";
  if (state === "income") return "outcome";
  return "all";
};

export function filterTransactions(transactions: Transaction[], filterType: FilterState): Transaction[] {
  return transactions.filter((transaction) => {
    if (filterType === "income") return transaction.value > 0;
    if (filterType === "outcome") return transaction.value < 0;
    return true;
  });
}
