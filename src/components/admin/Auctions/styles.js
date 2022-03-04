
const styles = theme => ({
    root: {
        flexGrow: 1,
        top: "15%",
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
        textAlign: "left",
    },
    inputField: {
        // backgroundColor: "black",
        // border: "2px solid #f3efde",
        // borderRadius: "30px",
        // marginBottom: "30px",
        // // marginRight: "20px",
        // color: "#f3efde",
        // "& .MuiOutlinedInput-input": {
        //     marginLeft: 0,
        //     padding: "14px 14px",
        // },
        "& .MuiOutlinedInput-root": {
            border: "2px solid #f3efde",
            // backgroundColor: "black",
            borderRadius: "30px",
            color: "#000000",
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
});

export default styles;