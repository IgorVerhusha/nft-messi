import React, {useState} from 'react'
import {withStyles} from '@material-ui/core'
import styles from './styles';
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import {Link} from 'react-router-dom'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import {useAuthContext} from '../../services/AuthService.js'
import {useAppContext} from '../../services/AppService.js'


const NavMenu = (props) => {
    const { classes } = props;
    const auth = useAuthContext();
    const [settingsMenuAnchorEl, setSettingsMenuAnchorEl] = useState(null);
    const app = useAppContext();

    const openSettingsMenu = (event) => {
        setSettingsMenuAnchorEl(event.currentTarget);
    };

    const closeSettingsMenu = (event) => {
        setSettingsMenuAnchorEl(null);
    };

    const handleClose = () => {
            app.dispatch({
                type: "DRAWER_CLOSE"
            });
    };
    return (
            <div className={classes.root}>
                <div className={classes.menuContainer}>
                    <IconButton className={classes.menuItemButton} color="inherit" component={Link} to="/">
                        <Typography variant="caption" onClick={handleClose}>&nbsp;Main</Typography>
                    </IconButton>
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
                                <Typography variant="caption" onClick={handleClose}>&nbsp;Bid History</Typography>
                            </IconButton>
                    }
                    <IconButton className={classes.menuItem} color="inherit" component={Link} to="/contact">
                        <Typography variant="caption"  onClick={handleClose}>&nbsp;Contact</Typography>
                    </IconButton>

                    {!auth.state.isAuthenticated &&
                            <IconButton className={classes.menuItemButton} color="inherit" component={Link} to="/loginpanel">
                                <Typography variant="caption"  onClick={handleClose}>&nbsp;Sign in</Typography>
                            </IconButton>
                    }
                    {auth.state.isAuthenticated &&
                            <>
                                <IconButton className={classes.menuItem} color="inherit" onClick={openSettingsMenu}>
                                    <Typography variant="caption" onClick={closeSettingsMenu}>&nbsp;Account</Typography>
                                </IconButton>
                                <Menu
                                        anchorEl={settingsMenuAnchorEl}
                                        keepMounted
                                        open={Boolean(settingsMenuAnchorEl)}
                                        onClose={closeSettingsMenu}
                                >
                                    {auth.state.account_type == "user" &&
                                            [
                                                <MenuItem key="0" component={Link} to="/verifyidentity" onClick={handleClose}>Verification</MenuItem>,
                                                <Divider key="1" />,
                                                <MenuItem key="2" component={Link} to="/userdetails" onClick={handleClose}>User Details</MenuItem>,
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
            </div>
    )
}

export default withStyles(styles)(NavMenu);
