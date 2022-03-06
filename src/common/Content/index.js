import React from 'react';
import { useMediaQuery } from 'react-responsive';

import { TABLET_OR_MOBILE_MAX_WIDTH } from '../../services/Common';
import { useAppContext } from '../../services/AppService';
import Header from "../Header";
import Footer from "../Footer";
import styles from "./styles"
import {withStyles} from '@material-ui/core'

const drawerWidth = 0;
const paddingTop = 0;

const Content = props => {
    const children = props.children;
    const { classes } = props;
    // Get Context
    const app = useAppContext();

    // Component States
    const isTabletOrMobile = useMediaQuery({ maxWidth: TABLET_OR_MOBILE_MAX_WIDTH });

    // Methods
    const buildStyle = () => {
        let style = {};

        if (isTabletOrMobile) {
            style.width = "100%";
            style.height = 0;
            style.paddingTop = "177.5%";
            if (app.state.background == 'blank') {
                style.backgroundImage = "url('/background_mobile.png')";
            } else if (app.state.background == 'messi') {
                style.backgroundImage = "url('/messi_mobile.png')";
            } else if (app.state.background == 'auction') {
                style.backgroundImage = "url('/auction_mobile.png')";
                style.backgroundSize = "100%";
            } else {
                style.backgroundImage = "url('/background_mobile.png')";
            }
        } else {
            style.width = "100%";
            style.paddingTop = "66.64%";
            if (app.state.background == 'blank') {
                style.backgroundImage = "url('/background.png')";
            } else if (app.state.background == 'messi') {
                style.backgroundImage = "url('/messi.png')";
            } else if (app.state.background == 'auction') {
                style.backgroundImage = "url('/auction.png')";
            } else {
                style.backgroundImage = "url('/background.png')";
            }
        }

        return style;
    }

    return (
        <div style={buildStyle()} className={classes.root}>
            <Header></Header>
            {children}
            <Footer></Footer>
        </div>
    );

    // if (isTabletOrMobile) {
    //     return (
    //         <div id="bg">
    //             <Header></Header>
    //             {children}
    //             {/* <img src="/background_mobile.png" alt="" /> */}

    //         </div>
    //     );
    // } else {
    //     return (
    //         <div id="bg2">
    //             <Header></Header>
    //             {children}
    //             {/* {app.state.background == 'blank' && <img src="/background.png" alt="" />}
    //             {app.state.background == 'messi' && <img src="/messi.png" alt="" />} */}
    //         </div>
    //     );
    // }
    // return (
    //     <div>
    //         {children}
    //     </div>
    // );
}

export default withStyles(styles)(Content);
