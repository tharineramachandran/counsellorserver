import React, { useState, useEffect, useContext } from 'react';
import {
    Header, Icon, Form, Image, Message,
    Segment, Grid, Modal, Search, Button, Dimmer, Item, Label, Container, Divider, List, Dropdown, Select
} from 'semantic-ui-react';
import { useForm } from "react-hook-form";

const Registration_Fourth = ({ formData, setForm, navigation, step }) => {

    const { COUNSELLOR_VIDEO_URL } = formData;
    const [icon_name, setIcon_name] = useState('circle');

    const { handleSubmit, register, errors } = useForm({

    });

    const onSubmit = (data) => {

        navigation.next()
    };

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
                                <h4>Registation for Counsellor</h4>
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
                                        <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(0)}>
                                            <Icon name="circle outline" />
                                                Personal Details&nbsp;
                                            </Label>
                                        <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(1)}>
                                            <Icon name="circle outline" />
                                                Photo&nbsp;
                                            </Label>
                                        <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(2)}>
                                            <Icon name="circle outline" />
                                                Description&nbsp;
                                            </Label>
                                        <Label as='a' circular onClick={() => navigation.go(3)}>
                                            <Icon name={icon_name} />
                                                Video&nbsp;
                                            </Label>
                                            <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(4)}>
                                            <Icon name="circle outline" />
                                                Availability&nbsp;
                                            </Label>
                                            <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(5)}>
                                            <Icon name="circle outline"/>
                                                Verification&nbsp;
                                            </Label>
                                    </List.Item>
                                </List>
                            </div>
                        </Container>
                        <div style={{ width: '100%' }}>
                            <center>
                                <Segment style={{ width: '95%' }}>
                                    <center>
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column width={8}>
                                                    <Segment style={{ width: '100%' }}>
                                                        <div style={{ width: '100%', textAlign: 'left' }}>
                                                            <Label color='red' horizontal>
                                                                Upload your video
                                                        </Label>
                                                        </div>
                                                        <br />
                                                        <Item.Group>
                                                            <Item>

                                                                <Item.Content>
                                                                    <p as='a'>Paste a link to your video</p>
                                                                    <Form.Group widths='equal'>

                                                                        <Form.Field className="CustomForm">
                                                                            <Icon name="youtube" color="red" className="customIconsAlign" />
                                                                                &nbsp;&nbsp;&nbsp;
                                                                                <input
                                                                                placeholder='First Name'
                                                                                type='text'
                                                                                name="COUNSELLOR_VIDEO_URL"
                                                                                onChange={setForm}
                                                                                value={COUNSELLOR_VIDEO_URL}
                                                                            // ref={register({ validate: COUNSELLOR_FIRST_NAME => COUNSELLOR_FIRST_NAME && COUNSELLOR_FIRST_NAME.length > 3 })}
                                                                            />
                                                                        </Form.Field>
                                                                    </Form.Group>
                                                                </Item.Content>
                                                            </Item>

                                                        </Item.Group>


                                                    </Segment>
                                                </Grid.Column>
                                                <Grid.Column width={8} style={{ textAlign: 'left' }}>
                                                    <Segment stacked style={{ width: '100%' }}>
                                                        <Label color='green' horizontal>
                                                            Tips for great videos
                                            </Label>
                                                        <br />
                                                        <br />
                                                        <div>
                                                            <Segment color='olive' size="mini">Smile and look at the camera</Segment>
                                                            <Segment color='teal' size="mini">Smile and look at the camera</Segment>
                                                            <Segment color='violet' size="mini">Smile and look at the camera</Segment>
                                                            <Segment color='red' size="mini">Smile and look at the camera</Segment>
                                                            <Segment color='yellow' size="mini">Smile and look at the camera</Segment>
                                                        </div>
                                                    </Segment>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </center>
                                </Segment>
                            </center>
                        </div>
                    </Segment>
                </center>

            </Grid.Column>
        </Grid >
    )

}

export default Registration_Fourth;