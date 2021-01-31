import React, { useState, useEffect, useContext } from 'react';
import {
    Header, Icon, Form, Image, Message,
    Segment, Grid, Modal, Search, Button, Dimmer, Loader, Divider, Card, List, Container, Label, Item, Dropdown, Select
} from 'semantic-ui-react';
import matthew from '../../../../Static/Images/matthew.png'
import { useForm } from "react-hook-form";

const Registration_Third = ({ formData, setForm, navigation, step }) => {

    const { COUNSELLOR_PHOTO, COUNSELLOR_FIRST_NAME, COUNSELLOR_LAST_NAME, COUNSELLOR_HEADLINE, COUNSELLOR_ABOUT_DESCRIPTION } = formData;

    const [icon_name, setIcon_name] = useState('circle');

    const { handleSubmit, register, errors } = useForm({

    });


    const onSubmit = (data) => {
        navigation.next()
    };

    console.log(formData)

    useEffect(() => {
        if (step.id == 'Counsellor_about')
            setIcon_name('circle')
        else
            setIcon_name('circle outline')
    }, [])


    return (

        <Grid>
            <Grid.Column>
                <Form size='small' onSubmit={handleSubmit(onSubmit)}>
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
                                            <Label as='a' className="activeBreadCrumb"  circular onClick={() => navigation.go(3)}>
                                            <Icon name="circle outline" />
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
                                            <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(6)}>
                                                    <Icon name="circle outline" />
                                                Summary&nbsp;
                                            </Label>
                                        </List.Item>
                                    </List>
                                </div>
                            </Container>
                            <div style={{ width: '100%' }}>
                                <center>
                                    <Segment style={{ width: '60%' }}>
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


                                        <center>

                                        </center>
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