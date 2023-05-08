import {createMuiTheme} from '@material-ui/core/styles';
import {blueGrey, red} from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: blueGrey[500],
        },
        secondary: {
            main: red[500],
        },
    },
});

export default theme;