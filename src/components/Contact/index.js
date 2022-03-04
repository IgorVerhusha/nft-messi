import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

import { useAppContext } from '../../services/AppService';
import DataService from "../../services/DataService";
import styles from './styles';


const Contact = (props) => {
    const { classes } = props;

    console.log("================================== Contact ======================================");

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
            type: "MENU_ENABLE"
        });
    }, []);

    // Handlers



    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Container maxWidth="sm" className={classes.container}>
                    <div className={classes.panel}>
                        <Typography variant="h4" className={classes.title}>
                            CONTACT US
                        </Typography>
                        <div className={classes.spacer}></div>
                        <div className={classes.contactNameContainer}>
                            <Typography className={classes.contactName}>
                                Paris-Saint Germain
                            </Typography>
                            <a className={classes.contactEmail} href="mailto:example@email.com">example@email.com</a>
                        </div>
                        <div className={classes.spacer}></div>
                        <div className={classes.contactSocialContainer}>
                            <Typography className={classes.contactSocialTitle}>
                                Follow us
                            </Typography>
                            <div>
                                <TwitterIcon className={classes.contactSocialIcon} />
                                <InstagramIcon className={classes.contactSocialIcon} />
                            </div>
                        </div>
                    </div>
                </Container>
            </main>
        </div>
    );
};

export default withStyles(styles)(Contact);