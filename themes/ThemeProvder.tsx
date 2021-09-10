import CssBaseline from "@material-ui/core/CssBaseline"
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles"
import { StylesProvider } from "@material-ui/core/styles"
import * as React from "react"
import { ThemeProvider as StyledThemeProvider } from "styled-components"
import "@fontsource/roboto"

export const Theme = createTheme({
  palette: {
    primary: {
      contrastText: "#FFFFFF",
      main: "#FF3B3F",
    },
    secondary: {
      contrastText: "#000000",
      main: "#CAEBF2",
    },
    background: {
      default: "#EFEFEF",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
})

type Props = {
  children?: React.ReactNode
}

const ThemeProvider = ({ children }: Props) => (
  <StyledThemeProvider theme={Theme}>
    <MuiThemeProvider theme={Theme}>
      <StylesProvider injectFirst>
        <CssBaseline />
        {children}
      </StylesProvider>
    </MuiThemeProvider>
  </StyledThemeProvider>
)

export default ThemeProvider
