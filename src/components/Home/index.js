import React, {useEffect,  useState} from 'react'
import { useHistory} from 'react-router-dom'
import {useAppContext} from '../../services/AppService'
import DataService from '../../services/DataService'
import './home.scss'
import Countdown from '../Countdown/index.js'


const Home = () => {

    // Get Context
    const app = useAppContext()
    const history = useHistory()
    // Component States
    const [auction, setAuction] = useState(null)
    const loadAuction = () => {
        DataService.GetAuctionDetails()
                .then(function (response) {
                    setAuction(response.data)

                    let start_date = new Date(response.data.auction_start)
                    console.log('Auction Start: ', start_date.toLocaleString())
                })
    }

    // Setup Component
    useEffect(() => {
        app.dispatch({
            type: 'SET_BACKGROUND',
            background: 'messi',
        })
        app.dispatch({
            type: 'MENU_ENABLE'
        })

        // Get Auction Details
        loadAuction()
    }, [])


    return (
            <div className="home-wrapper">
                <video className="background-content" autoPlay muted loop>
                    <source src="background.mp4" tupe="video/mp4"/>
                </video>
                <img className="messi" src="messi.png" alt="messi"/>
                {auction && !auction.live && !auction.ended && <div className="main__description-container">
                    <span className="main__description">AUCTION STARTS IN:</span>
                    <Countdown startDate={auction.auction_start}/>
                </div>}
                <div className="main__title">
                    <img src="title.png" alt="title"/>
                    <p>
                        Own a 1 of 1 NFT with unique experience of <br/>
                        Ballon <br/>
                        d'Or 2021 of Lionel Messi
                    </p>
                </div>
                {auction && auction.live && <div className="main__description-container">
                    <span className="main__description">AUCTION IS LIVE - ENDS IN:</span>
                    <Countdown startDate={auction.auction_end}/>
                    <button className="main__button" onClick={() => history.push('/auction')}>View</button>
                </div>}
                {auction && auction.ended && <div className="main__description-container">
                    <span className="main__description">AUCTION HAS ENDED</span>
                </div>}
            </div>
    )
}

export default Home
