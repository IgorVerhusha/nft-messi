import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from "react-router-dom";
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import AuthService, { useAuthContext } from "../../../services/AuthService";
import { useAppContext } from '../../../services/AppService';
import { useNotificationContext } from "../../../services/NotificationService";
import styles from './styles';

const ConfirmEmail = (props) => {
    const { classes } = props;
    let history = useHistory();

    let user_id = props.match.params.user_id;
    console.log(user_id);
    let confirmation_code = props.match.params.confirmation_code;
    console.log(confirmation_code);


    // Get Context
    const auth = useAuthContext();
    const notifications = useNotificationContext();
    const app = useAppContext();

    // Component States
    const [isConfirmed, setIsConfirmed] = useState(false);
    const confirmEmail = () => {
        AuthService.ConfirmEmail(user_id, confirmation_code)
            .then(function (response) {

                // Set authenticated flag
                setIsConfirmed(true);
            })
    }

    // Setup Component
    useEffect(() => {
        app.dispatch({
            type: "SET_BACKGROUND",
            background: 'blank',
        });
        app.dispatch({
            type: "MENU_DISABLE"
        });
        confirmEmail();
    }, [user_id]);
    useEffect(() => {
        return () => {
            notifications.dispatch({
                type: "HIDE_ALERT"
            })
        }
    }, [isConfirmed]);

    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Container maxWidth="sm" className={classes.container}>
                    {isConfirmed &&
                        <div className={classes.panelThankyou}>
                            <Typography variant="h4">
                                THANK YOU
                            </Typography>
                            <div className={classes.spacer}></div>
                            <div className={classes.spacer}></div>
                            <Typography variant="body2" className={classes.thankYouText}>
                                Your email address has been confirmed.
                            </Typography>

                            <div className={classes.spacer}></div>
                            <div className={classes.spacer}></div>
                            <IconButton className={classes.panelButtonBack} color="inherit" component={Link} to="/">
                                <Icon>arrow_back_ios</Icon>
                                <Typography className={classes.panelButtonBackText}>&nbsp;Back</Typography>
                            </IconButton>
                        </div>
                    }
                </Container>
            </main>
        </div>
    );
};

export default withStyles(styles)(ConfirmEmail);
