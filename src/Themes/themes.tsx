import { createMuiTheme } from '@material-ui/core/styles';
import { lightBlue, cyan, purple } from '@material-ui/core/colors';



export const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#81d4fa'
    },
    secondary: {
      main: '#b3e5fc',
    },
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: '#1a237e',
    },
    secondary: {
      main: '#3949ab',
    },
  },
});