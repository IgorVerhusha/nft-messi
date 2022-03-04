import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import styles from './styles';

const Footer = (props) => {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <div className={classes.footerContainer}>
                <a>
                    <Typography variant='caption' className={classes.footerLinks}>Terms and Conditions</Typography>
                </a>
                <a>
                    <Typography variant='caption' className={classes.footerLinks}>Privacy Policy</Typography>
                </a>
            </div>
        </div>
    );
};

export default withStyles(styles)(Footer);
