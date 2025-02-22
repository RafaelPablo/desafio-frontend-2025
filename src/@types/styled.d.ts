import 'styled-components'
import { darkTheme } from '../styles/themes/dark'

type ThemeType = typeof defaultTheme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}