import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {withStyles} from '@material-ui/core'
import MuiPhoneNumber from 'material-ui-phone-number'

import AuthService from '../../../services/AuthService'
import {useAppContext} from '../../../services/AppService'
import {useNotificationContext} from '../../../services/NotificationService'
import CountrySelect from '../../../common/CountrySelect'
import styles from './styles'
import './details.scss'

const UserDetails = (props) => {
    const {classes} = props
    let history = useHistory()

    // Get Context
    const notifications = useNotificationContext()
    const app = useAppContext()

    // Component States
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [city, setCity] = useState('')
    const [stateProvince, setStateProvince] = useState('')
    const [country, setCountry] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isAccountUpdated, setIsAccountUpdated] = useState(false)
    const loadProfile = () => {
        AuthService.GetProfile()
                .then(function (response) {
                    let profile = response.data
                    setFirstName(profile.first_name ? profile.first_name : '')
                    setLastName(profile.last_name ? profile.last_name : '')
                    setAddress1(profile.address_1 ? profile.address_1 : '')
                    setAddress2(profile.address_2 ? profile.address_2 : '')
                    setCity(profile.city ? profile.city : '')
                    setStateProvince(profile.state_province ? profile.state_province : '')
                    setCountry(profile.country_code ? profile.country_code : '')
                    setPostalCode(profile.postal_code ? profile.postal_code : '')
                    setPhoneNumber(profile.phone_number ? profile.phone_number : '')
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
        loadProfile()
    }, [])
    useEffect(() => {
        return () => {
            notifications.dispatch({
                type: 'HIDE_ALERT'
            })
        }
    }, [isAccountUpdated])

    const handleSubmitClick = () => {
        let userDetails = {
            first_name: firstName,
            last_name: lastName,
            address_1: address1,
            address_2: address2,
            city: city,
            state_province: stateProvince,
            country_code: country,
            postal_code: postalCode,
            phone_number: phoneNumber,
        }
        AuthService.SaveAccountDetails(userDetails)
                .then(function (response) {
                    setIsAccountUpdated(true)
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
        return false
    }

    return (<>
                <img className="background" src="background-input.png" alt="background"/>
                <main className="details">
                    {!isAccountUpdated && <div className="main__form">
                        <span className="main__form-title">your details</span>
                        <div className="full-name-title">
                            <img src="full-name-title.svg" alt="icon"/>
                            Full name *
                        </div>
                        <div className="full-name">
                            <input type="text" value={firstName}
                                   onChange={(e) => setFirstName(e.target.value)} placeholder="First name"/>
                            <input type="text" value={lastName}
                                   onChange={(e) => setLastName(e.target.value)} placeholder="Last name"/>
                        </div>

                        <div className="address-title">
                            <img src="address-title.svg" alt="icon"/>
                            Address
                        </div>

                        <input type="text" placeholder="Street address *"
                               value={address1}
                               onChange={(e) => setAddress1(e.target.value)}/>
                        <input type="text" placeholder="Street address line 2"
                               value={address2}
                               onChange={(e) => setAddress2(e.target.value)}
                        />

                        <div className="address-addition">
                            <input type="text" placeholder="City *"
                                   value={city}
                                   onChange={(e) => setCity(e.target.value)}
                            />
                            <input type="text" placeholder="State / Province *"
                                   value={stateProvince}
                                   onChange={(e) => setStateProvince(e.target.value)}
                            />
                            <CountrySelect
                                    variant="outlined"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                            />
                            <input type="text" placeholder="Postcode *"
                                   value={postalCode}
                                   onChange={(e) => setPostalCode(e.target.value)}
                            />
                        </div>
                        <div className="phone-title">
                            <img src="phone-title.svg" alt=""/>
                            Phone number
                        </div>
                        <MuiPhoneNumber
                                defaultCountry={'fr'}
                                value={phoneNumber}
                                onChange={(value) => setPhoneNumber(value)}
                                placeholder="000-000-000"
                                fullWidth
                                variant="outlined"
                                className={classes.phoneNumberInput}
                        />
                        {/*<input type="text" placeholder="000 - 000 - 000"/>*/}
                        <button className="button"
                                onClick={() => handleSubmitClick()}
                                disabled={enableSubmit()}>Next<img src="arrow_next-black.svg" alt=""/></button>
                        <button className="main__back-details" onClick={() => history.push('/')}>
                            <img src="arrow_back.svg" alt="arrow"/>Back
                        </button>
                    </div>}
                    {isAccountUpdated && (<div className="main__form">
                        <span className="thank__title">thank you for registering</span>
                        <p>Thank you for completing the identity verification process.
                            Our team will review your details and verify your account as soon as possible.
                            For security purposes all verifications are handled manually and may take up to 3 working
                            days to process.</p>
                        <p> Please confirm your email address via the link sent yo your email.</p>
                        <button className="main__back-details" onClick={() => history.push('/')}>
                            <img src="arrow_back.svg" alt="arrow"/>Back
                        </button>
                    </div>)
                    }
                </main>
            </>

    )
}

export default withStyles(styles)(UserDetails)
