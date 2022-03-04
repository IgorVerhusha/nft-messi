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

const ChangePassword = (props) => {
    const { classes } = props;
    let history = useHistory();

    console.log("================================== ChangePassword ======================================");

    let user_id = props.match.params.user_id;
    console.log(user_id);
    let confirmation_code = props.match.params.confirmation_code;
    console.log(confirmation_code);


    // Get Context
    const auth = useAuthContext();
    const notifications = useNotificationContext();
    const app = useAppContext();

    // Component States
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const confirmChangePassword = () => {
        AuthService.ConfirmChangePassword(user_id, confirmation_code)
            .then(function (response) {

                auth.dispatch({
                    type: "LOGIN",
                    payload: response.data
                })

                // Set authenticated flag
                setIsConfirmed(true);

                // Get User Profile
                return AuthService.GetProfile()
            })
            .then(function (response) {
                let profile = response.data;
                auth.dispatch({
                    type: "PROFILE",
                    payload: profile
                })
            })
            .catch(function (error) {
                console.log(error.response);
                notifications.dispatch({
                    type: "DISPLAY_ALERT",
                    payload: { "message": error.response.data.detail, "severity": "error" }
                })
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
        confirmChangePassword();
    }, []);
    useEffect(() => {
        return () => {
            notifications.dispatch({
                type: "HIDE_ALERT"
            })
        }
    }, [isConfirmed]);

    const handleSubmitClick = () => {
        if (password != password2) {
            notifications.dispatch({
                type: "DISPLAY_ALERT",
                payload: { "message": "Passwords do not match", "severity": "error" }
            })
        }

        AuthService.ChangePassword(password)
            .then(function (response) {
                console.log(response.data);

                if (response.data["status"] == true) {

                    notifications.dispatch({
                        type: "DISPLAY_ALERT",
                        payload: { "message": "Password changed successfully", "severity": "info" }
                    })
                }
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
        return !(password.length > 0 && password2.length > 0);
    }

    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Container maxWidth="sm" className={classes.container}>
                    <div className={classes.panelThankyou}>
                        <Typography variant="h4">
                            CHANGE PASSWORD
                        </Typography>
                        <div className={classes.spacer}></div>
                        <div className={classes.spacer}></div>
                        <OutlinedInput
                            label="Password"
                            placeholder="PASSWORD"
                            fullWidth
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            startAdornment={
                                <Icon>lock</Icon>
                            }
                            className={classes.inputField}
                        />
                        <OutlinedInput
                            label="Repeat"
                            placeholder="REPEAT"
                            fullWidth
                            type="password"
                            variant="outlined"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            startAdornment={
                                <Icon>lock</Icon>
                            }
                            className={classes.inputField}
                        />
                        <div className={classes.spacer}></div>
                        <IconButton className={classes.panelButton} color="inherit" onClick={() => handleSubmitClick()} disabled={enableSubmit()}>
                            <Typography className={classes.panelButtonText}>&nbsp;SUBMIT</Typography>
                        </IconButton>

                        <div className={classes.spacer}></div>
                        <div className={classes.spacer}></div>
                        <IconButton className={classes.panelButtonBack} color="inherit" component={Link} to="/">
                            <Icon>arrow_back_ios</Icon>
                            <Typography className={classes.panelButtonBackText}>&nbsp;Back</Typography>
                        </IconButton>
                    </div>
                </Container>
            </main>
        </div>
    );
};

export default withStyles(styles)(ChangePassword);