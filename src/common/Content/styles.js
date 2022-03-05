

const styles = theme => ({
    root: {
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#11100c",
        position: "fixed",
        [theme.breakpoints.down('md')]: {
            top: '-120px',
        },
        [theme.breakpoints.down('sm')]: {
            top: '-80px',
        },
    },
});

export default styles;
