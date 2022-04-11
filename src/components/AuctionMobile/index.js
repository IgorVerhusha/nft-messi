import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from "react-router-dom";
import { withStyles } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import NumberFormat from "react-number-format";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';


import { TABLET_OR_MOBILE_MAX_WIDTH } from '../../services/Common';
import { useAppContext } from '../../services/AppService';
import { useAuthContext } from "../../services/AuthService";
import { useNotificationContext } from "../../services/NotificationService";
import DataService from "../../services/DataService";
import styles from './styles';
import Countdown from '../Countdown';
import { StyledTab, StyledTabs } from '../../app/StyledComponents';
import { epochToJsDate } from "../../services/Common";

export const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: "0.80rem",
        lineHeight: "1.0rem",
    },
    body: {
        fontSize: "0.80rem",
        lineHeight: "0.7rem",
        border: "none"
    },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
    root: {

    },
}))(TableRow);


const AuctionMobile = (props) => {
    const { classes } = props;
    let history = useHistory();

    console.log("================================== Auction ======================================");

    // Get Context
    const app = useAppContext();
    const auth = useAuthContext();
    const notifications = useNotificationContext();

    // Component States
    const isTabletOrMobile = useMediaQuery({ maxWidth: TABLET_OR_MOBILE_MAX_WIDTH });
    const [currentBidAmount, setCurrentBidAmount] = useState(0);
    const [auction, setAuction] = useState(null);
    const loadAuction = () => {
        DataService.GetAuctionDetails()
            .then(function (response) {
                setAuction(response.data);
                setCurrentBidAmount(response.data["auction_start_amount"]);

                // Check if auction is live
                if (!response.data.live && !response.data.ended) {
                    history.push('/');
                }

            })
    }
    const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [emptyRows, setEmptyRows] = useState(0);
    const [bids, setBids] = useState([]);
    const loadBids = () => {
        DataService.GetBids(false, pageNumber, pageSize)
            .then(function (response) {
                setBids(response.data);
                setPageCount(response.data.length);
                setEmptyRows(pageSize - response.data.length);

                let count = Math.ceil(response.data.length);
                // Get current bid amount
                if (count > 0) {
                    setCurrentBidAmount(response.data[0].bid_amount);
                }
            });
        DataService.GetBids(true)
            .then(function (response) {
                let count = Math.ceil(response.data[0]["count"]);
                setTotalCount(count);
            });


    }
    const [dialogOpen, setDialogOpen] = useState(false);
    const [bidAmount, setBidAmount] = useState(0);
    const [acceptTerms, setAcceptTerms] = useState(false);

    // Setup Component
    useEffect(() => {
        app.dispatch({
            type: "SET_BACKGROUND",
            background: 'auction',
        });
        app.dispatch({
            type: "MENU_ENABLE"
        });

        // Get Auction Details
        loadAuction();

        const timeout = setInterval(() => {
            loadBids();
        }, 3000);
        return () => clearInterval(timeout);
    }, []);
    useEffect(() => {
        loadBids();
    }, [pageNumber, pageSize]);

    // Component Handlers
    const handleTabChange = (event, newValue) => {
        setSelectedTabIndex(newValue);
    };
    const handlePlaceBid = () => {
        notifications.dispatch({
            type: "HIDE_ALERT"
        });
        // Check if the bid price is greater than the current bid
        if (bidAmount <= currentBidAmount) {
            notifications.dispatch({
                type: "DISPLAY_ALERT",
                payload: { "message": "Bid needs to be greater that current bid amount", "severity": "error" }
            })
            return;
        }
        // Check if the bid price is greater than max bid amount
        if (auction.bid_max_amount > 0 && (bidAmount - currentBidAmount > auction.bid_max_amount)) {
            notifications.dispatch({
                type: "DISPLAY_ALERT",
                payload: { "message": "Bid amount cannot be greater than " + auction.bid_max_amount, "severity": "error" }
            })
            return;
        }

        DataService.PlaceBid({ "bid_amount": bidAmount, "accept_terms_and_conditions": acceptTerms })
            .then(function (response) {
                console.log(response.data);

                loadBids();
                setBidAmount(0);
            })
            .catch(function (error) {
                console.log(error.response);
                notifications.dispatch({
                    type: "DISPLAY_ALERT",
                    payload: { "message": error.response.data.detail, "severity": "error" }
                })
            })

    }
    const enableBid = () => {
        // if (auth.state.isAuthenticated && auth.state.account_type == "user" && auth.state.email_verified && auth.state.identity_verified) {
        //     return true;
        // } else {
        //     return false;
        // }
        return true;
    }
    const handleDialogClose = () => {
        setDialogOpen(false);
    }
    const handleDialogOpen = () => {
        loadBids();
        setDialogOpen(true);
    }
    const handlePageChange = (event, newPage) => {
        setPageNumber(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        console.log(event.target.value);
        setPageSize(parseInt(event.target.value, 10));
        setPageNumber(0);
    };

    // Component Methods
    const buildLeftStyle = () => {
        let style = {};
        if (isTabletOrMobile) {
            style.bottom = "5%";
            style.left = "-2%";
        } else {
            style.top = "76%";
            style.left = "17%";
        }

        return style;
    }
    const buildRightStyle = () => {
        let style = {};
        if (isTabletOrMobile) {
            style.top = "5%";
            style.left = "50%";
        } else {
            style.top = "18%";
            style.right = "2%";
        }

        return style;
    }
    const getButtonStyle = () => {
        if (enableBid()) {
            return classes.panelButton;
        } else {
            return classes.panelButtonDisabled;
        }
    }
    const getButtonStyle2 = () => {
        if (acceptTerms) {
            return classes.panelButton;
        } else {
            return classes.panelButtonDisabled;
        }
    }



    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <div>
                        {children}
                    </div>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
    };


    const useStyles1 = makeStyles((theme) => ({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    }));
    function TablePaginationActions(props) {
        const classes = useStyles1();
        const theme = useTheme();
        const { count, page, rowsPerPage, onPageChange } = props;

        const handleFirstPageButtonClick = (event) => {
            onPageChange(event, 0);
        };

        const handleBackButtonClick = (event) => {
            onPageChange(event, page - 1);
        };

        const handleNextButtonClick = (event) => {
            onPageChange(event, page + 1);
        };

        const handleLastPageButtonClick = (event) => {
            onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        };

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </div>
        );
    }

    TablePaginationActions.propTypes = {
        count: PropTypes.number.isRequired,
        onPageChange: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
        rowsPerPage: PropTypes.number.isRequired,
    };

    return (
        <div className={classes.root} >
            <main className={classes.main}>
                <div className={classes.panelLeft} style={buildLeftStyle()}>
                    <div className={classes.auctionContainer}>
                        {auction && auction.live &&
                            <div>
                                <Typography className={classes.auctionCountdownTitle}>
                                    AUCTION ENDS IN
                                </Typography>
                                <div className={classes.auctionCountdownContainer}>
                                    <Countdown startDate={auction.auction_end}></Countdown>
                                </div>

                            </div>
                        }

                    </div>
                </div>
                <div className={classes.panelRight} style={buildRightStyle()}>
                    <Typography variant='h5' className={classes.auctionTitle1}>
                        1 of 1 Ballon d'Or 2021
                    </Typography>
                    <Typography variant='h4' className={classes.auctionTitle2}>
                        LIONEL MESSI NFT
                    </Typography>
                    <Typography variant='body' className={classes.auctionTitle3}>
                        with unique Experience
                    </Typography>
                    <div className={classes.auctionDetailContainer}>
                        <StyledTabs value={selectedTabIndex} onChange={handleTabChange} aria-label="styled tabs example">
                            <StyledTab label="View" className={classes.button}/>
                            <StyledTab label="Bids" className={classes.button}/>
                            <StyledTab label="Info" className={classes.button}/>
                            <StyledTab label="Experience" className={classes.button}/>
                            <StyledTab label="History" className={classes.button}/>
                        </StyledTabs>
                        <TabPanel value={selectedTabIndex} index={0} className={classes.tabPanel}>
                            <div className={classes.background}></div>
                        </TabPanel>
                        <TabPanel value={selectedTabIndex} index={1} className={classes.tabPanel}>
                            <div className={classes.bidsTableContainer}>
                                {bids.length == 0 &&
                                    <div>
                                        <Typography className={classes.message}>
                                            No bids to display
                                        </Typography>
                                    </div>
                                }
                                {bids.length > 0 &&
                                    <Table className={classes.table} size="small">
                                        <TableBody>
                                            {bids && bids.map((row, index) => (
                                                <StyledTableRow key={index}>
                                                    <StyledTableCell>{row.username}</StyledTableCell>
                                                    <StyledTableCell>{epochToJsDate(row.created_at)}</StyledTableCell>
                                                    <StyledTableCell className={classes.tableBidAmount}>
                                                        <NumberFormat
                                                            prefix="$"
                                                            value={row.bid_amount}
                                                            displayType="text"
                                                            thousandSeparator={true}
                                                        />
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                        <TableFooter>
                                            <StyledTableRow>
                                                <TablePagination
                                                    rowsPerPageOptions={[10]}
                                                    colSpan={8}
                                                    count={totalCount}
                                                    rowsPerPage={pageSize}
                                                    page={pageNumber}
                                                    SelectProps={{
                                                        inputProps: { 'aria-label': 'rows per page' },
                                                        native: true,
                                                    }}
                                                    onPageChange={handlePageChange}
                                                    onRowsPerPageChange={handleRowsPerPageChange}
                                                    ActionsComponent={TablePaginationActions}
                                                />
                                            </StyledTableRow>
                                        </TableFooter>
                                    </Table>
                                }
                            </div>
                            <div className={classes.placeBidContainer}>
                                <div className={classes.placeBidCurrentPrice}>
                                    <Typography className={classes.placeBidCurrentPriceText}>Current bid:</Typography>
                                    <Typography variant='h5' className={classes.placeBidCurrentPriceValue}>
                                        <NumberFormat
                                                prefix="$"
                                                value={currentBidAmount}
                                                displayType="text"
                                                thousandSeparator={true}
                                        />
                                    </Typography>
                                </div>
                                {auction && auction.live &&
                                        <div>
                                            {auth.state.isAuthenticated &&
                                                    <IconButton className={getButtonStyle()} color="inherit" onClick={() => handleDialogOpen()} disabled={!enableBid()}>
                                                        <Typography className={classes.panelButtonText}>&nbsp;PLACE A BID</Typography>
                                                    </IconButton>
                                            }
                                            {!auth.state.isAuthenticated &&
                                                    <IconButton className={classes.panelButtonDisabled} color="inherit" component={Link} to="/loginpanel">
                                                        <Typography className={classes.panelButtonText}>&nbsp;SIGN IN TO BID</Typography>
                                                    </IconButton>
                                            }
                                        </div>
                                }
                                <div>

                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel value={selectedTabIndex} index={2} className={classes.tabPanel}>
                            <p className={classes.auctionInfoText}>
                                Digital Collectibles, known as NFTs (Non-Fungible Tokens), are one-of-a-kind items with digital certificates of authenticity.
                                Buying and owning a digital collectible means you have a certificate of ownership. Your authentic, verifiable digital collectibles are stored
                                on the Blockchain, a secure and transparent digital ledger.
                            </p>
                            <p className={classes.auctionInfoText}>
                                This 1 of 1 NFT is your chance to own a piece of history.
                                Ballon d'Or 2021 is Lionel Messi's 6th time winning the award. He won the Ballon d'Or more times than any other player.
                                This is the first NFT ever featuring Ballon d'Or and the first NFT of Messi as a part of the PSG club.
                            </p>
                            <div className={classes.placeBidContainer}>
                                <div className={classes.placeBidCurrentPrice}>
                                    <Typography className={classes.placeBidCurrentPriceText}>Current bid:</Typography>
                                    <Typography variant='h5' className={classes.placeBidCurrentPriceValue}>
                                        <NumberFormat
                                                prefix="$"
                                                value={currentBidAmount}
                                                displayType="text"
                                                thousandSeparator={true}
                                        />
                                    </Typography>
                                </div>
                                {auction && auction.live &&
                                        <div>
                                            {auth.state.isAuthenticated &&
                                                    <IconButton className={getButtonStyle()} color="inherit" onClick={() => handleDialogOpen()} disabled={!enableBid()}>
                                                        <Typography className={classes.panelButtonText}>&nbsp;PLACE A BID</Typography>
                                                    </IconButton>
                                            }
                                            {!auth.state.isAuthenticated &&
                                                    <IconButton className={classes.panelButtonDisabled} color="inherit" component={Link} to="/loginpanel">
                                                        <Typography className={classes.panelButtonText}>&nbsp;SIGN IN TO BID</Typography>
                                                    </IconButton>
                                            }
                                        </div>
                                }
                                <div>

                                </div>
                            </div>
                            <div className={classes.backgroundMain}></div>
                        </TabPanel>
                        <TabPanel value={selectedTabIndex} index={3} className={classes.tabPanel}>
                            <p className={classes.auctionInfoText}>
                                <strong style={{ "color": "#ffffff" }}>Money Can't Buy Experience with Lionel Messi:</strong>
                                <br />
                                <br />
                                - Spend 2 days in Paris for 2 people
                                <br />
                                - Assist in a training session including a meet and greet with Lionel Messi (subject to Covid Protocols) including picture/video with the player
                                <br />
                                - Unique experience during a game at the Parc des Princes
                                <br />
                                <br />
                                Note: Experience included in NFT is for a one time use only.
                            </p>
                            <div className={classes.placeBidContainer}>
                                <div className={classes.placeBidCurrentPrice}>
                                    <Typography className={classes.placeBidCurrentPriceText}>Current bid:</Typography>
                                    <Typography variant='h5' className={classes.placeBidCurrentPriceValue}>
                                        <NumberFormat
                                                prefix="$"
                                                value={currentBidAmount}
                                                displayType="text"
                                                thousandSeparator={true}
                                        />
                                    </Typography>
                                </div>
                                {auction && auction.live &&
                                        <div>
                                            {auth.state.isAuthenticated &&
                                                    <IconButton className={getButtonStyle()} color="inherit" onClick={() => handleDialogOpen()} disabled={!enableBid()}>
                                                        <Typography className={classes.panelButtonText}>&nbsp;PLACE A BID</Typography>
                                                    </IconButton>
                                            }
                                            {!auth.state.isAuthenticated &&
                                                    <IconButton className={classes.panelButtonDisabled} color="inherit" component={Link} to="/loginpanel">
                                                        <Typography className={classes.panelButtonText}>&nbsp;SIGN IN TO BID</Typography>
                                                    </IconButton>
                                            }
                                        </div>
                                }
                                <div>

                                </div>
                            </div>
                            <div className={classes.backgroundMain}></div>
                        </TabPanel>
                        <TabPanel value={selectedTabIndex} index={4} className={classes.tabPanel}>
                            <p className={classes.auctionHistory}>
                                <div style={{ "color": "#ffffff" }}>NFT Chain:</div>
                                <Icon>link</Icon>
                                <br />
                                <span style={{ "color": "#ffffff" }}>Current address:</span>
                            </p>
                            <div className={classes.placeBidContainer}>
                                <div className={classes.placeBidCurrentPrice}>
                                    <Typography className={classes.placeBidCurrentPriceText}>Current bid:</Typography>
                                    <Typography variant='h5' className={classes.placeBidCurrentPriceValue}>
                                        <NumberFormat
                                                prefix="$"
                                                value={currentBidAmount}
                                                displayType="text"
                                                thousandSeparator={true}
                                        />
                                    </Typography>
                                </div>
                                {auction && auction.live &&
                                        <div>
                                            {auth.state.isAuthenticated &&
                                                    <IconButton className={getButtonStyle()} color="inherit" onClick={() => handleDialogOpen()} disabled={!enableBid()}>
                                                        <Typography className={classes.panelButtonText}>&nbsp;PLACE A BID</Typography>
                                                    </IconButton>
                                            }
                                            {!auth.state.isAuthenticated &&
                                                    <IconButton className={classes.panelButtonDisabled} color="inherit" component={Link} to="/loginpanel">
                                                        <Typography className={classes.panelButtonText}>&nbsp;SIGN IN TO BID</Typography>
                                                    </IconButton>
                                            }
                                        </div>
                                }
                                <div>

                                </div>
                            </div>
                            <div className={classes.backgroundMain}></div>
                        </TabPanel>
                    </div>
                </div>
                <Dialog open={dialogOpen} onClose={handleDialogClose} className={classes.dialogPaper} maxWidth="xs">
                    <DialogContent className={classes.dialogContainer}>
                        <div className={classes.placeBidCurrentPriceDialog}>
                            <Typography className={classes.placeBidCurrentPriceText}>Current bid:</Typography>
                            <Typography variant='h5' className={classes.placeBidCurrentPriceValue}>
                                <NumberFormat
                                    prefix="$"
                                    value={currentBidAmount}
                                    displayType="text"
                                    thousandSeparator={true}
                                />
                            </Typography>
                            <div className={classes.grow} />
                            <IconButton aria-label="close" className={classes.closeButton} onClick={handleDialogClose}>
                                <Icon>close</Icon>
                            </IconButton>
                        </div>

                        <div style={{ "marginLeft": "50px", "marginRight": "50px" }}>
                            <TextField
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                className={classes.inputField}
                                value={bidAmount}
                                onChange={(e) => setBidAmount(e.target.value)}
                                size="small"
                                fullWidth
                            />

                        </div>
                        {auction && auction.bid_max_amount &&
                            <div style={{ marginBottom: "10px", marginTop: "10px" }} className={classes.placeBidInfoText}>
                                For security purposes increments of bid cannot be greater <br />than <NumberFormat
                                    prefix="$"
                                    value={auction.bid_max_amount}
                                    displayType="text"
                                    thousandSeparator={true}
                                /> above current price
                            </div>
                        }

                        <div>
                            <IconButton className={getButtonStyle2()} color="inherit" onClick={() => handlePlaceBid()} disabled={!acceptTerms}>
                                <Typography className={classes.panelButtonText}>&nbsp;PLACE A BID</Typography>
                            </IconButton>
                        </div>
                        <div style={{ "marginLeft": "50px", "marginRight": "50px" }}>
                            <FormControlLabel
                                control={<Checkbox checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} name="checkedA" />}
                                label="Agree to terms and conditions of the auction"
                                className={classes.inputCheckbox}
                            />
                        </div>
                        <div style={{ marginTop: "10px", marginBottom: "10px" }} className={classes.placeBidInfoText}>
                            by confirming your bid you agree to pay the final price SHOULD YOU BE THE WINNER
                            <br />
                            Final payment can be made in flat via bank transfer or in a crypto currency listed in our terms and conditions
                        </div>
                    </DialogContent>
                </Dialog>
            </main >
        </div >
    );
};

export default withStyles(styles)(AuctionMobile);
