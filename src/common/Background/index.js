import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@material-ui/core';
import { useMediaQuery } from 'react-responsive';

import { TABLET_OR_MOBILE_MAX_WIDTH } from '../../services/Common';
import { useAppContext } from '../../services/AppService';
import styles from './styles';


const Background = (props) => {
    const { classes } = props;
    const { history } = props;

    // Get Context
    const app = useAppContext();

    // Component States
    const isTabletOrMobile = useMediaQuery({ maxWidth: TABLET_OR_MOBILE_MAX_WIDTH });

    // Setup Component
    useEffect(() => {
    }, []);

    if (isTabletOrMobile) {
        return (
            <div id="bg">
                <img src="/background_mobile.png" alt="" />
            </div>
        );
    } else {
        return (
            <div id="bg">
                {app.state.background == 'blank' && <img src="/background.png" alt="" />}
                {app.state.background == 'messi' && <img src="/messi.png" alt="" />}
            </div>
        );
    }
};

export default withStyles(styles)(Background);