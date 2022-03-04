const styles = theme => ({
    root: {
        flexGrow: 1,
        top: "20%",
        left: "auto",
        right: "35%",
        position: "fixed",
    },
    grow: {
        flexGrow: 1,
    },
    main: {

    },
    container: {
        // marginTop: "10rem",
        paddingTop: theme.spacing(1),
    },
    spacer: {
        padding: "5px",
    },
    panel: {
        width: 400,
        margin: "0 auto",
        display: "grid",
        textAlign: "center",
    },
    inputContainer: {
        marginTop: "10px",
    },
    inputField: {
        backgroundColor: "black",
        border: "2px solid #f3efde",
        borderRadius: "30px",
        marginBottom: "30px",
        color: "#f3efde",
        "& .MuiOutlinedInput-input": {
            marginLeft: 0,
            padding: "14px 14px",
        },
    },
    panelButton: {
        color: "#000000",
        backgroundColor: "#fadf78",
        marginLeft: "3rem",
        marginRight: "3rem",
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: "15px",

    },
    panelButtonText: {
        fontSize: "0.90rem",
        fontWeight: 600,
    },
    panelButtonBack: {
        color: "#ffffff",
    },
    panelButtonBackText: {
        fontWeight: 600,
    },
    link: {
        textDecoration: "none",
    },
    linkText: {
        color: "#ffffff",

    }
});

export default styles;