import React, { useState, useContext, useEffect } from 'react';
import { Authorize } from "../../../MainComponents/DesktopComponent";
import { toast } from "react-toastify";
import TopMenu from './layout/TopMenu';
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
import ViewRequest from './layout/ViewCounsellorRequest'
import ViewProfile from './layout/ViewCounsellorProfile'

import ViewMessages from'./layout/ViewMessages'
import ViewAccepted from './layout/ViewCounsellorAccepted'
import ViewDeclined from './layout/ViewCounsellorDeclined'
 
import ViewCounsellorChangeRequest from './layout/ViewCounsellorChangeRequest'
 
import Search from './layout/Search'
import RegistrationMultiStepForm from '../RegistrationComponents/_RegistrationMultiStepForm'; 
  
   
import {baseURLAPI ,baseURL }from "../../../Global"; 
const axios = require('axios');
toast.configure();

const CounsellorDashboard = (props) => {

    const setAuth = useContext(Authorize);
    const [userDetails, setUserDetails] = useState({ name: '', email: '', isCounsellor: '', isDetailsProvided: true });
    const [isProfileSelected, setIsProfileSelected] = useState(false); 
    const [isRequestSelected, setisRequestSelected] = useState(false);
    const [isViewDeclineSelected, setViewDeclineSelected] = useState(false); 

    const [isViewChangeSelected, setViewChangeSelected] = useState(false); 

    const [isMessagesSelected, setIsMessagesSelected] = useState(false); 

  
    const [isViewAcceptSelected, setViewAcceptSelected] = useState(false); 
    const { name, email, isCounsellor, isDetailsProvided } = userDetails;
    var user = [];
     
    const [open, setOpen] = useState(false) 
   
    async function getName() {
        try {
            axios.get(baseURLAPI+'/Counsellor/GetSingleCounsellorDetails/' + localStorage.userID


                , {
                    headers: {
                        jwtToken: localStorage.jwtToken
                    }
                })
                .then(function (response) {
                    console.log(response);
                    user = response.data.counsellor;
                    var value = undefined ;
                    
                    if (user.counsellor_details.length > 0) {
                        value = true;
                    } else {
                        value = false;
                    }  console.log(value);
                    
                    setUserDetails({
                        name: response.data.counsellor.user_details[0].TX_USER_NAME,
                        email: response.data.counsellor.user_details[0].TX_USER_EMAIL,
                        isCounsellor: response.data.counsellor.user_details[0].IS_COUNSELLOR,
                        isDetailsProvided :value
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });


        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getName();
    }, [])

    const logout = async () => {
        window.open(baseURLAPI+"/socialauth/logout", "_self");
        setAuth(false);

        
        localStorage.removeItem("isCounsellor");
        localStorage.removeItem("jwtToken");

        localStorage.removeItem("email");
        localStorage.removeItem("image");
        localStorage.removeItem("name");
        localStorage.removeItem("userID");
        localStorage.removeItem("isCompleted");
        localStorage.removeItem("verificationStatus");

         

        
    }

    const style = {
        borderRadius: 10,
        padding: '1em',
        width: '10rem'
    }
     

    var users = `This is just an amazing website. Isn't it...?? `;

    return (
        <>
            <Grid.Row>
                <Grid.Column width={16}>
                    <Container clearing style={{ backgroundColor: 'transparent', width: "100%", padding: '30px 3rem 0px 3rem' }}>
                        <div style={{ float: 'left' }}>
                            <List horizontal >
                                <List.Item as='a' style={{ color: 'black' }}>
                                    <Label color='blue' horizontal>
                                        Hello {name}
                                    </Label>
                                </List.Item>
                            </List>
                        </div>
                        <div style={{ float: 'right' }}> 
                            <Label as='a' style={{ marginRight: '10px' }} onClick= {() => {
 setIsProfileSelected(!isProfileSelected) ;  setisRequestSelected(false) ; setViewDeclineSelected(false) ;                               
}}  >
                                {isProfileSelected ? "Home" : "View Profile"}
                            </Label>
                            <Label as='a' style={{ marginRight: '10px' }} onClick= {() => {  setIsMessagesSelected(false);  setisRequestSelected(!isRequestSelected); setViewAcceptSelected(false); setIsProfileSelected(false)  ; setViewChangeSelected(false);     setViewDeclineSelected(false) }  }>
                                 View Request
                            </Label>
                            <Label as='a' style={{ marginRight: '10px' }}  onClick= {() => {  setIsMessagesSelected(false);  setViewDeclineSelected(!isViewDeclineSelected); setViewAcceptSelected(false);  setIsProfileSelected(false);  setViewChangeSelected(false);     setisRequestSelected(false) } }>
                                 View Declined Request 
                            </Label>
                            <Label as='a' style={{ marginRight: '10px' }}  onClick= {() => {     setIsMessagesSelected(false);  setViewAcceptSelected(!isViewAcceptSelected);   setViewDeclineSelected(false)  ;   setViewChangeSelected(false);      setIsProfileSelected(false);  setisRequestSelected(false) } }>
                                 View Accepted Request 
                            </Label>
                            <Label as='a' style={{ marginRight: '10px' }}  onClick= {() => {     setIsMessagesSelected(false);   setViewChangeSelected(!isViewChangeSelected);        setViewAcceptSelected(false);        setViewDeclineSelected(false)  ;               setIsProfileSelected(false);             } }>
                                 View Change Request 
                            </Label>
                            <Popup
          trigger={<Label as='a' circular style={{ marginRight: '10px' }}>
          <Icon name='mail' style={{ margin: '0px' }} />
      </Label>}
        size='mini'
          position='top right'
     on='click'
     flowing hoverable
   // popper={{ id: 'popper-container' }}
    // trigger={<Button>View Message</Button>}
     > 
   <Popup.Content  >
   
  <Grid     style={{width: '500px' , height :'400px',  overflowY: 'scroll', marginBottom: "15px"   }}    >
      <Grid.Column  >
      <ViewMessages  
 
  />
      </Grid.Column>
    </Grid>  
  </Popup.Content> 

  </Popup>

                            <Label as='a' circular style={{ marginRight: '10px' }}>
                                <Icon name='alarm' style={{ margin: '0px' }} />
                            </Label>
                            <Label as='a' circular style={{ marginRight: '10px' }}>
                                <Icon name='like' style={{ margin: '0px' }} />
                            </Label>
                            <Label as='a' onClick={e => logout()}>
                                <Icon name='sign out' />
                                Log out
                            </Label>

                        </div>
                    </Container>
                    <Container clearing style={{
                        backgroundColor: 'transparent',
                        width: "100%",
                        marginTop: '5rem',
                        padding: '0rem 7rem 0rem 3rem'
                    }}>
                    </Container>
                </Grid.Column >
            </Grid.Row >

            
            <Grid.Row><Grid.Column>
            {parseInt(localStorage.isCompleted)  ==1    ? (  
            
           <h3> </h3>
             
            ):(
             
                <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={
                    <   div> 
<div class="ui message" style = {{backgroundColor :'#EA3C53'  ,color :'white'   }}  >
<div class="header">
Click here to complete profile set up 
</div> </div> < br/></div> 
                  }
              > 
                <Modal.Content  >
                <RegistrationMultiStepForm />
                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={() => setOpen(false)}>Cancel</Button>
                  
                </Modal.Actions>
              </Modal>


            
            ) } </Grid.Column >
            </Grid.Row >
            
            < Grid.Row >
            < Grid.Column >    
            {isProfileSelected && <ViewProfile />}
            </Grid.Column >
            </Grid.Row >

            < Grid.Row >
            < Grid.Column > 
            { isViewDeclineSelected && <ViewDeclined />   }  
 
            </Grid.Column >
            </Grid.Row >

            < Grid.Row >
            < Grid.Column > 
            { isViewAcceptSelected && <ViewAccepted />   }  
 
            </Grid.Column >
            </Grid.Row >

            < Grid.Row >
            < Grid.Column > 
            { isRequestSelected && <ViewRequest />   }  
            </Grid.Column >
            </Grid.Row >
            < Grid.Row >
            < Grid.Column > 
            { isViewChangeSelected && <ViewCounsellorChangeRequest />   }  
            </Grid.Column >
            </Grid.Row >
             
            {isMessagesSelected && <ViewMessages />}
             


{/* 
            < Grid.Row >
            < Grid.Column >   
            { isRequestSelected &&    <ViewDeclined /> }  
            </Grid.Column >
            </Grid.Row >

            < Grid.Row >
            < Grid.Column > 
            { isRequestSelected &&    <ViewAccepted /> }  
            </Grid.Column >
            </Grid.Row > */}
          
            {/* {!isProfileSelected && <DisplayProfiles />} */} 
           
            
        </>
    )
}

export default CounsellorDashboard;   