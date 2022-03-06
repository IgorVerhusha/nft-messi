import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import { useMediaQuery } from 'react-responsive';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';
import { Alert, AlertTitle } from '@material-ui/lab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

import { TABLET_OR_MOBILE_MAX_WIDTH } from '../../services/Common';
import { useAuthContext } from "../../services/AuthService";
import { useNotificationContext } from "../../services/NotificationService";
import { useAppContext } from '../../services/AppService';
import { styles } from './styles';
import NavMenu from '../../components/NavMenu/index.js'

const Header = (props) => {
    const { classes } = props;
    const auth = useAuthContext();
    const notifications = useNotificationContext();
    const app = useAppContext();
    const isTabletOrMobile = useMediaQuery({ maxWidth: TABLET_OR_MOBILE_MAX_WIDTH });
    const [settingsMenuAnchorEl, setSettingsMenuAnchorEl] = useState(null);


    const errorTitles = {
        "error": "Error",
        "info": "Info",
        "warning": "Warning"
    }

    // Handlers
    const toggleDrawer = (open) => () => {
        if (open) {
            app.dispatch({
                type: "DRAWER_OPEN"
            });
        } else {
            app.dispatch({
                type: "DRAWER_CLOSE"
            });
        }
    };
    const closeNotificationAlert = () => {
        notifications.dispatch({
            type: "HIDE_ALERT"
        })
    };
    const openSettingsMenu = (event) => {
        setSettingsMenuAnchorEl(event.currentTarget);
    };
    const closeSettingsMenu = (event) => {
        setSettingsMenuAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed" elevation={0} color="transparent" className={classes.appBar}>
                <Toolbar variant="dense">
                    {isTabletOrMobile &&
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={toggleDrawer(!app.state.drawerOpen)}>
                            <MenuIcon />
                        </IconButton>
                    }
                    {isTabletOrMobile && app.state.drawerOpen && <NavMenu/>}
                    {!isTabletOrMobile &&
                        <IconButton className={classes.menuButtonHomeArea} color="inherit" aria-label="Menu" component={Link} to="/">
                            <span className={classes.homeLinkArea}> </span>
                        </IconButton>
                    }
                    <div className={classes.grow} />
                    {!isTabletOrMobile && !app.state.menuDisabled &&
                        <div className={classes.menuContainer}>
                            {auth.state.isAuthenticated && auth.state.account_type == "user" && !auth.state.email_verified &&
                                <Typography variant="caption" className={classes.wrapIconContainer}>
                                    <Icon className={classes.wrapIcon}>email</Icon>
                                    <span>Email not verified</span>
                                </Typography>
                            }
                            {auth.state.isAuthenticated && auth.state.account_type == "user" && !auth.state.identity_verified &&
                                <Typography variant="caption" className={classes.wrapIconContainer}>
                                    <Icon className={classes.wrapIcon2}>published_with_changes</Icon>
                                    <span>Account is still being verified</span>
                                </Typography>
                            }
                            {auth.state.isAuthenticated && auth.state.account_type == "user" &&
                                <IconButton className={classes.menuItem} color="inherit" component={Link} to="/bidhistory">
                                    <Typography variant="caption">&nbsp;Bid History</Typography>
                                </IconButton>
                            }
                            <IconButton className={classes.menuItem} color="inherit" component={Link} to="/contact">
                                <Typography variant="caption">&nbsp;Contact</Typography>
                            </IconButton>

                            {!auth.state.isAuthenticated &&
                                <IconButton className={classes.menuItemButton} color="inherit" component={Link} to="/loginpanel">
                                    <Typography variant="caption">&nbsp;Sign in</Typography>
                                </IconButton>
                            }
                            {auth.state.isAuthenticated &&
                                <>
                                    <IconButton className={classes.menuItem} color="inherit" onClick={openSettingsMenu}>
                                        <Typography variant="caption">&nbsp;Account</Typography>
                                    </IconButton>
                                    <Menu
                                        anchorEl={settingsMenuAnchorEl}
                                        keepMounted
                                        open={Boolean(settingsMenuAnchorEl)}
                                        onClose={closeSettingsMenu}
                                    >
                                        {auth.state.account_type == "user" &&
                                            [
                                                <MenuItem key="0" component={Link} to="/verifyidentity" onClick={closeSettingsMenu}>Verification</MenuItem>,
                                                <Divider key="1" />,
                                                <MenuItem key="2" component={Link} to="/userdetails" onClick={closeSettingsMenu}>User Details</MenuItem>,
                                                <Divider key="3" />
                                            ]
                                        }

                                        {auth.state.account_type == "admin" &&
                                            [
                                                <MenuItem key="0" onClick={closeSettingsMenu}>Admin</MenuItem>,
                                                <Divider key="1" className={classes.subMenuDivider} />,
                                                <MenuItem key="2" className={classes.subMenuItem} component={Link} to="/admin/auctions" onClick={closeSettingsMenu}>Auction</MenuItem>,
                                                <Divider key="3" className={classes.subMenuDivider} />,
                                                <MenuItem key="4" className={classes.subMenuItem} component={Link} to="/admin/users" onClick={closeSettingsMenu}>Users</MenuItem>,
                                                <Divider key="5" className={classes.subMenuDivider} />,
                                                <MenuItem key="6" className={classes.subMenuItem} component={Link} to="/admin/bids" onClick={closeSettingsMenu}>Bids</MenuItem>,
                                                <Divider key="7" className={classes.subMenuDivider} />,
                                            ]
                                        }
                                        <MenuItem component={Link} to="/logout" onClick={closeSettingsMenu}>Sign out</MenuItem>
                                    </Menu>
                                </>
                            }
                        </div>
                    }
                </Toolbar>
            </AppBar>
            <Collapse
                className={classes.alertContainer}
                in={notifications.state.displayAlert}
            >
                <Alert
                    onClose={closeNotificationAlert}
                    severity={notifications.state.severity}
                >
                    <AlertTitle>
                        {errorTitles[notifications.state.severity]}
                    </AlertTitle>
                    {notifications.state.message}
                </Alert>
            </Collapse>
        </div>
    );
}

export default withStyles(styles)(Header);
