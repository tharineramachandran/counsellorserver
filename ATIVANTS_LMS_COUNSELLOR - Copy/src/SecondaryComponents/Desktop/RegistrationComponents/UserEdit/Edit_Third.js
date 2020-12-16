import React, { useState, useEffect, useContext } from 'react';
import {
    Header, Icon, Form, Image, Message,
    Segment, Grid, Modal, Search, Button, Dimmer, Loader, Divider, Card, List, Container, Label, Item, Dropdown, Select
} from 'semantic-ui-react';
import { baseURLAPI, baseURL } from "../../../../Global";

import matthew from '../../../../Static/Images/matthew.png'
import { useForm } from "react-hook-form";

import { ToastContainer, toast } from 'react-toastify';
const axios = require('axios');
const Registration_Third = ({ formData, setForm, navigation, step }) => {

    const { COUNSELLOR_PHOTO, COUNSELLOR_FIRST_NAME, COUNSELLOR_LAST_NAME, COUNSELLOR_HEADLINE, COUNSELLOR_ABOUT_DESCRIPTION, COUNSELLOR_VIDEO_URL } = formData;

    const [icon_name, setIcon_name] = useState('circle');

    const { handleSubmit, register, errors } = useForm({

    });

    const [firstboxError, setfirstboxError] = useState([]);

    const onSubmit = (data) => {
        navigation.next()
    };

    console.log(formData)

    useEffect(() => {

        
        axios.get(baseURLAPI + '/Counsellee/introduction/' + localStorage.userID, {
            headers: {
                jwtToken: localStorage.jwtToken
            },
            data: {
                userID: localStorage.userID

            }
        })
            .then(res => {
                console.log(" res.data.COUNSELLOR_PHOTO")
                console.log(res.data.details)

                var e = {
                    target: {
                        name: "COUNSELLOR_PHOTO",
                        value: res.data.intro.ct_counsellee_photo
                    }
                };
                setForm(e);
  
                var e = {
                    target: {
                        name: "COUNSELLOR_FIRST_NAME",
                        value: res.data.details.CT_FIRST_NAME
                    }
                };
                setForm(e);
                  e = {
                    target: {
                        name: "COUNSELLOR_LAST_NAME",
                        value: res.data.details.CT_LAST_NAME
                    }
                };
                setForm(e);
                  e = {
                    target: {
                        name: "COUNSELLOR_HEADLINE",
                        value: res.data.intro.ct_counsellee_headline
                    }
                };
                setForm(e);
                  e = {
                    target: {
                        name: "COUNSELLOR_VIDEO_URL",
                        value: res.data.intro.ct_counsellee_video_url
                    }
                };
                setForm(e);
                  e = {
                    target: {
                        name: "COUNSELLOR_ABOUT_DESCRIPTION",
                        value: res.data.intro.ct_counsellee_about_description
                    }
                };
                setForm(e);
                
 

            }).catch(err => {
            })



        if (step.id == 'Counsellor_about')
            setIcon_name('circle')
        else
            setIcon_name('circle outline')
    }, [])



    const _handleSubmitClick = async () => {
        
        const headers = {
            jwtToken: localStorage.jwtToken
        }
          
        axios.post(`http://localhost:5000/Counsellee/UpdateIntroduction`, { formData: formData, COUNSELLORID: localStorage.userID },
        
        {
            headers: headers
        }
        )
            .then(res => {
                console.log(res);
                console.log(res.data);
                setfirstboxError("");
                //  localStorage.setItem("isCompleted", 1);
                toast.success('Counsellee updated successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: '',
                });

            }).catch((error) => {
                if (error.response) {
                    var firstString = [];
                    var list = error.response.data;
                    list.forEach(DisplayValidation);
                    console.log(firstString);
                    setfirstboxError(firstString);

                    function DisplayValidation(item, index) {

                        if (item.error == "COUNSELLOR_HEADLINE") {
                            firstString.push(item.message);

                        }

                    }
                    toast.error('Unsuccessful update counsellee', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: '',
                    });
                }
                console.log(error);
            });
    }





    return (

        <Grid>
            <Grid.Column>
                <Form size='small'  >
                    <center>
                        <Segment inverted color='teal' size="mini" style={{ width: '85%', textAlign: 'center' }}>
                        <Container>
                            
                            <div style={{ float: 'right', padding: '1rem;' }}>
                                <Label as='a' onClick={() => navigation.previous()}>
                                    <Icon name='hand point left outline' />
                                  Previous
                                </Label>
                                <Label as='a' onClick={() => navigation.next()}>
                                    <Icon name='hand point right outline' />
                                  Next
                                </Label>
                            </div>
                        </Container>
                        <br />
                            <Container style={{ padding: '1rem 2rem',  textAlign: 'left'  }}>
                                <div style={{ backgroundColor: 'transparent' }}>
                                    <List horizontal >
                                        <List.Item>
                                            <Label as='a' className="activeBreadCrumb"  circular onClick={() => navigation.go(0)}>
                                                <Icon name="circle outline" />
                                                Personal Details&nbsp;
                                            </Label>
                                            <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(1)}>
                                                <Icon name="circle outline" />
                                                Photo&nbsp;
                                            </Label>
                                            <Label as='a' circular onClick={() => navigation.go(2)}>
                                                <Icon name={icon_name} />
                                                Description&nbsp;
                                            </Label>
                                            <Label as='a'  className="activeBreadCrumb" circular onClick={() => navigation.go(3)}>
                                            <Icon name={icon_name} />
                                                Change Password&nbsp;
                                            </Label>
                                            <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(4)}>
                                            <Icon name="circle outline" />
                                                Preferance&nbsp;
                                            </Label> 
                                            {/* <Label as='a' className="activeBreadCrumb"  circular onClick={() => navigation.go(3)}>
                                            <Icon name="circle outline" />
                                                Video&nbsp;
                                            </Label> */}
                                            {/* <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(4)}>
                                            <Icon name="circle outline" />
                                                Availability&nbsp;
                                            </Label>
                                            <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(5)}>
                                            <Icon name="circle outline"/>
                                                Verification&nbsp;
                                            </Label> */}
                                            {/* <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(4)}>
                                                    <Icon name="circle outline" />
                                                Summary&nbsp;
                                            </Label> */}
                                        </List.Item>
                                    </List>
                                </div>
                            </Container>
                            <div style={{ width: '100%' }}>
                          
                                <center>
                                    <Segment style={{ width: '95%' }}>
  <div style={{ width: '100%', textAlign: 'left' , paddingBottom:'1%'}}>
                                                    <Label as='a' color='blue' ribbon>
                                                     Describe yourself
                                        </Label>
                                        
                                                </div> 
                                        {COUNSELLOR_PHOTO ? <Image src={COUNSELLOR_PHOTO} size='small' centered alt='preview of cropped image' />
                                            :
                                            <Image src={matthew} size='small' />
                                        }

                                        <Item.Group>
                                            <Item>
                                                {/* <Item.Image src={COUNSELLOR_PHOTO} size="small" alt="preview of uploaded image" /> */}
                                                <Item.Content>
                                                    {COUNSELLOR_FIRST_NAME ? <Item.Header as='a'>{COUNSELLOR_FIRST_NAME}&nbsp;{COUNSELLOR_LAST_NAME}</Item.Header> :
                                                        'Your Name'
                                                    }
                                                    <br />
                                                    <Segment color='blue'>
                                                        <Grid columns='equal'>
                                                            <Grid.Column>
                                                                <Label color="blue">Headlines</Label>
                                                            </Grid.Column>
                                                            <Grid.Column width={13}>
                                                                <Form.Field className="CustomDescForm">
                                                                    <input
                                                                        placeholder='Write Your headline in English'
                                                                        type='text'
                                                                        name="COUNSELLOR_HEADLINE"
                                                                        onChange={setForm}
                                                                        value={COUNSELLOR_HEADLINE}
                                                                    />
                                                                </Form.Field>
                                                            </Grid.Column>
                                                        </Grid>
                                                        <Grid columns='equal'>
                                                            <Grid.Column>
                                                                <Label color="blue">&nbsp;&nbsp;&nbsp;&nbsp;About&nbsp;&nbsp;&nbsp;&nbsp;</Label>
                                                            </Grid.Column>
                                                            <Grid.Column width={13}>
                                                                <Form.TextArea placeholder='Tell us more about you...'
                                                                    name="COUNSELLOR_ABOUT_DESCRIPTION" onChange={setForm} value={COUNSELLOR_ABOUT_DESCRIPTION} />
                                                            </Grid.Column>
                                                        </Grid>
                                                    </Segment>
                                                </Item.Content>
                                            </Item>

                                        </Item.Group>

                                        < Form>
                                       
 


    {firstboxError.length > 0 && (
        <Form.Group widths='equal'>
            <Form.Field className="CustomForm">
                <Message negative style={{ padding: '0.5rem' }}>
                    {firstboxError.map((firstStringmessage, index) => (
                        <p>
                            {firstStringmessage}
                        </p>
                    ))}

                </Message>
            </Form.Field>
        </Form.Group>
    )
    }
     <Form.Group widths='equal'>
                                                    <Form.Field className="CustomForm">
                                                        <Button className="appBanner" color='blue' onClick={_handleSubmitClick}>
                                                            <Icon name='send' className="appBanner" /> Update Details &nbsp;&nbsp;
                                    </Button> &nbsp;&nbsp;&nbsp;
                                                    </Form.Field>

                                                    <Form.Field>
                                                    </Form.Field>

                                                </Form.Group>
    </Form>
                                        
                                    </Segment>
                                </center>
                            </div>
                        </Segment>
                    </center>
                </Form>
            </Grid.Column>
        </Grid>
    )

}

export default Registration_Third;