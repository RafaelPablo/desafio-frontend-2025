import { TransactionsProvider } from "./contexts/TransactionsContext";
import { Transactions } from "./pages/Transactions";
import { GlobalStyle } from "./styles/global";
import { ThemeProviderCustom } from "./contexts/ThemeContext";

export function App() {
  return (
    <ThemeProviderCustom>
      <GlobalStyle />
      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>
    </ThemeProviderCustom>
  );
}