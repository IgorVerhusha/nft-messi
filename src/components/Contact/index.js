import React, {useEffect} from 'react'
import {withStyles} from '@material-ui/core'
import {useAppContext} from '../../services/AppService'
import styles from './styles'
import './contact.scss'


const Contact = (props) => {

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
            type: 'MENU_ENABLE'
        })
    }, [])

    // Handlers


    return (
            <>
                <img
                        className="background"
                        src="background-input.png"
                        alt="background"
                />
                <main className="contact">
                    <div className="main__form">
                        <span className="contact__title">contacts</span>
                        <span className="contact__subtitle">Paris-Saint Germain</span>
                        <a className="contacts__mail" href="mailto:example@example.com">example@example.com</a>
                        <span className="contact__follow-us">Follow us:</span>
                        <div className="contact__block-social">
                            <img className="contact__img" src="tw-icon.svg" alt="tw"/>
                            <img className="contact__img" src="inst-icon.svg" alt="inst"/>
                        </div>
                    </div>
                </main>
            </>
    )
}

export default withStyles(styles)(Contact)
