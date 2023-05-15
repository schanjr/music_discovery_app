import {makeStyles} from '@material-ui/styles';

const buttonPadding = 25;

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: "left",
        // zIndex: 9,
        // position: "fixed",
    },
    drawer: {

        paddingRight: `${buttonPadding}px`,
    },
    item: {
        display: 'flex',
        paddingTop: 0,
        paddingBottom: 0,
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#32de66'
        },
    },
    menuOut: {
        display: 'flex',
        color: "white",
        padding: buttonPadding,
    },
    button: {
        padding: '10px 8px',
        justifyContent: 'flex-start',
        textTransform: 'none',
        letterSpacing: 0,
        width: '100%',
    },
    btnRoot: {
        paddingLeft: `${buttonPadding}px`,
        justifyContent: "left !important"
    },
    subMenu0: {
        paddingLeft: `${buttonPadding}px !important`,
    },
    subMenu1: {
        paddingLeft: `${buttonPadding * 2}px !important`,
    },
    subMenu2: {
        paddingLeft: `${buttonPadding * 3}px !important`,
    },
    subMenu3: {
        paddingLeft: `${buttonPadding * 4}px !important`,
    }
}));
export default useStyles;