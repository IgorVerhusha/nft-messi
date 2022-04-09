import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';

import { useAppContext } from '../../../services/AppService';
import { useNotificationContext } from "../../../services/NotificationService";
import DataService from "../../../services/DataService";
import styles from './styles';


const Auctions = (props) => {
    const { classes } = props;

    // Get Context
    const app = useAppContext();
    const notifications = useNotificationContext();

    // Component States
    const [auction, setAuction] = useState(null);
    const [auctionStart, setAuctionStart] = useState('2022-01-01T10:30');
    const [auctionEnd, setAuctionEnd] = useState('2022-01-01T10:30');
    const [auctionStartAmount, setAuctionStartAmount] = useState(0);
    const [minBidAmount, setMinBidAmount] = useState(0);
    const [maxBidAmount, setMaxBidAmount] = useState(0);
    const loadAuction = () => {
        DataService.GetAuctionDetails()
            .then(function (response) {
                console.log(response.data);
                setAuction(response.data);

                let start_date = new Date(response.data.auction_start);
                console.log("Auction Start: ", start_date.toISOString());
                let end_date = new Date(response.data.auction_end);
                console.log("Auction End: ", start_date.toLocaleString());

                setAuctionStart(getLocalDate(start_date));
                setAuctionEnd(getLocalDate(end_date));
                setAuctionStartAmount(response.data.auction_start_amount);
                setMinBidAmount(response.data.bid_min_amount);
                setMaxBidAmount(response.data.bid_max_amount);
            })
    }


    // Setup Component
    useEffect(() => {
        app.dispatch({
            type: "SET_BACKGROUND",
            background: 'blank',
        });
        app.dispatch({
            type: "MENU_ENABLE"
        });

        // Get Auction Details
        loadAuction();
    }, []);

    // Handlers
    const handleSubmitClick = () => {
        let auctionDetails = {
            auction_start: getEpoch(auctionStart),
            auction_end: getEpoch(auctionEnd),
            auction_start_amount: auctionStartAmount,
            bid_min_amount: minBidAmount,
            bid_max_amount: maxBidAmount
        };

        console.log("Auction Details: ", auctionDetails);

        DataService.SaveAuctionDetails(auctionDetails)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error.response);
                notifications.dispatch({
                    type: "DISPLAY_ALERT",
                    payload: { "message": error.response.data.detail, "severity": "error" }
                })
            })


    }
    const enableSubmit = () => {
        return false;
    }

    // Component Methods
    const offset = new Date().getTimezoneOffset() * 1000 * 60
    const getLocalDate = value => {
        const offsetDate = new Date(value).valueOf() - offset
        const date = new Date(offsetDate).toISOString()
        return date.substring(0, 16)
    }
    const getEpoch = value => {
        console.log(offset)
        const offsetDate = new Date(value).valueOf() + offset / 1000;
        return offsetDate;
    }

    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Container maxWidth="sm" className={classes.container}>
                    <div className={classes.panel}>
                        <Typography variant="h4">
                            AUCTION DETAILS
                        </Typography>
                        <div className={classes.spacer}></div>
                        <div className={classes.spacer}></div>
                        <div className={classes.spacer}></div>
                        <div className={classes.inputContainer}>
                            <FormLabel>START DATE</FormLabel>
                            <div className={classes.spacer}></div>
                            <TextField
                                type="datetime-local"
                                InputLabelProps={{
                                    shrink: true,
                                }}

                                variant="outlined"
                                className={classes.inputField}
                                value={auctionStart}
                                onChange={(e) => setAuctionStart(e.target.value)}
                            />
                            <div className={classes.spacer}></div>
                            <FormLabel>END DATE</FormLabel>
                            <div className={classes.spacer}></div>
                            <TextField
                                type="datetime-local"
                                InputLabelProps={{
                                    shrink: true,
                                }}

                                variant="outlined"
                                className={classes.inputField}
                                value={auctionEnd}
                                onChange={(e) => setAuctionEnd(e.target.value)}
                            />
                            <div className={classes.spacer}></div>
                            <FormLabel>START AMOUNT</FormLabel>
                            <div className={classes.spacer}></div>
                            <TextField
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                className={classes.inputField}
                                value={auctionStartAmount}
                                onChange={(e) => setAuctionStartAmount(e.target.value)}
                            />
                            <div className={classes.spacer}></div>
                            <FormLabel>MIN BID AMOUNT</FormLabel>
                            <div className={classes.spacer}></div>
                            <TextField
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                className={classes.inputField}
                                value={minBidAmount}
                                onChange={(e) => setMinBidAmount(e.target.value)}
                            />
                            <div className={classes.spacer}></div>
                            <FormLabel>MAX BID AMOUNT</FormLabel>
                            <div className={classes.spacer}></div>
                            <TextField
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                className={classes.inputField}
                                value={maxBidAmount}
                                onChange={(e) => setMaxBidAmount(e.target.value)}
                            />

                            <div className={classes.spacer}></div>
                            <div className={classes.spacer}></div>
                            <div className={classes.spacer}></div>
                            <div className={classes.spacer}></div>
                            <IconButton className={classes.panelButton} color="inherit" onClick={() => handleSubmitClick()} disabled={enableSubmit()}>
                                <Typography className={classes.panelButtonText}>&nbsp;SAVE</Typography>
                            </IconButton>
                        </div>
                    </div>
                </Container>
            </main>
        </div>
    );
};

export default withStyles(styles)(Auctions);
