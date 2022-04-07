
const styles = theme => ({
    root: {
        flexGrow: 1,

    },
    grow: {
        flexGrow: 1,
    },
    main: {
        width: "100%",
    },
    container: {
        paddingTop: theme.spacing(1),

    },
    spacer: {
        padding: "5px",
    },
    spacerSmall: {

    },
    panelLeft: {
        width: 400,
        margin: "0 auto",
        display: "grid",
        textAlign: "center",
        position: "fixed",
    },
    panelRight: {
        width: 750,
        margin: "0 auto",
        display: "grid",
        textAlign: "center",
        position: "fixed",
        [theme.breakpoints.down('md')]: {
            width: "auto",
            margin: "0 auto",
            left: '50%',
            transform: 'translate(-50%)',
        },
    },
    auctionDetailContainer: {
        width: 400,
        marginLeft: "200px",
        [theme.breakpoints.down('sm')]: {
            margin: "0 auto",
            width: 360,
        },
    },
    button: {
        [theme.breakpoints.down('sm')]: {
            marginRight: "10px",
        },
    },
    auctionContainer: {
        marginTop: "20px",
    },
    auctionCountdownTitle: {
        color: "#ffffff",
        fontSize: "1.5rem",
        fontWeight: 700,
        letterSpacing: "0.1em",
    },
    auctionTitle1: {
        fontSize: "1.rem",
        letterSpacing: "0.1em",
    },
    auctionTitle2: {
        fontSize: "3.5rem",
        letterSpacing: "0.15em",
        [theme.breakpoints.down('md')]: {
            fontSize: "2rem",
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: "1.5rem",
        },
    },
    auctionTitle3: {
        fontSize: "1.1rem",
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
    tabPanel: {
        paddingTop: "10px",
        paddingBottom: "10px",
        textAlign: "left",
    },
    auctionInfoText: {
        fontSize: "0.75rem",
        color: "#cecece",
    },
    auctionHistory: {
        textAlign: "center",
        fontSize: "0.75rem",
    },
    bidsTableContainer: {
        minHeight: "240px",
        [theme.breakpoints.down('xl')]: {
            minHeight: "200px",
        },
        [theme.breakpoints.down('md')]: {
            minHeight: "120px",
        },
    },
    placeBidContainer: {
        marginTop: 10,
    },
    placeBidCurrentPrice: {
        "display": "inline-flex",
        marginBottom: "20px",
    },
    placeBidCurrentPriceDialog: {
        "display": "inline-flex",
        marginBottom: "20px",
        width: "100%",
    },
    placeBidCurrentPriceText: {
        paddingTop: "10px",
        paddingRight: "20px",
        fontSize: "1.2rem",
        color: "#ffffff",
    },
    placeBidCurrentPriceValue: {
        fontSize: "2.2rem",
    },
    placeBidButton: {

    },
    message: {
        fontSize: "0.75rem",
    },
    panelButton: {
        color: "#000000",
        backgroundColor: "#fadf78",
        marginLeft: "1.2rem",
        marginRight: "1.5rem",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 70,
        paddingRight: 70,
        borderRadius: "22px",
        background: "-webkit-linear-gradient(#fadf78, #f6edd3)",
    },
    panelButtonDisabled: {
        color: "#000000",
        backgroundColor: "#fadf78",
        marginLeft: "1.2rem",
        marginRight: "1.5rem",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 70,
        paddingRight: 70,
        borderRadius: "22px",
        background: "-webkit-linear-gradient(#cecece, #3e3e3e)",
        "& .MuiIconButton-label": {
            color: "#000000",
        }
    },
    panelButtonText: {
        fontSize: "0.95rem",
        fontWeight: 800,
        letterSpacing: "0.1em",
    },
    inputField: {

        "& .MuiOutlinedInput-root": {
            border: "1px solid #cecece",
            backgroundColor: "#191919",
            borderRadius: "30px",
            color: "#cecece",
        },

    },
    // dialogPaper: {
    //     "& .MuiPaper-rounded": {
    //         borderRadius: "13px",
    //     },
    //     "& .MuiDialogContent-root:first-child": {
    //         paddingTop: "5px",
    //     },
    // },
    // dialogContainer: {
    //     backgroundColor: "#191919",
    //     border: "1px solid #fadf78",
    //     // padding: "20px",
    //     borderRadius: "15px",
    //     textAlign: "center",
    // },
    placeBidInfoText: {
        fontSize: "0.6rem",
        color: "#cecece",
    },
    inputCheckbox: {
        color: "#f3efde",
        marginBottom: "2px",

        "& .MuiTypography-body1": {
            fontSize: "0.70rem",
            fontWeight: 700,
        }
    },
    tableBidAmount: {
        color: "#fadf78",
        fontSize: "0.85rem",
        fontWeight: 800,
        textAlign: "right",
    },
});

export default styles;
