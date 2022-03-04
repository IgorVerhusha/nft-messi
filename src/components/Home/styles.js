
const styles = theme => ({
    root: {
        flexGrow: 1,
        position: "fixed",
    },
    grow: {
        flexGrow: 1,
    },
    main: {

    },
    container: {
        // marginTop: "18rem",
        // marginLeft: "15rem",
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
    auctionContainer: {
        marginTop: "20px",
    },
    auctionTitle: {
        color: "#ffffff",
        fontSize: "1.5rem",
        fontWeight: 700,
        letterSpacing: "0.1em",
    },
    auctionCountdownContainer: {
        color: "#ffffff",
        marginTop: "10px",
        marginBottom: "25px",
    },
    auctionDescription: {
        color: "#ffffff",
        fontSize: "0.95rem",
        fontWeight: 600,
        marginTop: "10px",
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
});

export default styles;