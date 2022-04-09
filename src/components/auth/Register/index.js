import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {withStyles} from '@material-ui/core'
import AuthService, {useAuthContext} from '../../../services/AuthService'
import {useAppContext} from '../../../services/AppService'
import {useNotificationContext} from '../../../services/NotificationService'
import './register.scss'
import styles from './styles'

const Register = () => {
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
        if (password !== password2) {
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
    )
}

export default withStyles(styles)(Register)
