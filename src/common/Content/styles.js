

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
            top: '-30px',
        },
        [theme.breakpoints.down('xs')]: {
            top: '0px',
        },
    },
});

export default styles;
