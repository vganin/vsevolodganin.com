import {createTheme} from '@mui/material/styles';
import {blueGrey, red} from '@mui/material/colors';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: blueGrey[500],
        },
        secondary: {
            main: red[500],
        },
    },
});

export default theme;
