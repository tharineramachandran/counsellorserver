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
    Form,
    Header,
    Icon,
    Input, Dropdown, Grid,
    Message,
    Segment,
    Table, Label, Container, List, Popup
} from "semantic-ui-react";

import ViewProfile from './layout/ViewCounsellorProfile'
import Search from './layout/Search'
import DisplayProfiles from './layout/ViewUserDisplayProfiles' 
import ViewMessages from'./layout/ViewMessages'
import ViewChangeRequest from './layout/ViewUserChangeRequest'
import ViewAccepted from './layout/ViewUserAccepted';
import ViewRequest from './layout/ViewUserRequest';
import {baseURLAPI ,baseURL }from "../../../Global";
 
 
const axios = require('axios');
toast.configure();
 
const UserDashboard = (props) => {

    const setAuth = useContext(Authorize);
     
    const [userDetails, setUserDetails] = useState({ name: '', email: '' ,isCounsellor :''});
    const [isProfileSelected, setIsProfileSelected] = useState(false);
    const [isRequestAcceptSelected, setIsRequestAcceptSelected] = useState(false);
    const [isRequestChangeSelected, setIsRequestChangeSelected] = useState(false);
     
    const [isMessagesSelected, setIsMessagesSelected] = useState(false);
    const [isRequestSelected, setIsRequestSelected] = useState(false);

    const { name, email , isCounsellor } = userDetails;
    var user =[];
    async function getName() {
        try {
            axios.get(baseURLAPI+'/Counsellor/GetSingleCounsellorDetails/'+localStorage.userID, {
                headers: {
                  jwtToken:localStorage.jwtToken
                }
              })
            .then(function (response) {
                console.log(response);
                 user = response.data.counsellor;
                 setUserDetails({
            name: response.data.counsellor.user_details[0].TX_USER_NAME,
            email: response.data.counsellor.user_details[0].TX_USER_EMAIL,
            isCounsellor: response.data.counsellor.user_details[0].IS_COUNSELLOR
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
        
        localStorage.removeItem("userID");
        localStorage.removeItem("isCounsellor");
        localStorage.removeItem("jwtToken");
        
        setAuth(false);
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
                                        Hello  {name}
                                    </Label>
                                </List.Item>
                            </List>
                        </div>
                        <div style={{ float: 'right' }}>

                            <Label as='a' style={{ marginRight: '10px' }} onClick= {() => { setIsMessagesSelected(false);  setIsRequestSelected(false);   setIsRequestChangeSelected(false)  ;  setIsProfileSelected(!isProfileSelected)  ;                setIsRequestAcceptSelected(false)  ;       }    }>
                                Home 
                            </Label>
                            

                            <Label as='a' style={{ marginRight: '10px' }}  onClick= {() => {    setIsMessagesSelected(false);  setIsRequestSelected(false);   setIsRequestChangeSelected(!isRequestAcceptSelected);   setIsProfileSelected(false)  ; setIsRequestAcceptSelected(false)  ;   } }>
                                 View Change Request 
                            </Label>
                            <Label as='a' style={{ marginRight: '10px' }}  onClick= {() => {   setIsMessagesSelected(false);  setIsRequestSelected(!isRequestAcceptSelected);  setIsRequestChangeSelected(false)  ;    setIsProfileSelected(false)  ; setIsRequestAcceptSelected(false)  ;   } }>
                                 View Requests  
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
            {isRequestChangeSelected && <ViewChangeRequest />}
            
            {isRequestAcceptSelected && <ViewAccepted />}
            {/* {isMessagesSelected && <ViewMessages />} */}
            {isRequestSelected && <ViewRequest />}
            {/* {isProfileSelected && <ViewProfile />}  */}
            {/* {!isProfileSelected && <Search />} */}
            {/* {!isProfileSelected && <DisplayProfiles />} */}
            {isProfileSelected && <Search />}
        </>
    )
}

export default UserDashboard;   