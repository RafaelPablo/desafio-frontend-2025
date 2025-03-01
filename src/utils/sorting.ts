import { Transaction } from "../models/Transaction";

export type SortKey = keyof Pick<Transaction, "description" | "value" | "date">;

export interface SortState {
  key: SortKey;
  direction: "asc" | "desc";
}

export interface SortAction {
  type: "SET_SORT";
  key: SortKey;
}

export const sortReducer = (state: SortState, action: SortAction): SortState => {
  if (state.key === action.key) {
    return { key: action.key, direction: state.direction === "asc" ? "desc" : "asc" };
  }
  return { key: action.key, direction: "asc" };
};

export function sortTransactions(transactions: Transaction[], sortConfig: SortState): Transaction[] {
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
        ? new Date(valueA as string).getTime() - new Date(valueB as string).getTime()
        : new Date(valueB as string).getTime() - new Date(valueA as string).getTime();
    }

    return 0;
  });
  return sortedTransactions;
}
