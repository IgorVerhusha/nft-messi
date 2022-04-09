import React, {useEffect, useRef, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {withStyles} from '@material-ui/core'
import AuthService, {useAuthContext} from '../../../services/AuthService'
import {useAppContext} from '../../../services/AppService'
import {useNotificationContext} from '../../../services/NotificationService'
import './verify.scss'
import styles from './styles'

const VerifyIdentity = (props) => {
    const {classes} = props
    let history = useHistory()

    const inputFileFront = useRef(null)
    const inputFileBack = useRef(null)
    const inputFilePhoto = useRef(null)

    // Get Context
    const auth = useAuthContext()
    const notifications = useNotificationContext()
    const app = useAppContext()

    // Component States
    const [step, setStep] = useState(1)
    const [front, setFront] = useState(false)
    const [back, setBack] = useState(false)
    const [photo, setPhoto] = useState(false)
    const loadProfileDocuments = () => {
        AuthService.GetProfileDocuments()
                .then(function (response) {
                    let data = response.data
                    setFront(data.front)
                    setBack(data.back)
                    setPhoto(data.photo)
                })
    }


    // Setup Component
    useEffect(() => {
        app.dispatch({
            type: 'SET_BACKGROUND',
            background: 'blank',
        })
        app.dispatch({
            type: 'MENU_DISABLE'
        })
        loadProfileDocuments()
    }, [])


    const handleSubmit1Click = () => {
        setStep(2)
    }

    const enableSubmit1 = () => {
        return !(front && back)
    }
    const handleSubmit2Click = () => {

    }

    const enableSubmit2 = () => {
        return false
    }

    const uploadFile = (event) => {

    }
    const handleOnUploadFront = (event) => {
        console.log(event.target.files)
        var formData = new FormData()
        formData.append('file', event.target.files[0])
        AuthService.UploadGetProfileDocument(formData, 'front')
                .then(function (response) {
                    console.log(response.data)
                    loadProfileDocuments()
                })
    }
    const handleFrontClick = () => {
        inputFileFront.current.click()
    }
    const handleOnUploadBack = (event) => {
        console.log(event.target.files)

        var formData = new FormData()
        formData.append('file', event.target.files[0])
        AuthService.UploadGetProfileDocument(formData, 'back')
                .then(function (response) {
                    console.log(response.data)
                    loadProfileDocuments()
                })
    }
    const handleBackClick = () => {
        inputFileBack.current.click()
    }
    const handleOnUploadPhoto = (event) => {
        console.log(event.target.files)

        var formData = new FormData()
        formData.append('file', event.target.files[0])
        AuthService.UploadGetProfileDocument(formData, 'photo')
                .then(function (response) {
                    console.log(response.data)
                    loadProfileDocuments()
                })
    }
    const handlePhotoClick = () => {
        inputFilePhoto.current.click()
    }

    return (
            <>      <img
                    className="background"
                    src="background-input.png"
                    alt="background"
            />
                <main className="verify">
                    {step == 1 && <div className="main__form">
                        <span className="identity__title">verify identity</span>
                        <p>Please follow the next steps to verify your identity. By doing so, you will be able to take
                            part
                            in the auction as soon as it is live. </p>
                        <p>Please upload pictures clearly showing the front and back of your valid ID/Passport</p>
                        <div className="image_container">
                            <div className="image-input" onClick={() => handleFrontClick()}>
                                <span>Front</span>
                                <div className={'border' + `${front ? '' : ' is-load'}`}>
                                    <input type="file" accept="image/*"
                                           capture="camera"
                                           autoComplete="off"
                                           tabIndex="-1"
                                           ref={inputFileFront}
                                           onChange={(event) => handleOnUploadFront(event)}
                                           className="border"/>
                                </div>
                                {front ?
                                        <>
                                            <img src="ok.svg" alt="ok"/>
                                            <span className="upload-complete">upload complete</span>
                                        </> : <></>}

                            </div>
                            <div className="image-input" onClick={() => handleBackClick()}>
                                <span>Back</span>
                                <div className={'border' + `${back ? '' : ' is-load'}`}>
                                    <input type="file" accept="image/*"
                                           capture="camera"
                                           autoComplete="off"
                                           tabIndex="-1"
                                           ref={inputFileBack}
                                           onChange={(event) => handleOnUploadBack(event)}
                                           className="border"/>
                                </div>
                                {back ?
                                        <>
                                            <img src="ok.svg" alt="ok"/>
                                            <span className="upload-complete">upload complete</span>
                                        </> : <></>}

                            </div>

                        </div>
                        <button className="button" disabled={enableSubmit1()}
                                onClick={() => handleSubmit1Click()}>Next<img src="arrow_next-black.svg" alt=""/>
                        </button>
                        <button className="main__back-photos" onClick={() => history.push('/loginpanel')}>
                            <img src="arrow_back.svg" alt="arrow"/>Back
                        </button>
                    </div>}
                    {step == 2 && <div className="main__form">
                        <span className="identity__title">verify identity</span>
                        <p>Please follow the next steps to verify your identity. By doing so, you will be able to take
                            part
                            in the auction as soon as it is live. </p>
                        <p>Please upload pictures clearly showing the front and back of your valid ID/Passport</p>
                        <div className="image_container">
                            <div className="image-input" onClick={() => handlePhotoClick()}>
                                <span>Photo</span>
                                <div className={'border' + `${photo ? '' : ' is-load'}`}>
                                    <input
                                            type="file"
                                            accept="image/*"
                                            capture="camera"
                                            autoComplete="off"
                                            tabIndex="-1"
                                            ref={inputFilePhoto}
                                            onChange={(event) => handleOnUploadPhoto(event)}
                                    />
                                </div>
                                {photo ?
                                        <div>
                                            <img src="ok.svg" alt="ok"/>
                                            <span className="upload-complete">upload complete</span>
                                        </div> : <></>
                                }
                            </div>
                        </div>
                        <button className="button" disabled={!photo}
                                onClick={() => history.push('/userdetails')}>Next<img src="arrow_next-black.svg"
                                                                                      alt=""/>
                        </button>
                        <button className="main__back-photos" onClick={() => history.push('/loginpanel')}>
                            <img src="arrow_back.svg" alt="arrow"/>Back
                        </button>
                    </div>}

                </main>
            </>
    )
    // <div className={classes.root}>
    //     <main className={classes.main}>
    //         <Container maxWidth="sm" className={classes.container}>
    //             {step == 1 &&
    //                 <div className={classes.panel}>
    //                     <Typography variant="h4">
    //                         VERIFY IDENTITY
    //                     </Typography>
    //                     <div className={classes.spacer}></div>
    //                     <Typography variant="body2" className={classes.infoText}>
    //                         Please follow the next steps to verify your identity.<br />
    //                         By doing so, you will be able to take part in the auction as soon as it is live.
    //                     </Typography>
    //                     <div className={classes.spacer}></div>
    //                     <Typography variant="body2" className={classes.infoText}>
    //                         Please upload pictures clearly showing the front and back of your valid ID/Passport
    //                     </Typography>
    //                     <div className={classes.imageUploadContainer}>
    //                         <div className={classes.imageUpload} onClick={() => handleFrontClick()}>
    //                             <div className={classes.imageUploadLabel}>front</div>
    //                             <div >
    //                                 <IconButton color="inherit">
    //                                     <Icon className={classes.imageUploadIcon}>add_a_photo</Icon>
    //                                 </IconButton>
    //                                 <input
    //                                     type="file"
    //                                     accept="image/*"
    //                                     capture="camera"
    //                                     on="true"
    //                                     autoComplete="off"
    //                                     tabIndex="-1"
    //                                     className={classes.fileInput}
    //                                     ref={inputFileFront}
    //                                     onChange={(event) => handleOnUploadFront(event)}
    //                                 />
    //                             </div>
    //                             <div className={classes.spacer}></div>
    //                             {!front &&
    //                                 <div>
    //                                     <Icon>close</Icon>
    //                                     <div>Not uploaded</div>
    //                                 </div>
    //                             }
    //                             {front &&
    //                                 <div>
    //                                     <Icon>done</Icon>
    //                                     <div>Upload complete</div>
    //                                 </div>
    //                             }
    //                         </div>
    //                         <div className={classes.imageUpload} onClick={() => handleBackClick()}>
    //                             <div className={classes.imageUploadLabel}>back</div>
    //                             <div>
    //                                 <IconButton color="inherit">
    //                                     <Icon className={classes.imageUploadIcon}>add_a_photo</Icon>
    //                                 </IconButton>
    //                                 <input
    //                                     type="file"
    //                                     accept="image/*"
    //                                     capture="camera"
    //                                     on="true"
    //                                     autoComplete="off"
    //                                     tabIndex="-1"
    //                                     className={classes.fileInput}
    //                                     ref={inputFileBack}
    //                                     onChange={(event) => handleOnUploadBack(event)}
    //                                 />
    //                             </div>
    //                             <div className={classes.spacer}></div>
    //                             {!back &&
    //                                 <div>
    //                                     <Icon>close</Icon>
    //                                     <div>Not uploaded</div>
    //                                 </div>
    //                             }
    //                             {back &&
    //                                 <div>
    //                                     <Icon>done</Icon>
    //                                     <div>Upload complete</div>
    //                                 </div>
    //                             }
    //                         </div>
    //                     </div>
    //
    //                     <div className={classes.spacer}></div>
    //                     <IconButton className={classes.panelButton} color="inherit" onClick={() => handleSubmit1Click()} disabled={enableSubmit1()}>
    //                         <Typography className={classes.panelButtonText}>&nbsp;NEXT</Typography>
    //                     </IconButton>
    //                     <div className={classes.spacer}></div>
    //                     <div className={classes.spacer}></div>
    //
    //                     <IconButton className={classes.panelButtonBack} color="inherit" component={Link} to="/loginpanel">
    //                         <Icon>arrow_back_ios</Icon>
    //                         <Typography className={classes.panelButtonBackText}>&nbsp;Back</Typography>
    //                     </IconButton>
    //                 </div>
    //             }
    //             {step == 2 &&
    //                 <div className={classes.panel}>
    //                     <Typography variant="h4">
    //                         VERIFY IDENTITY
    //                     </Typography>
    //                     <div className={classes.spacer}></div>
    //                     <Typography variant="body2" className={classes.infoText}>
    //                         Please upload a picture of yourself holding the ID/Passport<br />
    //                         with both your face and ID being clearly visible in the picture
    //                     </Typography>
    //                     <div className={classes.imageUploadContainer}>
    //                         <div className={classes.imageUpload} onClick={() => handlePhotoClick()}>
    //                             <div className={classes.imageUploadLabel}>photo</div>
    //                             <div>
    //                                 <IconButton color="inherit">
    //                                     <Icon className={classes.imageUploadIcon}>add_a_photo</Icon>
    //                                 </IconButton>
    //                                 <input
    //                                     type="file"
    //                                     accept="image/*"
    //                                     capture="camera"
    //                                     on="true"
    //                                     autoComplete="off"
    //                                     tabIndex="-1"
    //                                     className={classes.fileInput}
    //                                     ref={inputFilePhoto}
    //                                     onChange={(event) => handleOnUploadPhoto(event)}
    //                                 />
    //                             </div>
    //                             <div className={classes.spacer}></div>
    //                             {!photo &&
    //                                 <div>
    //                                     <Icon>close</Icon>
    //                                     <div>Not uploaded</div>
    //                                 </div>
    //                             }
    //                             {photo &&
    //                                 <div>
    //                                     <Icon>done</Icon>
    //                                     <div>Upload complete</div>
    //                                 </div>
    //                             }
    //                         </div>
    //                     </div>
    //
    //                     <div className={classes.spacer}></div>
    //                     <IconButton className={classes.panelButton} color="inherit" component={Link} to="/userdetails" disabled={!photo}>
    //                         <Typography className={classes.panelButtonText}>&nbsp;NEXT</Typography>
    //                     </IconButton>
    //                     <div className={classes.spacer}></div>
    //                     <div className={classes.spacer}></div>
    //                     <IconButton className={classes.panelButtonBack} color="inherit" onClick={() => setStep(1)}>
    //                         <Icon>arrow_back_ios</Icon>
    //                         <Typography className={classes.panelButtonBackText}>&nbsp;Back</Typography>
    //                     </IconButton>
    //                 </div>
    //             }
    //         </Container>
    //     </main>
    // </div>
}

export default withStyles(styles)(VerifyIdentity)
