import React, {useEffect, useRef, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {withStyles} from '@material-ui/core'
import AuthService from '../../../services/AuthService'
import {useAppContext} from '../../../services/AppService'
import './verify.scss'
import styles from './styles'

const VerifyIdentity = () => {
    let history = useHistory()

    const inputFileFront = useRef(null)
    const inputFileBack = useRef(null)
    const inputFilePhoto = useRef(null)

    // Get Context
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
}

export default withStyles(styles)(VerifyIdentity)
