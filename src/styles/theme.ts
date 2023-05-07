import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
        error: {
            main: '#f44336',
        },
        warning: {
            main: '#ff9800',
        },
        info: {
            main: '#2196f3',
        },
        success: {
            main: '#4caf50',
        },
        background: {
            default: '#191414',
            paper: '#282828',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#B3B3B3',
        },
        action: {
            hover: '#4caf50',
        }
    },

});

export default theme;
