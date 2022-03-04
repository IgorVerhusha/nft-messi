const styles = theme => ({
    timerContainer: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
    },
    timer: {
        paddingLeft: "2.2rem",
        paddingRight: "2.2rem",
        [theme.breakpoints.down('xs')]: {
            paddingLeft: "1.1rem",
            paddingRight: "1.1rem",
        },
    },
    timerNumber: {
        fontSize: "3rem",
        fontWeight: 600,
        color: "#fadf78",
        [theme.breakpoints.down('xs')]: {
            fontSize: "2rem",
        },
    },
    timerText: {
        fontSize: "1rem",
        fontWeight: 600,
    }
});

export default styles;
