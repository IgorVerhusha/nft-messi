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


const Profile = (props) => {
    const { classes } = props;
    const { history } = props;

    console.log("================================== Profile ======================================");

    // Get Context
    const auth = useAuthContext();
    const notifications = useNotificationContext();
    const app = useAppContext();

    // Component States
    const [username, setUsername] = useState(null);
    const [fullname, setFullname] = useState('');
    const loadProfile = () => {
        AuthService.GetProfile()
            .then(function (response) {
                //setProfile(response.data);
                let profile = response.data;
                setUsername(profile["username"]);
                setFullname(profile["full_name"]);
            })
    }

    // Setup Component
    useEffect(() => {
        // Load User profile
        if (auth.state.isAuthenticated) {
            loadProfile();
        }
        // Set the AppMenu to off
        app.dispatch({
            type: "DRAWER_CLOSE"
        });
    }, []);


    const handleSaveClick = () => {
        let profile = {
            "username": username,
            "full_name": fullname
        }
        AuthService.SaveProfile(profile)
            .then(function (response) {
                let profile = response.data;
                auth.dispatch({
                    type: "PROFILE",
                    payload: profile
                })
                notifications.dispatch({
                    type: "DISPLAY_ALERT",
                    payload: { "message": "Profile Updated", "severity": "info" }
                })

            })

    };

    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Container maxWidth="md" className={classes.container}>
                    <Grid container spacing={4}>
                        <Grid item sm={4}>
                            <SettingsMenu page="profile" />
                        </Grid>
                        <Grid item sm={8}>
                            <Typography variant="h6" gutterBottom>
                                Profile Settings
                            </Typography>
                            <Divider />
                            <div className={classes.inputContainer}>
                                <TextField
                                    label="Full name"
                                    placeholder="Full name"
                                    helperText=""
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                />
                            </div>
                            <div className={classes.buttonContainer}>
                                <Button variant="outlined" color="primary" onClick={() => handleSaveClick()}>Save</Button>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
};

export default withStyles(styles)(Profile);