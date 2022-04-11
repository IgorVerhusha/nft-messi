import React from 'react';
import Header from "../Header";
import Footer from "../Footer";

import './content.scss'
import {useHistory} from 'react-router-dom'

const Content = (props) => {
    const children = props.children;
    const history = useHistory();



    return (
        <div className="content-wrapper">
            <Header/>
            {children}
            {history.location.pathname !== "/" && <Footer/>}
        </div>
    );
}

export default Content;
