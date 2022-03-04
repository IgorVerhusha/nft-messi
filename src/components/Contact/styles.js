
const styles = theme => ({
    root: {
        flexGrow: 1,
        top: "25%",
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
        // marginTop: "12rem",
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
    title: {
        fontSize: "2.3rem",
        letterSpacing: "0.1em",
    },
    contactNameContainer: {
        marginTop: "20px",
    },
    contactName: {
        color: "#ffffff",
        fontSize: "1.5rem",
        fontWeight: 500,
    },
    contactEmail: {
        color: "#ffffff",
        textDecoration: "none",
        fontSize: "1.1rem",
        fontWeight: 800,
    },
    contactSocialContainer: {
        marginTop: "20px",
    },
    contactSocialTitle: {
        color: "#ffffff",
        fontSize: "1.5rem",
        fontWeight: 500,
    },
    contactSocialIconsContainer: {
        display: "flex",
    },
    contactSocialIcon: {
        color: "#ffffff",
        textDecoration: "none",
        fontSize: "2rem",
        margin: "10px",
    },
});

export default styles;