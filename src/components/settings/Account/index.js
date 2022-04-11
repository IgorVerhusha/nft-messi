import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import SettingsMenu from '../SettingsMenu'
import AuthService, { useAuthContext } from "../../../services/AuthService";
import { useNotificationContext } from "../../../services/NotificationService";
import { useAppContext } from '../../../services/AppService';
import styles from './styles';

const Account = (props) => {
    const { classes } = props;

    // Get Context
    const auth = useAuthContext();
    const notifications = useNotificationContext();
    const app = useAppContext();

    // Component States
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loadAccount = () => {
        AuthService.GetAccount()
            .then(function (response) {
                //setProfile(response.data);
                let account = response.data;
                setUsername(account["username"]);
                setEmail(account["email"]);
            })
    }

    // Setup Component
    useEffect(() => {
        if (auth.state.isAuthenticated) {
            loadAccount();
        }
        // Set the AppMenu to off
        app.dispatch({
            type: "DRAWER_CLOSE"
        });
    }, []);

    const handleSaveClick = () => {
        let account = {
            "email": email,
            "password": password
        }
        AuthService.SaveAccount(account)
            .then(function (response) {
                notifications.dispatch({
                    type: "DISPLAY_ALERT",
                    payload: { "message": "Account Updated", "severity": "info" }
                })
            })
    };

    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Container maxWidth="md" className={classes.container}>
                    <Grid container spacing={2}>
                        <Grid item sm={4}>
                            <SettingsMenu page="account" />
                        </Grid>
                        <Grid item sm={8}>
                            <Typography variant="h6" gutterBottom>
                                Account Settings
                            </Typography>
                            <Divider />
                            <div className={classes.inputContainer}>
                                <TextField
                                    label="Username"
                                    placeholder="Username"
                                    helperText=""
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    value={username}
                                    disabled
                                />
                                <TextField
                                    label="Email"
                                    placeholder="Email"
                                    helperText=""
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    label="Password"
                                    placeholder="Enter new password"
                                    helperText=""
                                    fullWidth
                                    margin="normal"
                                    type="password"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className={classes.buttonContainer}>
                                <Button variant="outlined" color="primary" onClick={(event) => handleSaveClick(event, username, email, password)}>Save</Button>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
};

export default withStyles(styles)(Account);
