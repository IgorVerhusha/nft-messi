import {
    createTheme,
} from '@material-ui/core';

const Theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#f3efde',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#0066ff',
            main: '#f3efde',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffffff',
        },
        // error: will use the default color
        info: {
            light: '#0b2c3b',
            main: '#0b2c3b',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffffff',
        },
        background: {
            default: "#E7F4FB"
        },
    },
    typography: {
        useNextVariants: true,
        h6: {
            color: "#fadf78",
            fontSize: "1.1rem",
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            fontWeight: 800,
            background: "-webkit-linear-gradient(#fadf78, #f6edd3)",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
        },
        h5: {
            color: "#fadf78",
            fontSize: "1.2rem",
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            fontWeight: 800,
            background: "-webkit-linear-gradient(#fadf78, #f6edd3)",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
        },
        h4: {
            color: "#fadf78",
            fontSize: "1.8rem",
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            fontWeight: 900,
            background: "-webkit-linear-gradient(#fadf78, #f6edd3)",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
        },
    },
    overrides: {
        MuiOutlinedInput: {
            root: {
                backgroundColor: "#ffffff",
                position: "relative",
                borderRadius: "4px",
            }
        },
    }
});

export default Theme;
