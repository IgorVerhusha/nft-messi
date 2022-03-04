
const styles = theme => ({
    root: {
        flexGrow: 1,
        top: "15%",
        left: "25%",
        position: "fixed",
    },
    grow: {
        flexGrow: 1,
    },
    main: {

    },
    container: {
    },
    spacer: {
        padding: "5px",
    },
    panel: {
        width: 700,
        margin: "0 auto",
        display: "grid",
        textAlign: "center",

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
    userGrid: {
        textAlign: "left",
    },
    image: {
        width: 200,
        marginTop: "20px",
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
});

export default styles;