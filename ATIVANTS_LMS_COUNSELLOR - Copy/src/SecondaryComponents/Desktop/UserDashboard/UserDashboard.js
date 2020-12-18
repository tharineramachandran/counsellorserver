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
    Form, Modal,
    Header, Menu,
    Icon,
    Input, Dropdown, Grid,
    Message,
    Segment,
    Table, Label, Container, List, Popup
} from "semantic-ui-react";

import ViewProfile from './layout/ViewCounsellorProfile'
import Search from './layout/Search'
import DisplayProfiles from './layout/ViewUserDisplayProfiles'
import ViewMessages from './layout/ViewMessages'
import ViewChangeRequest from './layout/ViewUserChangeRequest'
import ViewAccepted from './layout/ViewUserAccepted';
import ViewRequest from './layout/ViewUserRequest';
 
import ViewNoti from './layout/ViewNoti'
import ViewUserLike from './layout/ViewUserLike';
import ViewUserRating from './layout/ViewUserRating';
import EditUserProfile from './layout/ViewEditUserProfile';
import ViewRegisterUserProfile from './layout/ViewRegisterUserProfile';
 
import { baseURLAPI, baseURL } from "../../../Global";

 
import { useRef } from 'react';
const axios = require('axios');
toast.configure();

const UserDashboard = (props) => {

    const setAuth = useContext(Authorize);
    const contextRef = useRef();
    const contextRefNoti = useRef();
    const [userDetails, setUserDetails] = useState({ name: '', email: '', isCounsellor: '', image: '', isCompleted: '' });
    const [isProfileSelected, setIsProfileSelected] = useState(false);
    const [isRequestAcceptSelected, setIsRequestAcceptSelected] = useState(false);
    const [isRequestChangeSelected, setIsRequestChangeSelected] = useState(false);
    const [open, setOpen] = useState(false);
    const [isMessagesSelected, setIsMessagesSelected] = useState(false);
    const [isRequestSelected, setIsRequestSelected] = useState(false);
    const [isRatingSelected, setIsRatingSelected] = useState(false);
    const [IsLikeSelected, setIsLikeSelected] = useState(false);
    const [OpenMessageSelected, setOpenMessageSelected] = useState(false);
 
    const [OpenNotiSelected, setOpenNotiSelected] = useState(false);
    const [totalmessages, settotalmessages] = useState(0);
    
    const [totalnoti, settotalnoti] = useState(0);
    const [newNoti, setnewNoti] = useState(false);

    const [isEditSelected, setIsEditSelected] = useState(false);
    const [isUserCompleteSelected, setUserCompletedSelected] = useState(false);
    const { name, email, isCounsellor, image, isCompleted } = userDetails;
    var user = [];




    async function getName() {

        try {
            setUserDetails({
                name: localStorage.name,
                email: localStorage.email,
                image: localStorage.image,
                isCounsellor: localStorage.isCounsellor,
                isCompleted: localStorage.isCompleted
            });

        } catch (error) {
            console.log(error.message);
        }
    }


    async function getData() {
        try {

            axios.get(baseURLAPI + '/messages/TotalUnread/' + localStorage.userID, {
                headers: {
                    jwtToken: localStorage.jwtToken
                },
                data: {
                    userID: localStorage.userID
                }
            })
                .then((res) => {
                   
                    
                    if (parseInt(res.data) != totalmessages) {

                        settotalmessages(parseInt(res.data));
                        setnewNoti(false);
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });
 

        } catch (error) {
            console.log(error.message);
        }
        try {

            axios.get(baseURLAPI + '/notification/TotalNoti/' + localStorage.userID, {
                headers: {
                    jwtToken: localStorage.jwtToken
                },
                data: {
                    userID: localStorage.userID
                }
            })
                .then((res) => {
                
                    
                    if (parseInt(res.data) != totalnoti) {

                        settotalnoti(parseInt(res.data));
                    
                    }

                })
                .catch(function (error) {
                    console.log(error);
                }); 
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        setInterval(() => {
            try {

                axios.get(baseURLAPI + '/messages/TotalUnread/' + localStorage.userID, {
                    headers: {
                        jwtToken: localStorage.jwtToken
                    },
                    data: {
                        userID: localStorage.userID
                    }
                })
                    .then((res) => {
                        
                        if (parseInt(res.data) != totalmessages) {

                            settotalmessages(parseInt(res.data));
                            setnewNoti(false);
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    }); 
            } catch (error) {
                console.log(error.message);
            }

             
            try {

                axios.get(baseURLAPI + '/notification/TotalNoti/' + localStorage.userID, {
                    headers: {
                        jwtToken: localStorage.jwtToken
                    },
                    data: {
                        userID: localStorage.userID
                    }
                })
                    .then((res) => {
                      
                        
                        if (parseInt(res.data) != totalnoti) {

                            settotalnoti(parseInt(res.data));
                        
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    }); 
            } catch (error) {
                console.log(error.message);
            }
        }, 5000);
 


    });

    useEffect(() => {
        getName();
        getData();

    }, [])

    const logout = async () => {

        window.open(baseURLAPI + "/socialauth/logout", "_self");
        localStorage.removeItem("userID");
        localStorage.removeItem("isCounsellor");
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("email");
        localStorage.removeItem("image");
        localStorage.removeItem("name");
        localStorage.removeItem("isCompleted");
        localStorage.removeItem("verificationStatus");

        setAuth(false);
    }

    var users = `This is just an amazing website. Isn't it...?? `;
    return (
        <>
            <Grid.Row>
                <Grid.Column width={20}>
                    <Container clearing style={{ backgroundColor: 'transparent', width: "100%", padding: '30px 3rem 0px 3rem' }}>
                        <div style={{ float: 'left' }}>
                            <List horizontal >
                                <List.Item as='a' style={{ color: 'black' }}>
                                    <Label color='blue' horizontal>
                                        Hello  {localStorage.name}
                                    </Label>
                                </List.Item>
                            </List>
                        </div>


                        <div style={{ float: 'right' }}>

{/* 
                            

                          

                            

                        
                */}


{/*  
                            <Label as='a' circular style={{ marginRight: '10px' }}>
                                <Icon name='alarm' style={{ margin: '0px' }} />
                            </Label> */}
                            
                            <Menu   secondary >

                            <Menu.Item> <p onClick={() => {  setIsEditSelected(false); setIsLikeSelected(false); setIsRatingSelected(false); setIsMessagesSelected(false); setIsRequestSelected(false); setIsRequestChangeSelected(false); setIsProfileSelected(!isProfileSelected); setIsRequestAcceptSelected(false); }}>
                                Home </p> </Menu.Item>    

                          
                              <Menu.Item> <p onClick={() => { setIsLikeSelected(false); setIsRatingSelected(false); setIsEditSelected(!isEditSelected   ); setIsMessagesSelected(false); setIsRequestSelected(false); setIsRequestChangeSelected(false); setIsProfileSelected(false); setIsRequestAcceptSelected(false); }}>
                                View Profile
      </p>  </Menu.Item>        
                            <Menu.Item> <p onClick={() => { setIsLikeSelected(false);  setIsEditSelected(false); setIsRatingSelected(false); setIsMessagesSelected(false); setIsRequestSelected(false); setIsRequestChangeSelected(!isRequestAcceptSelected); setIsProfileSelected(false); setIsRequestAcceptSelected(false); }}>
                                View Change Request
                             </p>      </Menu.Item>    
                            <Menu.Item> <p onClick={() => { setIsLikeSelected(false);  setIsEditSelected(false); setIsMessagesSelected(false); setIsRequestSelected(false); setIsRequestChangeSelected(false); setIsRatingSelected(!isRequestAcceptSelected); setIsProfileSelected(false); setIsRequestAcceptSelected(false); }}>
                                View Rating
                            </p>      </Menu.Item>   

                            <Menu.Item> <p  onClick={() => { setIsLikeSelected(false); setIsEditSelected(false);  setIsMessagesSelected(false); setIsRequestSelected(!isRequestAcceptSelected); setIsRatingSelected(false); setIsRequestChangeSelected(false); setIsProfileSelected(false); setIsRequestAcceptSelected(false); }}>
                                View Requests
                       </p>      </Menu.Item>    




                            <Menu.Item>             <p onClick={() => { setOpenNotiSelected(false) ; setOpenMessageSelected(!OpenMessageSelected) }}>
                                <Menu text >
                                    <Menu.Item >
                                        < p >
                                            <Icon name='mail' style={{ margin: '0px' }} />
                                            {totalmessages > 0 ? (<Label color='red' floating>
                                                {totalmessages}
                                            </Label>) : (

                                                    <p></p>
                                                )}
                                        </p>
                                    </Menu.Item>
                                </Menu>
                            </p>
                            <strong ref={contextRef}> </strong>
                            <Popup
                                flowing hoverable
                                popper={{ id: 'popper-container' }}
                                position='top right'
                                open={OpenMessageSelected}
                                context={contextRef}
                                content={
                                    <Grid style={{ width: '500px', height: '400px', overflowY: 'scroll', marginBottom: "15px" }}    >
                                        <Grid.Column  >
                                            <ViewMessages />
                                        </Grid.Column>
                                    </Grid>
                                }
                            /></Menu.Item>
                           
                                <Menu.Item>
                            <p onClick={() => {  setOpenNotiSelected(!OpenNotiSelected);setOpenMessageSelected(false); }}>
                                <Menu text >
                                    <Menu.Item >
                                       
                                            <Icon name='alarm'style={{ margin: '0px' }}  />
                                            {totalnoti > 0 ? (<Label color='red' floating>
                                                {totalnoti}
                                            </Label>) : (
                                                    <p></p>
                                                )}
                                        
                                    </Menu.Item>
                                </Menu>
                            </p>
                            <strong ref={contextRefNoti}> </strong>
                            <Popup
                                flowing hoverable
                                popper={{ id: 'popper-container' }}
                                position='top right'
                                open={OpenNotiSelected}
                                context={contextRefNoti}
                                content={
                                    <Grid style={{ width: '500px', height: '400px', overflowY: 'scroll', marginBottom: "15px" }}    >
                                        <Grid.Column  >
                                            <ViewNoti />
                                        </Grid.Column>
                                    </Grid>
                                }
                            /></Menu.Item>
                            <Menu.Item>
            

                            <p   >
                                <Menu text >
                                    <Menu.Item >
                                    <p onClick={() => { setIsMessagesSelected(false); setIsLikeSelected(!IsLikeSelected); setIsRequestSelected(false); setIsRatingSelected(false); setIsRequestChangeSelected(false); setIsProfileSelected(false); setIsRequestAcceptSelected(false); }} as='a' circular style={{ marginRight: '10px' }}>
                                <Icon name='like' style={{ margin: '0px' }} />
                            </p>
                                    </Menu.Item>
                                </Menu>

                                </p>
                                <strong > </strong>
            </Menu.Item>
            <Menu.Item>

                            <p as='a' onClick={e => logout()} style={{ marginRight: '10px' }}>
                                <Icon name='sign out' />
                                Log out
                            </p>
 </Menu.Item>
      </Menu >    


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
<br/>


            {parseInt(localStorage.verificationStatus) == 1 ? (
                <div>
                </div>

            ) : (<   div style={{ paddingBottom: "1%" }} >
                <div class="ui message" style={{ backgroundColor: 'teal', color: 'white' }}  >
                    <div class="header">
                        Please check your mailbox for {localStorage.email} for email verification link
</div> </div> </div>)
            }


            {parseInt(localStorage.isCompleted) != 1 ? (
                 <div>
                 <div class="ui message" onClick={() => { setIsLikeSelected(false); setIsRatingSelected(false); setIsEditSelected(true); setIsMessagesSelected(false); setIsRequestSelected(false); setIsRequestChangeSelected(false); setIsProfileSelected(false); setIsRequestAcceptSelected(false); }}style={{ backgroundColor: '#EA3C53', color: 'white' }}  >
                     <div class="header">
                                 Click here to complete profile set up
</div> </div><br /></div>

            ) : (<div>
                {/* <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={
                        <   div>
                            <div class="ui message" style={{ backgroundColor: '#EA3C53', color: 'white' }}  >
                                <div class="header">
                                    Click here to complete profile set up
</div> </div><br /></div>
                    }
                >
                    <Modal.Content  >
                        <RegistrationUserMultiStepForm />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                    </Modal.Actions>
                </Modal> */}
            </div>)
            }

            {isRequestChangeSelected && <ViewChangeRequest />}
            {isRequestAcceptSelected && <ViewAccepted />}
            {/* {isMessagesSelected && <ViewMessages />} */}
            {isRequestSelected && <ViewRequest />}
            {isRatingSelected && <ViewUserRating />}

            {/* {isProfileSelected && <ViewProfile />}  */}
            {/* {!isProfileSelected && <Search />} */}
            {/* {!isProfileSelected && <DisplayProfiles />} */}
            {isProfileSelected && <Search />}

            {isEditSelected && parseInt(localStorage.isCompleted) == 1  && <EditUserProfile />}
            {isEditSelected && parseInt(localStorage.isCompleted) == 0 && <ViewRegisterUserProfile />}
             
            {IsLikeSelected && <ViewUserLike />}
        </>
    )
}

export default UserDashboard;   