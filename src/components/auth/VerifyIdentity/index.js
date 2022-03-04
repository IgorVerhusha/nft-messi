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

const VerifyIdentity = (props) => {
    const { classes } = props;
    let history = useHistory();

    console.log("================================== VerifyIdentity ======================================");

    const inputFileFront = useRef(null);
    const inputFileBack = useRef(null);
    const inputFilePhoto = useRef(null);

    // Get Context
    const auth = useAuthContext();
    const notifications = useNotificationContext();
    const app = useAppContext();

    // Component States
    const [step, setStep] = useState(1);
    const [front, setFront] = useState(false);
    const [back, setBack] = useState(false);
    const [photo, setPhoto] = useState(false);
    const loadProfileDocuments = () => {
        AuthService.GetProfileDocuments()
            .then(function (response) {
                let data = response.data
                setFront(data.front);
                setBack(data.back);
                setPhoto(data.photo);
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
        loadProfileDocuments();
    }, []);


    const handleSubmit1Click = () => {
        setStep(2)
    };

    const enableSubmit1 = () => {
        return !(front && back);
    }
    const handleSubmit2Click = () => {

    };

    const enableSubmit2 = () => {
        return false;
    }

    const uploadFile = (event) => {

    }
    const handleOnUploadFront = (event) => {
        console.log(event.target.files);
        var formData = new FormData();
        formData.append("file", event.target.files[0]);
        AuthService.UploadGetProfileDocument(formData, "front")
            .then(function (response) {
                console.log(response.data);
                loadProfileDocuments();
            })
    }
    const handleFrontClick = () => {
        inputFileFront.current.click();
    }
    const handleOnUploadBack = (event) => {
        console.log(event.target.files);

        var formData = new FormData();
        formData.append("file", event.target.files[0]);
        AuthService.UploadGetProfileDocument(formData, "back")
            .then(function (response) {
                console.log(response.data);
                loadProfileDocuments();
            })
    }
    const handleBackClick = () => {
        inputFileBack.current.click();
    }
    const handleOnUploadPhoto = (event) => {
        console.log(event.target.files);

        var formData = new FormData();
        formData.append("file", event.target.files[0]);
        AuthService.UploadGetProfileDocument(formData, "photo")
            .then(function (response) {
                console.log(response.data);
                loadProfileDocuments();
            })
    }
    const handlePhotoClick = () => {
        inputFilePhoto.current.click();
    }

    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Container maxWidth="sm" className={classes.container}>
                    {step == 1 &&
                        <div className={classes.panel}>
                            <Typography variant="h4">
                                VERIFY IDENTITY
                            </Typography>
                            <div className={classes.spacer}></div>
                            <Typography variant="body2" className={classes.infoText}>
                                Please follow the next steps to verify your identity.<br />
                                By doing so, you will be able to take part in the auction as soon as it is live.
                            </Typography>
                            <div className={classes.spacer}></div>
                            <Typography variant="body2" className={classes.infoText}>
                                Please upload pictures clearly showing the front and back of your valid ID/Passport
                            </Typography>
                            <div className={classes.imageUploadContainer}>
                                <div className={classes.imageUpload} onClick={() => handleFrontClick()}>
                                    <div className={classes.imageUploadLabel}>front</div>
                                    <div >
                                        <IconButton color="inherit">
                                            <Icon className={classes.imageUploadIcon}>add_a_photo</Icon>
                                        </IconButton>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            capture="camera"
                                            on="true"
                                            autoComplete="off"
                                            tabIndex="-1"
                                            className={classes.fileInput}
                                            ref={inputFileFront}
                                            onChange={(event) => handleOnUploadFront(event)}
                                        />
                                    </div>
                                    <div className={classes.spacer}></div>
                                    {!front &&
                                        <div>
                                            <Icon>close</Icon>
                                            <div>Not uploaded</div>
                                        </div>
                                    }
                                    {front &&
                                        <div>
                                            <Icon>done</Icon>
                                            <div>Upload complete</div>
                                        </div>
                                    }
                                </div>
                                <div className={classes.imageUpload} onClick={() => handleBackClick()}>
                                    <div className={classes.imageUploadLabel}>back</div>
                                    <div>
                                        <IconButton color="inherit">
                                            <Icon className={classes.imageUploadIcon}>add_a_photo</Icon>
                                        </IconButton>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            capture="camera"
                                            on="true"
                                            autoComplete="off"
                                            tabIndex="-1"
                                            className={classes.fileInput}
                                            ref={inputFileBack}
                                            onChange={(event) => handleOnUploadBack(event)}
                                        />
                                    </div>
                                    <div className={classes.spacer}></div>
                                    {!back &&
                                        <div>
                                            <Icon>close</Icon>
                                            <div>Not uploaded</div>
                                        </div>
                                    }
                                    {back &&
                                        <div>
                                            <Icon>done</Icon>
                                            <div>Upload complete</div>
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className={classes.spacer}></div>
                            <IconButton className={classes.panelButton} color="inherit" onClick={() => handleSubmit1Click()} disabled={enableSubmit1()}>
                                <Typography className={classes.panelButtonText}>&nbsp;NEXT</Typography>
                            </IconButton>
                            <div className={classes.spacer}></div>
                            <div className={classes.spacer}></div>

                            <IconButton className={classes.panelButtonBack} color="inherit" component={Link} to="/loginpanel">
                                <Icon>arrow_back_ios</Icon>
                                <Typography className={classes.panelButtonBackText}>&nbsp;Back</Typography>
                            </IconButton>
                        </div>
                    }
                    {step == 2 &&
                        <div className={classes.panel}>
                            <Typography variant="h4">
                                VERIFY IDENTITY
                            </Typography>
                            <div className={classes.spacer}></div>
                            <Typography variant="body2" className={classes.infoText}>
                                Please upload a picture of yourself holding the ID/Passport<br />
                                with both your face and ID being clearly visible in the picture
                            </Typography>
                            <div className={classes.imageUploadContainer}>
                                <div className={classes.imageUpload} onClick={() => handlePhotoClick()}>
                                    <div className={classes.imageUploadLabel}>photo</div>
                                    <div>
                                        <IconButton color="inherit">
                                            <Icon className={classes.imageUploadIcon}>add_a_photo</Icon>
                                        </IconButton>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            capture="camera"
                                            on="true"
                                            autoComplete="off"
                                            tabIndex="-1"
                                            className={classes.fileInput}
                                            ref={inputFilePhoto}
                                            onChange={(event) => handleOnUploadPhoto(event)}
                                        />
                                    </div>
                                    <div className={classes.spacer}></div>
                                    {!photo &&
                                        <div>
                                            <Icon>close</Icon>
                                            <div>Not uploaded</div>
                                        </div>
                                    }
                                    {photo &&
                                        <div>
                                            <Icon>done</Icon>
                                            <div>Upload complete</div>
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className={classes.spacer}></div>
                            <IconButton className={classes.panelButton} color="inherit" component={Link} to="/userdetails" disabled={!photo}>
                                <Typography className={classes.panelButtonText}>&nbsp;NEXT</Typography>
                            </IconButton>
                            <div className={classes.spacer}></div>
                            <div className={classes.spacer}></div>
                            <IconButton className={classes.panelButtonBack} color="inherit" onClick={() => setStep(1)}>
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

export default withStyles(styles)(VerifyIdentity);