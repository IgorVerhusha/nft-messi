import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';

import { TABLET_OR_MOBILE_MAX_WIDTH } from '../../services/Common';
import { useAppContext } from '../../services/AppService';
import { useAuthContext } from "../../services/AuthService";
import DataService from "../../services/DataService";
import styles from './styles';
import Countdown from '../Countdown';


const Home = (props) => {
    const { classes } = props;

    console.log("================================== Home ======================================");

    // Get Context
    const app = useAppContext();
    const auth = useAuthContext();

    // Component States
    const isTabletOrMobile = useMediaQuery({ maxWidth: TABLET_OR_MOBILE_MAX_WIDTH });
    const [auction, setAuction] = useState(null);
    const loadAuction = () => {
        DataService.GetAuctionDetails()
            .then(function (response) {
                setAuction(response.data);

                let start_date = new Date(response.data.auction_start);
                console.log("Auction Start: ", start_date.toLocaleString());
            })
    }

    // Setup Component
    useEffect(() => {
        app.dispatch({
            type: "SET_BACKGROUND",
            background: 'messi',
        });
        app.dispatch({
            type: "MENU_ENABLE"
        });

        // Get Auction Details
        loadAuction();
    }, []);

    // Methods
    const buildStyle = () => {
        let style = {


        };

        if (isTabletOrMobile) {
            style.top = "52%";
            style.left = "-2%";
        } else {
            style.top = "53%";
            style.left = "48%";
        }

        return style;
    }



    return (
        <div className={classes.root} style={buildStyle()}>
            <main className={classes.main}>
                <Container maxWidth="sm" className={classes.container}>
                    <div className={classes.panel}>
                        <div className={classes.auctionContainer}>
                            {auction && !auction.live && !auction.ended &&
                                <div>
                                    <Typography className={classes.auctionTitle}>
                                        AUCTION STARTS IN:
                                    </Typography>
                                    <div className={classes.auctionCountdownContainer}>
                                        <Countdown startDate={auction.auction_start}></Countdown>
                                    </div>
                                    <div className={classes.spacer}></div>
                                    {!auth.state.isAuthenticated &&
                                        <IconButton className={classes.panelButton} color="inherit" component={Link} to="/loginpanel">
                                            <Typography className={classes.panelButtonText}>&nbsp;REGISTER</Typography>
                                        </IconButton>
                                    }
                                    <div className={classes.spacer}></div>
                                </div>
                            }
                            {auction && auction.live &&
                                <div>
                                    <Typography className={classes.auctionTitle}>
                                        AUCTION IS LIVE - ENDS IN:
                                    </Typography>
                                    <div className={classes.auctionCountdownContainer}>
                                        <Countdown startDate={auction.auction_end}></Countdown>
                                    </div>
                                    <div className={classes.spacer}></div>
                                    {!auth.state.isAuthenticated &&
                                        <IconButton className={classes.panelButton} color="inherit" component={Link} to="/loginpanel">
                                            <Typography className={classes.panelButtonText}>&nbsp;SIGN IN</Typography>
                                        </IconButton>
                                    }
                                    <IconButton className={classes.panelButton} color="inherit" component={Link} to="/auction">
                                        <Typography className={classes.panelButtonText}>&nbsp;VIEW</Typography>
                                    </IconButton>
                                    <div className={classes.spacer}></div>
                                </div>
                            }
                            {auction && auction.ended &&
                                <div>
                                    <Typography className={classes.auctionTitle}>
                                        AUCTION HAS ENDED
                                    </Typography>

                                    <div className={classes.spacer}></div>

                                    <IconButton className={classes.panelButton} color="inherit" component={Link} to="/auction">
                                        <Typography className={classes.panelButtonText}>&nbsp;VIEW</Typography>
                                    </IconButton>
                                    <div className={classes.spacer}></div>
                                </div>
                            }

                            {!isTabletOrMobile &&
                                <div>
                                    <Typography className={classes.auctionDescription}>
                                        Own a 1 of 1 NFT with unique experience of <br />Ballon d'Or 2021 of Lionel Messi
                                    </Typography>
                                </div>
                            }

                        </div>
                    </div>
                </Container>
            </main>
        </div>
    );
};

export default withStyles(styles)(Home);