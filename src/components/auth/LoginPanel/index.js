import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';

import { useAppContext } from '../../../services/AppService';
import styles from './styles';


const LoginPanel = (props) => {
    const { classes } = props;

    console.log("================================== LoginPanel ======================================");

    // Get Context
    const app = useAppContext();

    // Component States

    // Setup Component
    useEffect(() => {
        app.dispatch({
            type: "SET_BACKGROUND",
            background: 'blank',
        });
        app.dispatch({
            type: "MENU_DISABLE"
        });
    }, []);

    // Handlers



    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Container maxWidth="sm" className={classes.container}>
                    <div className={classes.panel}>

                        <IconButton className={classes.panelButton} color="inherit" component={Link} to="/login">
                            <Typography className={classes.panelButtonText}>&nbsp;SIGN IN</Typography>
                        </IconButton>
                        <div className={classes.spacer}></div>
                        <div className={classes.spacer}></div>
                        <div className={classes.spacer}></div>
                        <div className={classes.spacer}></div>
                        <IconButton className={classes.panelButton} color="inherit" component={Link} to="/register">
                            <Typography className={classes.panelButtonText}>&nbsp;REGISTER</Typography>
                        </IconButton>
                        <div className={classes.spacer}></div>
                        <div className={classes.spacer}></div>
                        <div className={classes.spacer}></div>
                        <div className={classes.spacer}></div>
                        <div className={classes.spacer}></div>
                        <IconButton className={classes.panelButtonBack} color="inherit" component={Link} to="/">
                            <Icon>arrow_back_ios</Icon>
                            <Typography className={classes.panelButtonBackText}>&nbsp;Back</Typography>
                        </IconButton>
                    </div>
                </Container>
            </main>
        </div>
    );
};

export default withStyles(styles)(LoginPanel);