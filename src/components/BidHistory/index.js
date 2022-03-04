import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import NumberFormat from "react-number-format";
import IconButton from '@material-ui/core/IconButton';

import AuthService, { useAuthContext } from "../../services/AuthService";
import { useAppContext } from '../../services/AppService';
import { useNotificationContext } from "../../services/NotificationService";
import DataService from "../../services/DataService";
import styles from './styles';
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

const BidHistory = (props) => {
    const { classes } = props;

    console.log("================================== BidHistory ======================================");

    // Get Context
    const notifications = useNotificationContext();
    const app = useAppContext();

    // Component States
    const [totalCount, setTotalCount] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [emptyRows, setEmptyRows] = useState(0);
    const [bids, setBids] = useState([]);
    const loadBids = () => {
        DataService.GetMyBids(false, pageNumber, pageSize)
            .then(function (response) {
                setBids(response.data);
                setPageCount(response.data.length);
                setEmptyRows(pageSize - response.data.length);
            });
        DataService.GetMyBids(true)
            .then(function (response) {
                let count = Math.ceil(response.data[0]["count"]);
                setTotalCount(count);
            });


    }

    // Setup Component
    useEffect(() => {
        app.dispatch({
            type: "SET_BACKGROUND",
            background: 'blank',
        });
        loadBids();
    }, []);
    useEffect(() => {
        loadBids();
    }, [pageNumber, pageSize]);

    // Handlers
    const handlePageChange = (event, newPage) => {
        setPageNumber(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setPageNumber(0);
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
        <div className={classes.root}>
            <main className={classes.main}>
                <Container maxWidth="sm" className={classes.container}>
                    <div className={classes.panel}>
                        <Typography variant="h4">
                            YOUR BID HISTORY
                        </Typography>
                        <div className={classes.spacer}></div>
                        <Divider />
                        <div className={classes.spacer}></div>
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

                    </div>
                </Container>
            </main>
        </div>
    );
};

export default withStyles(styles)(BidHistory);