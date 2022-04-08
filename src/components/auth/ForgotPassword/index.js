import React, {useEffect, useRef, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {withStyles} from '@material-ui/core'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

import AuthService, {useAuthContext} from '../../../services/AuthService'
import {useAppContext} from '../../../services/AppService'
import {useNotificationContext} from '../../../services/NotificationService'
import styles from './styles'
import './forgot.scss'

const ForgotPassword = (props) => {
    const {classes} = props
    let history = useHistory()

    console.log('================================== ForgotPassword ======================================')

    // Get Context
    const auth = useAuthContext()
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
            // <div className={classes.root}>
            //     <main className={classes.main}>
            //         <Container maxWidth="sm" className={classes.container}>
            //             <div className={classes.panel}>
            //                 <Typography variant="h4">
            //                     FORGOT PASSWORD
            //                 </Typography>
            //                 <div className={classes.spacer}></div>
            //                 <div className={classes.inputContainer}>
            //                     <OutlinedInput
            //                         label="Username or email"
            //                         placeholder="  USERNAME/EMAIL"
            //                         fullWidth
            //                         variant="outlined"
            //                         value={username}
            //                         onChange={(e) => setUsername(e.target.value)}
            //                         startAdornment={
            //                             <Icon>person</Icon>
            //                         }
            //                         className={classes.inputField}
            //                     />
            //
            //                 </div>
            //
            //                 <div className={classes.spacer}></div>
            //                 <IconButton className={classes.panelButton} color="inherit" onClick={() => handleSubmitClick()}>
            //                     <Typography className={classes.panelButtonText}>&nbsp;SUBMIT</Typography>
            //                 </IconButton>
            //                 <div className={classes.spacer}></div>
            //                 <div className={classes.spacer}></div>
            //                 <div className={classes.spacer}></div>
            //                 <div className={classes.spacer}></div>
            //                 <div className={classes.spacer}></div>
            //                 <div className={classes.spacer}></div>
            //                 <div className={classes.spacer}></div>
            //                 <IconButton className={classes.panelButtonBack} color="inherit" component={Link} to="/loginpanel">
            //                     <Icon>arrow_back_ios</Icon>
            //                     <Typography className={classes.panelButtonBackText}>&nbsp;Back</Typography>
            //                 </IconButton>
            //             </div>
            //         </Container>
            //     </main>
            // </div>
    )
}

export default withStyles(styles)(ForgotPassword)
