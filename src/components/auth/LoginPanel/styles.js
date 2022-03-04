
const styles = theme => ({
    root: {
        flexGrow: 1,
        top: "25%",
        width: '100%',
        margin: '0 auto',
        position: "fixed",
    },
    grow: {
        flexGrow: 1,
    },
    main: {

    },
    container: {
        // marginTop: 250,
        paddingTop: theme.spacing(1),
    },
    spacer: {
        padding: "5px",
    },
    panel: {
        width: 300,
        margin: "0 auto",
        display: "grid",
    },
    panelButton: {
        color: "#000000",
        backgroundColor: "#fadf78",
        marginLeft: "1.2rem",
        marginRight: "1.5rem",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: "22px",
        background: "-webkit-linear-gradient(#fadf78, #f6edd3)",

    },
    panelButtonText: {
        fontSize: "0.95rem",
        fontWeight: 800,
        letterSpacing: "0.1em",
    },
    panelButtonBack: {
        color: "#ffffff",
    },
    panelButtonBackText: {
        fontWeight: 600,
    },
});

export default styles;
