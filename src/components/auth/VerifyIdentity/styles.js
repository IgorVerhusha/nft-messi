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
        // marginTop: "10rem",
        paddingTop: theme.spacing(1),
    },
    spacer: {
        padding: "5px",
    },
    panel: {
        margin: "0 auto",
        display: "grid",
        textAlign: "center",
    },
    panelThankyou: {
        width: 600,
        margin: "0 auto",
        display: "grid",
        textAlign: "center",
    },
    imageUploadContainer: {
        display: "flex",
        margin: "0 auto",
        textAlign: "center",
    },
    imageUpload: {
        margin: "20px",
        paddingLeft: "20px",
        paddingRight: "20px",
        cursor: "pointer",
    },
    imageUploadLabel: {
        fontSize: "1.5rem",
        fontWeight: 500,
    },
    imageUploadIcon: {
        fontSize: "3rem",
    },
    fileInput: {
        display: "none",
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
        "& .Mui-disabled": {
            color: "#000000",
            backgroundColor: "#fadf78",
        }

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

    },
    infoText: {
        color: "#ffffff",
        fontWeight: 500,
    }
});

export default styles;
