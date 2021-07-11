import { React } from 'react-redux';
import './ui/App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import MenuBar from './ui/MenuBar';
import ConfirmationDialog from './ui/ConfirmationDialog';
import PushNotification from './ui/PushNotification';
import InventoryTable from './ui/InventoryTable';

const theme = createMuiTheme({
  palette: {
    error: {
      main: '#FFA500',
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <MenuBar />
    <InventoryTable />
    <PushNotification />
    <ConfirmationDialog />
  </ThemeProvider>
);

export default App;
