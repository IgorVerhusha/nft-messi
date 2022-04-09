import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {withStyles} from '@material-ui/core'
import AuthService from '../../../services/AuthService'
import {useAppContext} from '../../../services/AppService'
import {useNotificationContext} from '../../../services/NotificationService'
import styles from './styles'
import './forgot.scss'

const ForgotPassword = () => {
    let history = useHistory()

    // Get Context
    const notifications = useNotificationContext()
    const app = useAppContext()

    // Component States
    const [username, setUsername] = useState('')

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

    const handleSubmitClick = () => {
        AuthService.ForgotPassword(username)
                .then(function (response) {
                    notifications.dispatch({
                        type: 'DISPLAY_ALERT',
                        payload: {'message': 'Check your email to get change password link', 'severity': 'info'}
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
    return (<>
                <img
                        className="background"
                        src="background-input.png"
                        alt="background"

                />
                <main className="forgot">
                    <div className="main__form">
                        <span className="main__form-title">forgot password?</span>
                        <input type="text" placeholder="Username / E-mail" value={username}
                               onChange={(e) => setUsername(e.target.value)}/>
                        <button onClick={() => handleSubmitClick()}>Reset</button>
                    </div>
                    <button className="main__back" onClick={() => history.push('/loginpanel')}>
                        <img src="arrow_back.svg" alt="arrow"/>Back
                    </button>
                </main>
            </>
    )
}

export default withStyles(styles)(ForgotPassword)
