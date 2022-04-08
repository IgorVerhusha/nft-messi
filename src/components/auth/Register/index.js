import React, {useEffect, useRef, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {withStyles} from '@material-ui/core'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import AuthService, {useAuthContext} from '../../../services/AuthService'
import {useAppContext} from '../../../services/AppService'
import {useNotificationContext} from '../../../services/NotificationService'
import './register.scss'
import styles from './styles'

const Register = (props) => {
    const {classes} = props
    let history = useHistory()

    // Get Context
    const auth = useAuthContext()
    const notifications = useNotificationContext()
    const app = useAppContext()

    // Component States
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [acceptTerms, setAcceptTerms] = useState(false)
    const [isAccountCreated, setIsAccountCreated] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // Setup Component
    useEffect(() => {
        app.dispatch({
            type: 'SET_BACKGROUND',
            background: 'blank',
        })
        app.dispatch({
            type: 'MENU_DISABLE'
        })
    }, [])
    useEffect(() => {
        return () => {
            notifications.dispatch({
                type: 'HIDE_ALERT'
            })
        }
    }, [isAccountCreated])

    const handleSubmitClick = () => {
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
            notifications.dispatch({
                type: 'DISPLAY_ALERT',
                payload: {
                    'message': 'Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number, without specials symbols',
                    'severity': 'error'
                }
            })
            return
        }
        if (password != password2) {
            notifications.dispatch({
                type: 'DISPLAY_ALERT',
                payload: {'message': 'Passwords do not match', 'severity': 'error'}
            })
            return
        }


        AuthService.Signup(username, email, password, acceptTerms)
                .then(function (response) {
                    console.log(response.data)

                    if (response.data['account_created'] == true) {
                        setIsAccountCreated(true)

                        notifications.dispatch({
                            type: 'DISPLAY_ALERT',
                            payload: {'message': 'User created successfully', 'severity': 'info'}
                        })
                    }

                    return AuthService.Login(username, password)
                })
                .then(function (response) {
                    auth.dispatch({
                        type: 'LOGIN',
                        payload: response.data
                    })

                    // Set authenticated flag
                    setIsAuthenticated(true)

                    // Get User Profile
                    return AuthService.GetProfile()
                })
                .then(function (response) {
                    let profile = response.data
                    auth.dispatch({
                        type: 'PROFILE',
                        payload: profile
                    })
                    history.push('/')
                })
                .catch(function (error) {
                    console.log(error.response)
                    notifications.dispatch({
                        type: 'DISPLAY_ALERT',
                        payload: {'message': error.response.data.detail, 'severity': 'error'}
                    })
                })
    }

    const enableSubmit = () => {
        return !(username.length > 0 && email.length > 0 && password.length > 0 && password2.length > 0 && acceptTerms)
    }

    return (
            <>
                <img
                        className="background"
                        src="background-input.png"
                        alt="background"
                />
                {!isAccountCreated && (
                        <div className="register__form">
                            <span className="main__form-title">register</span>
                            <input type="text" placeholder="Username / E-mail" value={username}
                                   onChange={(e) => setUsername(e.target.value)}/>
                            <input type="text" className="input-pass" placeholder="E-mail" value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                            <input type="password" className="input-pass" placeholder="Password"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                            <input type="password" className="input-pass" placeholder="Repeat password"
                                   value={password2}
                                   onChange={(e) => setPassword2(e.target.value)}/>

                            <label className="label">
                                <input type="checkbox" className="checkbox"
                                       checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)}
                                />
                                <span className="checkbox__fake"></span>
                                <span className="text"
                                >Agree to terms and conditions of the auction</span
                                >
                            </label>
                            <button onClick={() => handleSubmitClick()} disabled={enableSubmit()}>
                                Next<img src="arrow_next-black.svg" alt=""/></button>
                        </div>)}
                <button className="main__back" onClick={() => history.push('/')}>
                    <img src="arrow_back.svg" alt="arrow"/>Back
                </button>
            </>
            // <div className={classes.root}>
            //     <main className={classes.main}>
            //         <Container maxWidth="sm" className={classes.container}>
            //             {!isAccountCreated &&
            //                 <div className={classes.panel}>
            //                     <Typography variant="h4">
            //                         REGISTER
            //                     </Typography>
            //                     <div className={classes.spacer}></div>
            //                     <div className={classes.inputContainer}>
            //                         <OutlinedInput
            //                             label="Username"
            //                             placeholder="USERNAME"
            //                             fullWidth
            //                             variant="outlined"
//     value = {username}
//     onChange = {(e)
// =>
//     setUsername(e.target.value)
// }
            //                             startAdornment={
            //                                 <Icon>person</Icon>
            //                             }
            //                             className={classes.inputField}
            //                         />
            //                         <OutlinedInput
            //                             label="Email"
            //                             placeholder="EMAIL"
            //                             fullWidth
            //                             variant="outlined"
            //                             value={email}
            //                             onChange={(e) => setEmail(e.target.value)}
            //                             startAdornment={
            //                                 <Icon>email</Icon>
            //                             }
            //                             className={classes.inputField}
            //                         />
            //                         <OutlinedInput
            //                             label="Password"
            //                             placeholder="PASSWORD"
            //                             fullWidth
            //                             type="password"
            //                             variant="outlined"
            //                             value={password}
            //                             onChange={(e) => setPassword(e.target.value)}
            //                             startAdornment={
            //                                 <Icon>lock</Icon>
            //                             }
            //                             className={classes.inputField}
            //                         />
            //                         <OutlinedInput
            //                             label="Repeat"
            //                             placeholder="REPEAT"
            //                             fullWidth
            //                             type="password"
            //                             variant="outlined"
            //                             value={password2}
            //                             onChange={(e) => setPassword2(e.target.value)}
            //                             startAdornment={
            //                                 <Icon>lock</Icon>
            //                             }
            //                             className={classes.inputField}
            //                         />
            //                         <FormControlLabel
            //                             control={<Checkbox checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} name="checkedA" />}
            //                             label="Accept terms and conditions"
            //                             className={classes.inputCheckbox}
            //                         />
            //                     </div>
            //
            //                     <div className={classes.spacer}></div>
            //                     <IconButton className={classes.panelButton} color="inherit" onClick={() => handleSubmitClick()} disabled={enableSubmit()}>
            //                         <Typography className={classes.panelButtonText}>&nbsp;NEXT</Typography>
            //                     </IconButton>
            //                     <div className={classes.spacer}></div>
            //                     <div className={classes.spacer}></div>
            //                     <IconButton className={classes.panelButtonBack} color="inherit" component={Link} to="/loginpanel">
            //                         <Icon>arrow_back_ios</Icon>
            //                         <Typography className={classes.panelButtonBackText}>&nbsp;Back</Typography>
            //                     </IconButton>
            //                 </div>
            //             }
            //             {isAccountCreated &&
            //                 <div className={classes.panelThankyou}>
            //                     <Typography variant="h4">
            //                         THANK YOU FOR <br /> REGISTERING
            //                     </Typography>
            //                     <div className={classes.spacer}></div>
            //                     <div className={classes.spacer}></div>
            //                     {/* <Typography variant="body2" className={classes.thankYouText}>
            //                         Please confirm your email address via the link sent to your email.<br />
            //                         Once your email has been confirmed you will receive additional KYC instructions<br />
            //                         for verification of your identity, that will allow you to take part in the auction.
            //                     </Typography> */}
            //                     <Typography variant="body2" className={classes.thankYouText}>
            //                         Thank you for registering<br />
            //                         Please continue verification of your identity, that will allow you to take part in the auction.
            //                     </Typography>
            //
            //                     <div className={classes.spacer}></div>
            //                     <div className={classes.spacer}></div>
            //                     <IconButton className={classes.panelButton} color="inherit" component={Link} to="/verifyidentity">
            //                         <Typography className={classes.panelButtonText}>&nbsp;NEXT</Typography>
            //                     </IconButton>
            //                     <div className={classes.spacer}></div>
            //                     <div className={classes.spacer}></div>
            //                     <IconButton className={classes.panelButtonBack} color="inherit" component={Link} to="/">
            //                         <Icon>arrow_back_ios</Icon>
            //                         <Typography className={classes.panelButtonBackText}>&nbsp;Back</Typography>
            //                     </IconButton>
            //                 </div>
            //             }
            //         </Container>
            //     </main>
            // </div>
    )
}

export default withStyles(styles)(Register)
