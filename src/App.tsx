import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import Snackbar from './components/Snackbar';
import Routes from './Routes';

import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Snackbar />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
