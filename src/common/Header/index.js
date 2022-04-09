import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useAuthContext} from '../../services/AuthService'
import {useNotificationContext} from '../../services/NotificationService'
import {useAppContext} from '../../services/AppService'
import './header.scss'

const Header = () => {
    const auth = useAuthContext()
    const notifications = useNotificationContext()
    const history = useHistory()
    const app = useAppContext()
    const [hoverButton, setHoverButton] = useState(false)


    // Handlers
    const toggleDrawer = (open) => {
        if (open) {
            app.dispatch({
                type: 'DRAWER_OPEN'
            })
        } else {
            app.dispatch({
                type: 'DRAWER_CLOSE'
            })
        }
    }
    const closeNotificationAlert = () => {
        notifications.dispatch({
            type: 'HIDE_ALERT'
        })
    }

    return (
            <header className="header">
                {notifications.state.message && <div className="error">
                    <button onClick={closeNotificationAlert}>
                        <img src="exit.svg" alt=""/>
                    </button>
                    <span>{notifications.state.message}</span>
                </div>}
                <Link to="/" className="header__left-block">
                    <img src="/paris_golden_city.svg" alt="paris_golden_city"/>
                    <img src="/psg.svg" alt="psg"/>
                    <img src="/leo_messi.svg" alt="leo_messi"/>
                </Link>
                {auth.state.isAuthenticated && auth.state.account_type === 'user' ?
                        <div className="header__right-block-sign">
                            {!auth.state.identity_verified &&
                                    <div className="verify" onClick={() => history.push('/verifyidentity')}
                                         onMouseEnter={() => setHoverButton(true)}
                                         onMouseLeave={() => setHoverButton(false)}>
                                        <img src="warning-yellow.svg" alt=""/>
                                        <span>not verified</span></div>}
                            <button onClick={() => history.push('/bidhistory')}>Bid History</button>
                            <button onClick={() => history.push('/userdetails')}>User Details</button>
                            <button onClick={() => history.push('/contact')}>Contact</button>
                            <button onClick={() => history.push('/logout')}>Sign out<img src="arrow_input-back.svg"/>
                            </button>
                        </div> : <div className="header__right-block">
                            <button onClick={() => history.push('/contact')}>Contact</button>
                            <button onClick={() => history.push('/loginpanel')}>Sign in<img src="./arrow_input.svg"/>
                            </button>
                        </div>}
                {hoverButton && <div className="tooltip-header">
                    Infortunately we could not verify your identity
                </div>}
                <button className="header__burger" onClick={() => toggleDrawer(!app.state.drawerOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div className={`menu-mobile ${app.state.drawerOpen ? 'active' : ''}`}>
                    <button className="header__burger" onClick={() => toggleDrawer(!app.state.drawerOpen)}>
                        <span></span>
                        <span></span>
                    </button>

                    <div className="menu__button">
                        {auth.state.isAuthenticated && auth.state.account_type === 'user' ?
                                <button className="sign-out-button" onClick={() => history.push('/logout')}>Sign out<img
                                        src="arrow_input.svg" className="revert_img"/></button> : <button onClick={() => {
                                    history.push('/loginpanel')
                                    toggleDrawer(false)
                                }}>
                                    Sign in<img src="arrow_input.svg"/></button>}
                        <button onClick={() => {
                            history.push('/contact')
                            toggleDrawer(false)
                        }}>
                            Contact
                        </button>
                        {auth.state.isAuthenticated && auth.state.account_type === 'user' && <button onClick={() => {
                            history.push('/bidhistory')
                            toggleDrawer(false)
                        }}>Bid History
                        </button>}
                    </div>
                    {auth.state.isAuthenticated && auth.state.account_type === 'user' && !auth.state.identity_verified &&
                            <div className="warning-solid">
                                <img src="warning-solid.svg" alt="warning"/>
                                <span>not verified</span>
                            </div>}
                    <div className="policy">
                        <span>Terms and Conditions</span>
                        <span>Privacy Policy</span>
                    </div>
                </div>
            </header>)
    }

export default (Header)
