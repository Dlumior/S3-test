import {createMuiTheme} from "@material-ui/core"

const theme = createMuiTheme({
    palette: {
        primary: {
            light: "#DEF2F1",
            main: "#3AAFA9",
            dark: "#2E908A",
            contrastText: "#ffffff"
        },
        secondary: {
            light: "#2B7A78",
            main: "#17252A",
            dark: "#091118"
        }
    }
});

export default theme;