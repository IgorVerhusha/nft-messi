const styles = theme => ({
   root: {
        backgroundColor: '#11100c',
        height: '100vh',
        width: '50%',
        position: 'fixed',
        top: '0',
        left: '0',
       opacity: 0.9,
       [theme.breakpoints.down('xs')]: {
           width: '70%',
       },
    },
    menuContainer: {
       marginTop: '60px',
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'start',
    },
    wrapIcon: {
        marginRight: 6,
    },
    wrapIcon2: {
        marginRight: 6,
    },
    wrapIconContainer: {
        alignItems: 'center',
        display: 'flex',
        margin: '10px 10px',
    },
});

export default styles;
