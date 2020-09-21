import React, { useState, useEffect } from 'react';
import { Button, Grid, Icon } from 'semantic-ui-react'
import _Header from '../Desktop/_Header';
import _Promos from '../Desktop/_Promos'
import Footer from '../../MainComponents/Footer'


const _NavigationItems = (props) => {

    console.log(props)
    return (
        <React.Fragment>
                <_Header {...props}/>
                <_Promos />
                <Footer/>
        </React.Fragment>
    )
}

export default _NavigationItems;