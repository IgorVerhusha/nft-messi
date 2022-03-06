import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from "react-router-dom";
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import OtpInput from 'react-otp-input';

import AuthService, { useAuthContext } from "../../../services/AuthService";
import { useAppContext } from '../../../services/AppService';
import { useNotificationContext } from "../../../services/NotificationService";
import styles from './styles';

const Login = (props) => {
    const { classes } = props;
    let history = useHistory();

    // Get Context
    const auth = useAuthContext();
    const notifications = useNotificationContext();
    const app = useAppContext();

    // Component States
    const numInputs = 6;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [otpCode, setOtpCode] = useState('');
    const [login, setLogin] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isOTPRequired, setIsOTPRequired] = useState(false);

    // Setup Component
    useEffect(() => {
        app.dispatch({
            type: "SET_BACKGROUND",
            background: 'blank',
        });
        app.dispatch({
            type: "MENU_DISABLE"
        });
    }, []);
    useEffect(() => {

        if (isAuthenticated) {
            getUserProfile();
            history.push('/')
        }

        return () => {
            notifications.dispatch({
                type: "HIDE_ALERT"
            })
        }
    }, [isAuthenticated]);

    // Component Methods
    const getUserProfile = () => {
        AuthService.GetProfile()
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
    // Component Handlers
    const handleLoginClick = () => {
        AuthService.Login(username, password)
            .then(function (response) {
                setLogin(response.data);

                // If "account_type":"user" perform OTP
                if (response.data.account_type === "admin") {
                    // Login
                    auth.dispatch({
                        type: "LOGIN",
                        payload: response.data
                    })
                    // Set authenticated flag
                    setIsAuthenticated(true);
                } else {
                    setIsOTPRequired(true);

                    // Generate OTP Code
                    AuthService.SendOTP(response.data)
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
            })
            .catch(function (error) {
                console.log(error.response);
                notifications.dispatch({
                    type: "DISPLAY_ALERT",
                    payload: { "message": error.response.data.detail, "severity": "error" }
                })
            })
    };
    const handleResendCodeClick = () => {
        setOtpCode('');
        // Generate OTP Code
        AuthService.SendOTP(login)
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
    const handleOTPChange = (otp) => {
        console.log(otp);
        setOtpCode(otp);

        // Validate OTP Code
        if (otp.length == numInputs) {
            AuthService.ValidateOTP(login, otp)
                .then(function (response) {
                    console.log(response.data);

                    // Login
                    auth.dispatch({
                        type: "LOGIN",
                        payload: login
                    })

                    // Set authenticated flag
                    setIsAuthenticated(true);
                })
                .catch(function (error) {
                    console.log(error.response);
                    notifications.dispatch({
                        type: "DISPLAY_ALERT",
                        payload: { "message": error.response.data.detail, "severity": "error" }
                    })
                })
        }

    }
    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Container className={classes.container}>
                    {!isOTPRequired &&
                        <div className={classes.panel}>
                            <Typography variant="h4">
                                SIGN IN
                            </Typography>
                            <div className={classes.spacer}></div>
                            <div className={classes.inputContainer}>
                                <OutlinedInput
                                    label="Username or email"
                                    placeholder="  USERNAME/EMAIL"
                                    fullWidth
                                    variant="outlined"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    startAdornment={
                                        <Icon>person</Icon>
                                    }
                                    className={classes.inputField}
                                />
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
                            </div>
                            <div>
                                <Link to="/forgot_password" className={classes.link}>
                                    <Typography variant="caption" className={classes.linkText}>
                                        Forgot password?
                                    </Typography>
                                </Link>
                            </div>
                            <div className={classes.spacer}></div>

                            <IconButton className={classes.panelButton} color="inherit" onClick={() => handleLoginClick()}>
                                <Typography className={classes.panelButtonText}>&nbsp;SIGN IN</Typography>
                            </IconButton>
                            <div className={classes.spacer}></div>
                            <div className={classes.spacer}></div>
                            <div className={classes.spacer}></div>
                            <div className={classes.spacer}></div>
                            <div className={classes.spacer}></div>

                            <IconButton className={classes.panelButtonBack} color="inherit" component={Link} to="/loginpanel">
                                <Icon>arrow_back_ios</Icon>
                                <Typography className={classes.panelButtonBackText}>&nbsp;Back</Typography>
                            </IconButton>
                        </div>
                    }
                    {isOTPRequired &&
                        <div className={classes.panelCode}>
                            <Typography variant="h4">
                                SIGN IN CODE
                            </Typography>
                            <div className={classes.spacer}></div>
                            <div className={classes.spacer}></div>
                            <div className={classes.spacer}></div>
                            <div className={classes.spacer}></div>
                            <div className={classes.spacer}></div>
                            <OtpInput
                                value={otpCode}
                                onChange={handleOTPChange}
                                numInputs={numInputs}
                                separator={<span>-</span>}
                                inputStyle={classes.otpInputStyle}
                                isInputNum={true}
                            />


                            <div className={classes.spacer}></div>
                            <div className={classes.spacer}></div>
                            <div className={classes.spacer}></div>
                            <div className={classes.spacer}></div>
                            <div className={classes.spacer}></div>
                            <div className={classes.spacer}></div>
                            <IconButton className={classes.panelButton} color="inherit" onClick={() => handleResendCodeClick()}>
                                <Typography className={classes.panelButtonText}>&nbsp;RESEND CODE</Typography>
                            </IconButton>
                            <div className={classes.spacer}></div>
                            <div className={classes.spacer}></div>
                            <div className={classes.spacer}></div>

                            <IconButton className={classes.panelButtonBack} color="inherit" component={Link} to="/loginpanel">
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

export default withStyles(styles)(Login);
