import React, { useState, useContext, useEffect } from 'react';
import { Authorize } from "../../../../../MainComponents/DesktopComponent";
import { toast } from "react-toastify";
import TopMenu from '../TopMenu';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect, Link
} from "react-router-dom";

import {
    Button,
    Form,Card,
    Header,
    Icon,
    Input, Dropdown, Grid,Modal,
    Message,
    Segment,
    Table, Label, Container, List, Popup
} from "semantic-ui-react"; 
  
   
import {baseURLAPI ,baseURL }from "../../../../../Global"; 
const axios = require('axios');
toast.configure();

const _MessageDisplay = () => {

   
    const [message, setMessage] = useState( );
     
    async function getName() {
        try {   
            
        const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);        
            const message = urlParams.get('message');
            setMessage(message);
            console.log(message);

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getName();
    }, [])

   
     

   
    return (
        <>
              <Container    >
                        {message}
                     </Container>  
       
           
        </>
    )
} 

export default _MessageDisplay;   