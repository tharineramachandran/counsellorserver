import React, { useState, useEffect, useContext } from 'react';
import {
    Header, Icon, Form, Image, Message,
    Segment, Grid, Modal, Search, Button, Dimmer, Item, Label, Divider, List, Dropdown, Select
} from 'semantic-ui-react';
import { useForm } from "react-hook-form";

const Registration_Fourth = ({ formData, setForm, navigation }) => {

    const { COUNSELLOR_VIDEO_URL } = formData;

    const { handleSubmit, register, errors } = useForm({

    });

    const onSubmit = (data) => {

        navigation.next()
    };

    return (

        <Grid>
            <Grid.Column>
                <center>
                    <Segment stacked style={{ width: '80%', textAlign: 'left' }}>
                        <h2>Video</h2>
                        <center>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        <Segment stacked style={{ width: '100%' }}>
                                            <div style={{ width: '100%', textAlign: 'left' }}>
                                                <Label color='blue' horizontal>
                                                    Upload your video
                                            </Label>
                                            </div>
                                            <br />
                                            <Item.Group>
                                                <Item>

                                                    <Item.Content>
                                                        <Item.Header as='a'>Paste a link to your video</Item.Header>
                                                        <Form.Group>
                                                        <Form.Field className="CustomForm">
                                                            <input
                                                                fluid
                                                                icon='user'
                                                                iconPosition='left'
                                                                placeholder='Enter your details'
                                                                type='text'
                                                                placeholder='Enter your details'
                                                                type='text'
                                                                name="COUNSELLOR_VIDEO_URL"
                                                                onChange={setForm}
                                                                value={COUNSELLOR_VIDEO_URL}
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
                        <br /><br />
                        <Form size='small' onSubmit={handleSubmit(onSubmit)}>

                            <Button
                                color='teal'
                                fluid
                                size='large'
                                onClick={() => navigation.previous()}
                            >
                                Back
                            </Button>
                            <br />
                            <Button
                                color='teal'
                                fluid
                                size='large'
                                type="submit"
                                onClick={() => navigation.next()}
                            >
                                Next
                    </Button>
                        </Form>
                    </Segment>
                </center>

            </Grid.Column>
        </Grid >
    )

}

export default Registration_Fourth;