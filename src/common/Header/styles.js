

export const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    appBar: {
        // marginTop: 40,
        maxWidth: '100%',
    },
    appLink: {
        color: "inherit",
        textDecoration: "inherit",
    },
    appTitle: {
        fontSize: "1.286rem",
        lineHeight: "1.33",
        fontWeight: "800",
        letterSpacing: "3px"
    },
    menuContainer: {
        marginTop: 40,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 5,
        color: "#ffde84",
        zIndex: 1,
    },
    menuItem: {
        color: "#ffff",
        marginRight: "1.5rem",
    },
    menuItemButton: {
        color: "#000000",
        backgroundColor: "#fadf78",
        marginLeft: "1.2rem",
        marginRight: "1.5rem",
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: "15px",
    },
    menuItemNotification: {

    },
    alertContainer: {
        position: "fixed",
        top: "0",
        left: "40%",
        zIndex: 3000,
    },
    subMenuItem: {
        fontSize: "0.85rem",
        paddingLeft: "30px",
    },
    subMenuDivider: {
        marginLeft: "30px",
    },
    wrapIconContainer: {
        verticalAlign: 'middle',
        display: 'inline-grid',
        paddingLeft: 20,
    },
    wrapIcon: {
        marginLeft: 30,
    },
    wrapIcon2: {
        marginLeft: 60,
    },
    menuButtonHomeArea: {
        marginLeft: -12,
        marginTop: '2.5%',
        marginRight: 5,
        color: "#ffde84",
        zIndex: 1,
    },
    homeLinkArea: {
        top: '100px',
        width: "15vw",
        height: "10vh",
    },
});


export default styles;
