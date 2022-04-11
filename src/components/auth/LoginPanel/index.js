import React, {useEffect} from 'react'
import {withStyles} from '@material-ui/core'
import {useHistory} from 'react-router-dom'

import {useAppContext} from '../../../services/AppService'
import styles from './styles'
import './login-panel.scss'


const LoginPanel = () => {
    const history = useHistory()

    // Get Context
    const app = useAppContext()

    // Component States

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

    // Handlers


    return (
            <>
                <img className="background" src="background-input.png" alt="background"/>
                <main className="main-login">
                    <div className="main__form">
                        <button onClick={() => history.push('/login')}>Sign in <img src="arrow_input.svg" alt=""/>
                        </button>
                        <button onClick={() => history.push('/register')}>Registration</button>
                    </div>
                    <button className="main__back" onClick={() => history.push('/')}>
                        <img src="arrow_back.svg" alt="arrow"/>Back
                    </button>
                </main>
            </>
    )
}

export default withStyles(styles)(LoginPanel)
