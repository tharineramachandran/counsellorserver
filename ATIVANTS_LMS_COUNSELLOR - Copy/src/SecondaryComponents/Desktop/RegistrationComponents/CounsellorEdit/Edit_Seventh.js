 import React, { useState, useEffect, useContext } from 'react';
import {
    Header, Icon, Form, Image, Message,
    Segment, Grid, Modal, Search, Button, Dimmer, Item, Label, Container, Divider, List, Dropdown, Select
} from 'semantic-ui-react';
import { useForm } from "react-hook-form";

import ChangePref from "../../UserDashboard/layout/ChangePref"
const Edit_Seventh = ({ formData, setForm, navigation, step }) => {

    const { COUNSELLOR_VIDEO_URL } = formData;
    const [icon_name, setIcon_name] = useState('circle');

    const { handleSubmit, register, errors } = useForm({

    });
 
    useEffect(() => {
        if (step.id == 'Counsellor_video')
            setIcon_name('circle')
        else
            setIcon_name('circle outline')
    }, [])

    return (

        <Grid>
            <Grid.Column>
                <center>
                    <Segment inverted color='teal' size="mini" style={{ width: '85%', textAlign: 'center' }}>
                        <Container>
                            <div style={{ float: 'left', marginLeft: '2rem' }}>
                           
                            </div>
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
                        <Container style={{ padding: '1rem 2rem', textAlign: 'left' }}>
                            <div style={{ backgroundColor: 'transparent' }}>
                            <List horizontal >
                                            <List.Item>
                                            <Label as='a'  className="activeBreadCrumb" circular onClick={() => navigation.go(0)}>
                                                    <Icon name={icon_name} />
                                                Personal Details&nbsp;
                                            </Label>
                                                <Label as='a'circular className="activeBreadCrumb"onClick={() => navigation.go(1)}>
                                                    <Icon name="circle outline" />
                                                Photo&nbsp;
                                            </Label>
                                                <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(2)}>
                                                    <Icon name="circle outline" />
                                                Description&nbsp;
                                            </Label>
                                                <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(3)}>
                                                    <Icon name="circle outline" />
                                                    Availability&nbsp;
                                            </Label>
                                                <Label as='a'  className="activeBreadCrumb"  circular onClick={() => navigation.go(4)}>
                                                    <Icon name="circle outline" />
                                                    Verification&nbsp;
                                            </Label>
                                                <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(5)}>
                                                    <Icon name="circle outline" />
                                                    Change Password&nbsp;
                                            </Label> 
                                            <Label as='a' circular onClick={() => navigation.go(6)}>
                                            <Icon name="circle outline" />
                                                Preferance&nbsp;
                                            </Label> 
                                            </List.Item>
                                        </List>
                            </div>
                        </Container>
                        <div style={{ width: '100%' }}>
                            <center>
                                <Segment style={{ width: '95%' }}>
                                   
                                      
                                       
                                                        <ChangePref /> 
                                                    </Segment>
                                                 
                                    </center>
                              
                        </div>
                    </Segment>
                </center>

            </Grid.Column>
        </Grid >
    )

}

export default Edit_Seventh;;