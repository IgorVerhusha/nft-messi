
const styles = theme => ({
    root: {
        flexGrow: 1,
        position: "fixed",
        [theme.breakpoints.down('md')]: {
            width: "100%",
            margin: "0 auto",
        },
    },
    grow: {
        flexGrow: 1,
    },
    main: {

    },
    container: {
        // marginTop: "18rem",
        // left: "20%",
        marginLeft: "20%",
        paddingTop: theme.spacing(1),
    },
    spacer: {
        padding: "5px",
    },
    panel: {
        margin: "0 auto",
        textAlign: "center",
    },
    auctionTitleContainer: {
        textAlign: "center",
    },
    auctionContainer: {
        marginTop: "20px",
        [theme.breakpoints.down('lg')]: {
            top: '-120px',
        },
        [theme.breakpoints.down('md')]: {
            marginTop: "-200px",
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: "20px",
        },
    },
    auctionTitle: {
        color: "#ffffff",
        fontSize: "1.3rem",
        fontWeight: 700,
        letterSpacing: "0.1em",
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: {
            fontSize: "1rem",
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: "1rem",
        },
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
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 30,
            paddingRight: 30,
        },
    },
    buttons: {
      display: 'flex',
        justifyContent: 'center',
    },
    panelButtonText: {
        fontSize: "0.95rem",
        fontWeight: 800,
        letterSpacing: "0.1em",
    },
});

export default styles;
