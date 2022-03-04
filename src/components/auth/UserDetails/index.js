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
import FormLabel from '@material-ui/core/FormLabel';
import MuiPhoneNumber from 'material-ui-phone-number';

import AuthService, { useAuthContext } from "../../../services/AuthService";
import { useAppContext } from '../../../services/AppService';
import { useNotificationContext } from "../../../services/NotificationService";
import CountrySelect from '../../../common/CountrySelect';
import styles from './styles';

const UserDetails = (props) => {
    const { classes } = props;
    let history = useHistory();

    console.log("================================== UserDetails ======================================");

    // Get Context
    const auth = useAuthContext();
    const notifications = useNotificationContext();
    const app = useAppContext();

    // Component States
    const [focused, setFocused] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [stateProvince, setStateProvince] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isAccountUpdated, setIsAccountUpdated] = useState(false);
    const loadProfile = () => {
        AuthService.GetProfile()
            .then(function (response) {
                let profile = response.data;
                setFirstName(profile.first_name ? profile.first_name : '');
                setLastName(profile.last_name ? profile.last_name : '');
                setAddress1(profile.address_1 ? profile.address_1 : '');
                setAddress2(profile.address_2 ? profile.address_2 : '');
                setCity(profile.city ? profile.city : '');
                setStateProvince(profile.state_province ? profile.state_province : '');
                setCountry(profile.country_code ? profile.country_code : '');
                setPostalCode(profile.postal_code ? profile.postal_code : '');
                setPhoneNumber(profile.phone_number ? profile.phone_number : '');
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
        loadProfile();
    }, []);
    useEffect(() => {
        return () => {
            notifications.dispatch({
                type: "HIDE_ALERT"
            })
        }
    }, [isAccountUpdated]);

    const handleSubmitClick = () => {
        let userDetails = {
            first_name: firstName,
            last_name: lastName,
            address_1: address1,
            address_2: address2,
            city: city,
            state_province: stateProvince,
            country_code: country,
            postal_code: postalCode,
            phone_number: phoneNumber,
        };
        AuthService.SaveAccountDetails(userDetails)
            .then(function (response) {
                setIsAccountUpdated(true);
            })
            .catch(function (error) {
                console.log(error.response);
                notifications.dispatch({
                    type: "DISPLAY_ALERT",
                    payload: { "message": error.response.data.detail, "severity": "error" }
                })
            })
    };

    const enableSubmit = () => {
        return false;
    }
    const onFocus = () => {
        setFocused(true);
    };
    const onBlur = () => {
        setFocused(false);
    };

    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Container maxWidth="sm" className={classes.container}>
                    {!isAccountUpdated &&
                        <div className={classes.panel}>
                            <Typography variant="h4">
                                YOUR DETAILS
                            </Typography>
                            <div className={classes.spacer}></div>
                            <div className={classes.inputContainer}>
                                <FormLabel focused={focused}>FULL NAME</FormLabel>
                                <div className={classes.spacer}></div>
                                <div className={classes.combinedInputs}>
                                    <OutlinedInput
                                        placeholder="FIRST NAME"
                                        fullWidth
                                        variant="outlined"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className={classes.inputField}
                                    />
                                    <div className={classes.spacer}></div>
                                    <OutlinedInput
                                        placeholder="LAST NAME"
                                        fullWidth
                                        variant="outlined"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className={classes.inputField}
                                    />
                                </div>

                                <FormLabel focused={focused}>ADDRESS</FormLabel>
                                <div className={classes.spacer}></div>

                                <OutlinedInput
                                    placeholder="STREET ADDRESS"
                                    fullWidth
                                    variant="outlined"
                                    value={address1}
                                    onChange={(e) => setAddress1(e.target.value)}
                                    className={classes.inputField}
                                />
                                <OutlinedInput
                                    placeholder="STREET ADDRESS LINE 2"
                                    fullWidth
                                    variant="outlined"
                                    value={address2}
                                    onChange={(e) => setAddress2(e.target.value)}
                                    className={classes.inputField}
                                />

                                <div className={classes.combinedInputs}>
                                    <OutlinedInput
                                        placeholder="CITY"
                                        fullWidth
                                        variant="outlined"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className={classes.inputField}
                                    />
                                    <div className={classes.spacer}></div>
                                    <OutlinedInput
                                        placeholder="STATE / PROVINCE"
                                        fullWidth
                                        variant="outlined"
                                        value={stateProvince}
                                        onChange={(e) => setStateProvince(e.target.value)}
                                        className={classes.inputField}
                                    />
                                </div>
                                <div className={classes.combinedInputs}>
                                    <CountrySelect
                                        className={classes.inputField}
                                        fullWidth
                                        variant="outlined"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                    >
                                    </CountrySelect>
                                    <OutlinedInput
                                        placeholder="POSTALCODE"
                                        fullWidth
                                        variant="outlined"
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                        className={classes.inputField}
                                    />
                                </div>

                                <FormLabel focused={focused}>PHONE NUMBER</FormLabel>
                                <div className={classes.spacer}></div>
                                <MuiPhoneNumber
                                    defaultCountry={'fr'}
                                    value={phoneNumber}
                                    onChange={(value) => setPhoneNumber(value)}
                                    placeholder="000-000-000"
                                    fullWidth
                                    variant="outlined"
                                    className={classes.phoneNumberInput}
                                />
                            </div>

                            <div className={classes.spacer}></div>
                            <div className={classes.spacer}></div>
                            <div className={classes.spacer}></div>
                            <div className={classes.spacer}></div>
                            <IconButton className={classes.panelButton} color="inherit" onClick={() => handleSubmitClick()} disabled={enableSubmit()}>
                                <Typography className={classes.panelButtonText}>&nbsp;NEXT</Typography>
                            </IconButton>

                            <div className={classes.spacer}></div>
                            <IconButton className={classes.panelButtonBack} color="inherit" component={Link} to="/verifyidentity">
                                <Icon>arrow_back_ios</Icon>
                                <Typography className={classes.panelButtonBackText}>&nbsp;Back</Typography>
                            </IconButton>
                        </div>
                    }
                    {isAccountUpdated &&
                        <div className={classes.panelThankyou}>
                            <Typography variant="h4">
                                THANK YOU FOR <br /> REGISTERING
                            </Typography>
                            <div className={classes.spacer}></div>
                            <div className={classes.spacer}></div>
                            <Typography variant="body2" className={classes.thankYouText}>
                                Thank you for completing the identity verification process.<br />
                                Our team will review your details and verify your account as soon as possible.<br />
                                For security purposes al verifications are handled manually and may take up to 3 working days to process.<br /><br />
                                Please confirm your email address via the link sent to your email.
                            </Typography>
                            <div className={classes.spacer}></div>
                            <div className={classes.spacer}></div>
                            <div className={classes.spacer}></div>
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

export default withStyles(styles)(UserDetails);