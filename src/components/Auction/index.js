import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {withStyles} from '@material-ui/core'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import {useAppContext} from '../../services/AppService'
import {useAuthContext} from '../../services/AuthService'
import {useNotificationContext} from '../../services/NotificationService'
import DataService from '../../services/DataService'
import styles from './styles.js'
import './aution.scss'
import Countdown from '../Countdown'
import {epochToJsDate} from '../../services/Common'

export const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: '0.80rem',
        lineHeight: '1.0rem',
    },
    body: {
        fontSize: '0.80rem',
        lineHeight: '0.7rem',
        border: 'none'
    },
}))(TableCell)

export const StyledTableRow = withStyles(() => ({
    root: {},
}))(TableRow)


const Auction = (props) => {
    const {classes} = props
    let history = useHistory()

    // Get Context
    const app = useAppContext()
    const auth = useAuthContext()
    const notifications = useNotificationContext()

    // Component States
    const [currentBidAmount, setCurrentBidAmount] = useState(0)
    const [auction, setAuction] = useState(null)
    const loadAuction = () => {
        DataService.GetAuctionDetails()
                .then(function (response) {
                    setAuction(response.data)
                    setCurrentBidAmount(response.data['auction_start_amount'])

                    // Check if auction is live
                    if (!response.data.live && !response.data.ended) {
                        history.push('/')
                    }

                })
    }
    const [selectedTabIndex, setSelectedTabIndex] = React.useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [pageNumber, setPageNumber] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [pageCount, setPageCount] = useState(0)
    const [emptyRows, setEmptyRows] = useState(0)
    const [hoverButton, setHoverButton] = useState(false)
    const [bids, setBids] = useState([])
    const loadBids = () => {
        DataService.GetBids(false, pageNumber, pageSize)
                .then(function (response) {
                    setBids(response.data)
                    setPageCount(response.data.length)
                    setEmptyRows(pageSize - response.data.length)

                    let count = Math.ceil(response.data.length)
                    // Get current bid amount
                    if (count > 0) {
                        setCurrentBidAmount(response.data[0].bid_amount)
                    }
                })
        DataService.GetBids(true)
                .then(function (response) {
                    let count = Math.ceil(response.data[0]['count'])
                    setTotalCount(count)
                })


    }
    const [dialogOpen, setDialogOpen] = useState(false)
    const [bidAmount, setBidAmount] = useState(0)
    const [acceptTerms, setAcceptTerms] = useState(false)

    // Setup Component
    useEffect(() => {
        app.dispatch({
            type: 'SET_BACKGROUND',
            background: 'auction',
        })
        app.dispatch({
            type: 'MENU_ENABLE'
        })

        // Get Auction Details
        loadAuction()

        const timeout = setInterval(() => {
            loadBids()
        }, 3000)
        return () => clearInterval(timeout)
    }, [])
    useEffect(() => {
        loadBids()
    }, [pageNumber, pageSize])

    // Component Handlers
    const handleTabChange = (newValue) => {
        setSelectedTabIndex(newValue)
    }
    const handlePlaceBid = () => {
        notifications.dispatch({
            type: 'HIDE_ALERT'
        })
        // Check if the bid price is greater than the current bid
        if (bidAmount <= currentBidAmount) {
            notifications.dispatch({
                type: 'DISPLAY_ALERT',
                payload: {'message': 'Bid needs to be greater that current bid amount', 'severity': 'error'}
            })
            return
        }
        // Check if the bid price is greater than max bid amount
        if (auction.bid_max_amount > 0 && (bidAmount - currentBidAmount > auction.bid_max_amount)) {
            notifications.dispatch({
                type: 'DISPLAY_ALERT',
                payload: {'message': 'Bid amount cannot be greater than ' + auction.bid_max_amount, 'severity': 'error'}
            })
            return
        }

        DataService.PlaceBid({'bid_amount': bidAmount, 'accept_terms_and_conditions': acceptTerms})
                .then(function (response) {
                    console.log(response.data)

                    loadBids()
                    setBidAmount(0)
                })
                .catch(function (error) {
                    console.log(error.response)
                    notifications.dispatch({
                        type: 'DISPLAY_ALERT',
                        payload: {'message': error.response.data.detail, 'severity': 'error'}
                    })
                })

    }
    const enableBid = () => {
        // if (auth.state.isAuthenticated && auth.state.account_type == "user" && auth.state.email_verified && auth.state.identity_verified) {
        //     return true;
        // } else {
        //     return false;
        // }
        return true
    }
    const handleDialogClose = () => {
        setDialogOpen(false)
    }
    const handleDialogOpen = () => {
        loadBids()
        setDialogOpen(true)
    }
    const handlePageChange = (event, newPage) => {
        setPageNumber(newPage)
    }

    const handleRowsPerPageChange = (event) => {
        console.log(event.target.value)
        setPageSize(parseInt(event.target.value, 10))
        setPageNumber(0)
    }

    const getButtonStyle = () => {
        if (enableBid()) {
            return classes.panelButton
        } else {
            return classes.panelButtonDisabled
        }
    }
    const getButtonStyle2 = () => {
        if (acceptTerms) {
            return classes.panelButton
        } else {
            return classes.panelButtonDisabled
        }
    }


    function TabPanel(props) {
        const {children, value, index, ...other} = props

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
        )
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
    }


    const useStyles1 = makeStyles((theme) => ({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    }))

    function TablePaginationActions(props) {
        const classes = useStyles1()
        const theme = useTheme()
        const {count, page, rowsPerPage, onPageChange} = props

        const handleFirstPageButtonClick = (event) => {
            onPageChange(event, 0)
        }

        const handleBackButtonClick = (event) => {
            onPageChange(event, page - 1)
        }

        const handleNextButtonClick = (event) => {
            onPageChange(event, page + 1)
        }

        const handleLastPageButtonClick = (event) => {
            onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
        }
        return (
                <div className={classes.root}>
                    <IconButton
                            onClick={handleFirstPageButtonClick}
                            disabled={page === 0}
                            aria-label="first page"
                    >
                        {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
                    </IconButton>
                    <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                        {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
                    </IconButton>
                    <IconButton
                            onClick={handleNextButtonClick}
                            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                            aria-label="next page"
                    >
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
                    </IconButton>
                    <IconButton
                            onClick={handleLastPageButtonClick}
                            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                            aria-label="last page"
                    >
                        {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
                    </IconButton>
                </div>
        )
    }

    TablePaginationActions.propTypes = {
        count: PropTypes.number.isRequired,
        onPageChange: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
        rowsPerPage: PropTypes.number.isRequired,
    }

    return (
            <div className="auction-wrapper">
                <img className="background" src="background.png" alt="background"/>
                <main className="main">
                    <img className="messi-nft" src="messi_nft.png" alt="nft"/>

                    <div className="auction__title">
                        <img src="title.png" alt="title"/>
                        <h1>Lionel Messi NFT</h1>
                        <p>1 of 1 Ballon d’Or 2021</p>
                        <span></span>
                    </div>

                    <div className="auction__tabs">
                        {selectedTabIndex === 0 && <div className="auction__tabs-description">
                            <ul>
                                Money Can't Buy Experience with Lionel Messi:
                                <li>
                                    <div></div>
                                    Spend 2 days in Paris for 2 people
                                </li>
                                <li>
                                    <div></div>
                                    Assist in a training session including a meet and greet with
                                    Lionel Messi (subject <br/>
                                    to Covid Protocols) including picture/video with the player
                                </li>
                                <li>
                                    <div></div>
                                    Unique experience during a game at the Parc des Princes
                                </li>
                            </ul>
                            <p>Note: Experience included in NFT is for a one time use only.</p>
                        </div>}
                        {selectedTabIndex === 1 && <div className="auction__tabs-description">
                            {bids?.length ? bids.map((row, index) => (
                                    <div className="bits-elem" key={index}>
                                        <span className="bits-name">{row.username} -</span>
                                        <span className="bits-date">&nbsp;{epochToJsDate(row.created_at)}</span>
                                        <span className="bits-rate">${row.bid_amount}</span>
                                    </div>
                            )) : 'No bids to display'}
                        </div>}
                        {selectedTabIndex === 2 && <div className="auction__tabs-description">
                            <div className="auction__tabs-information">
                                Digital Collectibles, known as NFTs (Non-Fungible Tokens),
                                are one-of-a-kind items with digital certificates of authenticity.
                                Buying and owning a digital collectible means you have a certificate of ownership.
                                Your authentic, verifiable digital collectibles are stored on the Blockchain,
                                a secure and transparent digital ledger.
                                <div className="line-text-break"/>
                                This 1 of 1 NFT is your chance to own a piece of history.
                                Ballon D’Or 2021 is Lionel Messi’s 6th time winning the award. He has won the Ballon
                                d’Or more times than any other player. This is the first NFT ever featuring Ballon
                                d’Or and the first NFT of Messi as a part of the PSG club.
                            </div>
                        </div>}
                        {selectedTabIndex === 3 && <div className="auction__tabs-description">
                            <div className="auction__tabs-information">
                                <div className="nft-chain">
                                    <span>NFT Chain:</span>
                                    <img src="coin.svg" alt="coin"/>
                                </div>
                                <button>View current address</button>
                            </div>
                        </div>}
                        <div className="main__tabs-button">
                            <div className={`tabs-elem ${selectedTabIndex === 0 && 'active'}`}
                                 onClick={() => handleTabChange(0)}>
                                <span className="mini-dot"></span>
                                <span className="mini-dot"></span>
                                <span className="mini-dot"></span>
                                <span>Experience</span>
                                <div className="ball-wrapper">
                                    <img className={selectedTabIndex === 0 ? 'ball' : 'dot'}
                                         src={selectedTabIndex === 0 ? 'ball.svg' : 'dot.svg'} alt=""/>
                                </div>
                            </div>
                            <div className={`tabs-elem ${selectedTabIndex === 1 && 'active'}`}
                                 onClick={() => handleTabChange(1)}>
                                <span className="mini-dot"></span>
                                <span className="mini-dot"></span>
                                <span className="mini-dot"></span>
                                <span>Bids</span>
                                <div className="ball-wrapper">
                                    <img className={selectedTabIndex === 1 ? 'ball' : 'dot'}
                                         src={selectedTabIndex === 1 ? 'ball.svg' : 'dot.svg'} alt=""/>
                                </div>
                            </div>
                            <div className={`tabs-elem ${selectedTabIndex === 2 && 'active'}`}
                                 onClick={() => handleTabChange(2)}>
                                <span className="mini-dot"></span>
                                <span className="mini-dot"></span>
                                <span className="mini-dot"></span>
                                <span>Information</span>
                                <div className="ball-wrapper">
                                    <img className={selectedTabIndex === 2 ? 'ball' : 'dot'}
                                         src={selectedTabIndex === 2 ? 'ball.svg' : 'dot.svg'} alt=""/>
                                </div>
                            </div>
                            <div className={`tabs-elem ${selectedTabIndex === 3 && 'active'}`}
                                 onClick={() => handleTabChange(3)}>
                                <span>History</span>
                                <div className="ball-wrapper">
                                    <img className={selectedTabIndex === 3 ? 'ball' : 'dot'}
                                         src={selectedTabIndex === 3 ? 'ball.svg' : 'dot.svg'} alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="current-bid">
                        <div className="price">
                            <span className="current-text">Current bid:</span>
                            <span className="time-number">$ {currentBidAmount}</span>
                        </div>
                        {auth.state.isAuthenticated ? auth.identity_verified ?
                                <button onClick={() => handleDialogOpen()} className="bid-button">
                                    Place a bid <img src="hammer.svg" alt="hammer"/></button> :
                                <button className="bid-button-gray"
                                        onMouseEnter={() => setHoverButton(true)}
                                        onMouseLeave={() => setHoverButton(false)}>
                                    Place a bid <img src="hammer-grey.svg" alt="hammer"/>
                                </button>
                                     : <button className="bid-button" onClick={() => history.push('/loginpanel')}>
                            Sign in to bid <img src="hammer.svg" alt="hammer"/>
                        </button>}
                        {hoverButton && <div className="tooltip-main">
                            Infortunately we could not verify your identity
                        </div>}
                    </div>

                    <div className="auction__description-container">
                        <span className="auction__description">AUCTION ENDS IN:</span>
                        {auction && auction.live && <Countdown startDate={auction.auction_end}/>}
                    </div>
                </main>
                {dialogOpen && <div className="container-pay">
                    <div className="pay">
                        <button className="pay__exit" onClick={() => handleDialogClose()}>
                            <img src="exit.svg" alt="exit"/>
                        </button>
                        <div className="pay__current-bid">
                            <span className="curent-bit__title">Current bid:</span>
                            <span className="time-number">$ {currentBidAmount}</span>
                        </div>

                        <div className="block_pay">
                            <div className="container_input">
                                <input type="number" placeholder="Your Bid"
                                       value={bidAmount}
                                       onChange={(e) => setBidAmount(e.target.value)}
                                />
                                <button className="bid-button" onClick={() => handlePlaceBid()} disabled={!acceptTerms}>
                                    Place a bid <img src="hammer.svg" alt="hammer"/>
                                </button>
                            </div>
                            <div className="pay__description">
                                <p>
                                    For security purposes increments of bid cannot be greater
                                    <span>than $10,000</span> above current price
                                </p>
                                <label className="label">
                                    <input type="checkbox" className="checkbox"
                                           checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)}/>
                                    <span className="checkbox__fake"></span>
                                    <span className="text"
                                    >Agree to terms and conditions of the auction</span
                                    >
                                </label>
                            </div>
                        </div>

                        <p className="other-text">by confirming your bid you agree to pay the final price SHOULD
                            YOU
                            BE THE WINNER. <br/>
                            Final payment can be made in fiat vio bank transfer or in a
                            cryptocurrency listed in our terms and conditions.</p>
                    </div>
                </div>}
            </div>
    )
}

export default withStyles(styles)(Auction)
