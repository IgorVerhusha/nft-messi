const styles = theme => ({
    root: {
        flexGrow: 1,
        top: "20%",
        left: "auto",
        right: "40%",
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
        width: 300,
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
    link: {
        textDecoration: "none",
    },
    linkText: {
        color: "#ffffff",

    },
    otpInputStyle: {
        width: "4rem !important",
        height: "4rem",
        margin: "0 1rem",
        fontSize: "2rem",
        borderRadius: "4px",
        // border: "1px solid rgba(0, 0, 0, 0.3)",
        border: "2px solid #f3efde",
        backgroundColor: "black",
        color: "#f3efde",
    },
});

export default styles;