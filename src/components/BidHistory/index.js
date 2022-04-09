import React, {useEffect, useState} from 'react'
import {withStyles} from '@material-ui/core'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import IconButton from '@material-ui/core/IconButton'
import {useAppContext} from '../../services/AppService'
import {useNotificationContext} from '../../services/NotificationService'
import DataService from '../../services/DataService'
import styles from './styles'
import {epochToJsDate} from '../../services/Common'
import './bids-history.scss'
import {useHistory} from 'react-router-dom'

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

const BidHistory = () => {
    const history = useHistory()

    // Get Context
    const notifications = useNotificationContext()
    const app = useAppContext()

    // Component States
    const [totalCount, setTotalCount] = useState(0)
    const [pageNumber, setPageNumber] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [pageCount, setPageCount] = useState(0)
    const [emptyRows, setEmptyRows] = useState(0)
    const [bids, setBids] = useState([])
    const loadBids = () => {
        DataService.GetMyBids(false, pageNumber, pageSize)
                .then(function (response) {
                    setBids(response.data)
                    setPageCount(response.data.length)
                    setEmptyRows(pageSize - response.data.length)
                })
        DataService.GetMyBids(true)
                .then(function (response) {
                    let count = Math.ceil(response.data[0]['count'])
                    setTotalCount(count)
                })


    }

    // Setup Component
    useEffect(() => {
        app.dispatch({
            type: 'SET_BACKGROUND',
            background: 'blank',
        })
        loadBids()
    }, [])
    useEffect(() => {
        loadBids()
    }, [pageNumber, pageSize])

    // Handlers
    const handlePageChange = (event, newPage) => {
        setPageNumber(newPage)
    }

    const handleRowsPerPageChange = (event) => {
        setPageSize(parseInt(event.target.value, 10))
        setPageNumber(0)
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
            <>
                <img className="background" src="background-input.png" alt="background"/>
                <main className="bids-history">
                    <div className="main__form">
                        <span className="bid-history__title">your bid history</span>
                        <div className="bid-history">
                            {bids.length > 0 ? bids.map((row, index) => (
                                    <div className="bid-history-elem" key={index}>
                                        <span>{epochToJsDate(row.created_at)}</span>
                                        <span>${row.bid_amount}</span>
                                    </div>)) : <div className="no-bids">No bids to display</div>}
                        </div>
                        <button className="main__back-history" onClick={() => history.push('/')}>
                            <img src="arrow_back.svg" alt="arrow"/>Back
                        </button>
                    </div>
                </main>
            </>)
}

export default withStyles(styles)(BidHistory)
