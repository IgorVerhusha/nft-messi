import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Divider } from '@material-ui/core';

import { StyledTableCell, StyledTableRow } from '../../../app/StyledComponents';
import { useAppContext } from '../../../services/AppService';
import { useNotificationContext } from "../../../services/NotificationService";
import DataService from "../../../services/DataService";
import styles from './styles';


const Users = (props) => {
    const { classes } = props;

    console.log("================================== Users ======================================");

    // Get Context
    const app = useAppContext();
    const notifications = useNotificationContext();

    // Component States
    const [index, setIndex] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(15);
    const [pageCount, setPageCount] = useState(0);
    const [emptyRows, setEmptyRows] = useState(0);
    const [users, setUsers] = useState([]);
    const loadUsers = () => {
        DataService.GetUsers(false, pageNumber, pageSize)
            .then(function (response) {
                setUsers(response.data);
                setPageCount(response.data.length);
                setEmptyRows(pageSize - response.data.length);
            });
        DataService.GetUsers(true)
            .then(function (response) {
                setTotalCount(Math.ceil(response.data[0]["count"]));
            });
    }
    const [selectedUser, setSelectedUser] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);


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
    useEffect(() => {
        loadUsers();
    }, [pageNumber, pageSize]);

    // Component Handlers
    const handlePageChange = (event, newPage) => {
        setPageNumber(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        console.log(event.target.value);
        setPageSize(parseInt(event.target.value, 10));
        setPageNumber(0);
    };

    const handleEditClick = (id) => {
        // setSelectedUser(user);
        setIndex(false);
        DataService.GetUser(id)
            .then(function (response) {
                setSelectedUser(response.data);
            });
    }
    const handleBackClick = () => {

        setIndex(true);
        setSelectedUser(null);
    }
    const handleVerifyClick = () => {

        DataService.VerifyUserIdentity(selectedUser.id)
            .then(function (response) {
                console.log(response.data);

                loadUsers();
                setIndex(true);
                setSelectedUser(null);
            })
            .catch(function (error) {
                console.log(error.response);
                notifications.dispatch({
                    type: "DISPLAY_ALERT",
                    payload: { "message": error.response.data.detail, "severity": "error" }
                })
            })

    }
    const handleDenyClick = () => {
        DataService.DenyUserIdentity(selectedUser.id)
            .then(function (response) {
                console.log(response.data);

                loadUsers();
                setIndex(true);
                setSelectedUser(null);
            })
            .catch(function (error) {
                console.log(error.response);
                notifications.dispatch({
                    type: "DISPLAY_ALERT",
                    payload: { "message": error.response.data.detail, "severity": "error" }
                })
            })
    }
    const handleDialogClose = () => {
        setDialogOpen(false);
    }
    const handleDialogOpen = () => {
        setDialogOpen(true);
    }

    // Component Methods
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
                            Users
                        </Typography>
                        <div className={classes.spacer}></div>
                        <Divider />
                        <div className={classes.spacer}></div>
                        {index && users.length == 0 &&
                            <div className={classes.message}>
                                <Typography gutterBottom>
                                    No data to display
                                </Typography>
                            </div>
                        }
                        {index && users.length > 0 &&
                            <div>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <StyledTableRow>
                                                <StyledTableCell>User Type</StyledTableCell>
                                                <StyledTableCell>Username</StyledTableCell>
                                                <StyledTableCell>Email</StyledTableCell>
                                                <StyledTableCell>First Name</StyledTableCell>
                                                <StyledTableCell>Last Name</StyledTableCell>
                                                <StyledTableCell>Email Confirmation</StyledTableCell>
                                                <StyledTableCell>Documents Verified</StyledTableCell>
                                                <StyledTableCell></StyledTableCell>
                                            </StyledTableRow>
                                        </TableHead>
                                        <TableBody>
                                            {users && users.map((row, index) => (
                                                <StyledTableRow key={index}>
                                                    <StyledTableCell>{row.account_type}</StyledTableCell>
                                                    <StyledTableCell>{row.username}</StyledTableCell>
                                                    <StyledTableCell>{row.email}</StyledTableCell>
                                                    <StyledTableCell>{row.first_name}</StyledTableCell>
                                                    <StyledTableCell>{row.last_name}</StyledTableCell>
                                                    <StyledTableCell>{"" + row.email_verified}</StyledTableCell>
                                                    <StyledTableCell>{"" + row.identity_verified}</StyledTableCell>
                                                    <StyledTableCell>
                                                        <IconButton edge="start" aria-label="edit" onClick={() => handleEditClick(row["id"])}>
                                                            <Icon>edit</Icon>
                                                        </IconButton>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                            {/* {emptyRows > 0 && (
                                            <StyledTableRow style={{ height: 53 * emptyRows }}>
                                                <StyledTableCell colSpan={6} />
                                            </StyledTableRow>
                                        )} */}
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
                                </TableContainer>
                            </div>
                        }
                        {!index &&
                            <div className={classes.panel}>
                                <Typography variant="h4">
                                    USER DETAILS
                                </Typography>

                                <div className={classes.spacer}></div>
                                <div className={classes.spacer}></div>
                                <div className={classes.spacer}></div>
                                {selectedUser &&
                                    <Grid container spacing={0} className={classes.userGrid}>
                                        <Grid item sm={12} md={6} >
                                            <Typography variant="h6">{selectedUser.username}</Typography>
                                            <Typography variant="h6">{selectedUser.email}</Typography>
                                            <Typography variant="h6">Email Confirmation: {"" + selectedUser.email_verified}</Typography>
                                            <Typography variant="h6">Documents Verified: {"" + selectedUser.identity_verified}</Typography>
                                        </Grid>
                                        <Grid item sm={12} md={6} >
                                            <Typography variant="h6">{selectedUser.first_name} {selectedUser.last_name}</Typography>
                                            <Typography variant="h6">{selectedUser.address_1}</Typography>
                                            <Typography variant="h6">{selectedUser.address_2}</Typography>
                                            <Typography variant="h6">{selectedUser.city} {selectedUser.state_province} {selectedUser.postal_code}</Typography>
                                            <Typography variant="h6">{selectedUser.country_code}</Typography>
                                            <Typography variant="h6">{selectedUser.phone_number}</Typography>
                                        </Grid>

                                        <Grid item sm={12} md={4} >
                                            <ButtonBase className={classes.image} onClick={handleDialogOpen}>
                                                <img className={classes.img} src={DataService.GetUserDocumentLink("front", selectedUser.document_token)} />
                                            </ButtonBase>
                                        </Grid>
                                        <Grid item sm={12} md={4} >
                                            <ButtonBase className={classes.image} onClick={handleDialogOpen}>
                                                <img className={classes.img} src={DataService.GetUserDocumentLink("back", selectedUser.document_token)} />
                                            </ButtonBase>
                                        </Grid>
                                        <Grid item sm={12} md={4} >
                                            <ButtonBase className={classes.image} onClick={handleDialogOpen}>
                                                <img className={classes.img} src={DataService.GetUserDocumentLink("photo", selectedUser.document_token)} />
                                            </ButtonBase>
                                        </Grid>
                                    </Grid>
                                }
                                <div className={classes.spacer}></div>
                                <div className={classes.spacer}></div>
                                <div className={classes.spacer}></div>
                                <div className={classes.spacer}></div>
                                <div className={classes.spacer}></div>
                                <div>
                                    <IconButton className={classes.panelButton} color="inherit" onClick={() => handleVerifyClick()}>
                                        <Typography className={classes.panelButtonText}>&nbsp;VERIFY USER</Typography>
                                    </IconButton>
                                    <IconButton className={classes.panelButton} color="inherit" onClick={() => handleDenyClick()}>
                                        <Typography className={classes.panelButtonText}>&nbsp;DENY USER</Typography>
                                    </IconButton>
                                </div>

                                <div className={classes.spacer}></div>
                                <div className={classes.spacer}></div>
                                <div className={classes.spacer}></div>

                                <IconButton className={classes.panelButtonBack} color="inherit" onClick={() => handleBackClick()}>
                                    <Icon>arrow_back_ios</Icon>
                                    <Typography className={classes.panelButtonBackText}>&nbsp;Back</Typography>
                                </IconButton>
                            </div>
                        }
                        <Dialog
                            fullWidth={true}
                            maxWidth={"md"}
                            open={dialogOpen}
                            onClose={handleDialogClose}
                            aria-labelledby="max-width-dialog-title"
                        >
                            <DialogTitle id="max-width-dialog-title">Verification Documents</DialogTitle>
                            {selectedUser &&
                                <DialogContent>
                                    <DialogContentText>
                                        Front of Document:
                                    </DialogContentText>
                                    <img className={classes.imgDialog} src={DataService.GetUserDocumentLink("front", selectedUser.document_token)} />
                                    <DialogContentText>
                                        Back of Document:
                                    </DialogContentText>
                                    <img className={classes.imgDialog} src={DataService.GetUserDocumentLink("back", selectedUser.document_token)} />
                                    <DialogContentText>
                                        Photo with Document:
                                    </DialogContentText>
                                    <img className={classes.imgDialog} src={DataService.GetUserDocumentLink("photo", selectedUser.document_token)} />
                                </DialogContent>
                            }
                            <DialogActions>
                                <Button onClick={handleDialogClose} color="primary">
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </Container>
            </main>
        </div >
    );
};

export default withStyles(styles)(Users);