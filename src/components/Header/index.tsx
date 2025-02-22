import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import { ThemeButton } from "../../styles/styles";
import * as Dialog from "@radix-ui/react-dialog";
import { NewTransactionModal } from "../NewTransactionModal";
import { useTheme } from "../../contexts/ThemeContext"; 

export function Header() {
  const { toggleTheme, isDarkTheme } = useTheme();

  return (
    <HeaderContainer>
      <HeaderContent>
        <ThemeButton onClick={toggleTheme}>
          {isDarkTheme ? "Light" : "Dark"}
        </ThemeButton>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova Transação</NewTransactionButton>
          </Dialog.Trigger>
          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
