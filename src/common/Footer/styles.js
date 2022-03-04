import { pink, red } from "@material-ui/core/colors";

const styles = theme => ({
    root: {
        flexGrow: 1,
        maxWidth: "100%",
        backgroundColor: "transparent",
        bottom: 0,
        left: "auto",
        right: 0,
        position: "fixed"
    },
    grow: {
        flexGrow: 1,
    },
    footerContainer: {
        display: "flex",
        padding: "20px",
    },
    footerLinks: {
        paddingLeft: "20px",
        paddingRight: "20px",
    },
});

export default styles;