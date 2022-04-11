import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';

import { useAuthContext } from "../../../services/AuthService";
import { GetUserDisplayName, GetUserInitials } from "../../../services/Common";
import styles from './styles';

const SettingsMenu = (props) => {
    const { classes } = props;
    let { page } = props;

    // Get Auth Context
    const auth = useAuthContext();

    // Get display name and initials
    let display_name = GetUserDisplayName(auth.state.username, auth.state.full_name);
    let initials = GetUserInitials(display_name);

    return (
        <div>
            <Box display="flex">
                <Avatar className={classes.avatar} variant="square">{initials}</Avatar>
                <Typography variant="h6" className={classes.avatarText}>
                    {display_name}
                </Typography>
            </Box>
            <MenuList>
                <MenuItem selected={page == 'profile'} component={Link} to="/settings/profile">Profile</MenuItem>
                <Divider />
                <MenuItem selected={page == 'account'} component={Link} to="/settings/account">Account</MenuItem>
                <Divider />
                <MenuItem selected={page == 'logout'} component={Link} to="/logout">Logout</MenuItem>
            </MenuList>
        </div>
    );
};

export default withStyles(styles)(SettingsMenu);
