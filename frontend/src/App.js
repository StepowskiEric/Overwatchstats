import AuthContextProvider from './context/auth'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'

import Dashboard from './Dashboard/Dashboard'
import LoginPage from './components/Login/LoginPage'

import { useAuth } from './context/auth'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: red[500],
    },
    green: {
      main: green[500]
    }
  },
})

function App() {

  const { isLoggedIn } = useAuth()

  return (
    <ThemeProvider theme={theme}>
      {
        isLoggedIn ?
        <Dashboard />
        :
        <LoginPage />
      }
    </ThemeProvider>
  )
}

export default App