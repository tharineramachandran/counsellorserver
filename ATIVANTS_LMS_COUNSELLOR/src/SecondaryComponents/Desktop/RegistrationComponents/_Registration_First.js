import React, { useState, useEffect, useContext } from 'react';
import {
    Header, Icon, Form, Image, Message,
    Segment, Grid, Modal, Search, Button, Dimmer, Loader, Divider, List
} from 'semantic-ui-react';
import { useForm } from "react-hook-form";

const Registration_First = ({ formData, setForm, navigation }) => {

    const { firstName } = formData;
    console.log(formData)

    const { handleSubmit, register, errors } = useForm({

    });

    const onSubmit = (data) => {
        navigation.next()
    };


    return (

        <Grid>
            <Grid.Column>
                <Form size='small' onSubmit={handleSubmit(onSubmit)}>
                    <center>
                        <Segment stacked style={{ width: '90%', textAlign:'left' }}>
                            <Form.Group widths='equal'>
                                <Form.Field  className="CustomForm">
                                    <label>User Input</label>
                                    <input
                                        fluid
                                        icon='user'
                                        iconPosition='left'
                                        placeholder='Enter your details'
                                        type='text'
                                        name="firstName"
                                        onChange={setForm}
                                        value={firstName}
                                        ref={register({ validate: firstName => firstName && firstName.length > 3 })}
                                    />
                                    {errors.firstName && <p className="customError">Username invalid</p>}
                                </Form.Field>
                               

                                <Form.Field  className="CustomForm">
                                    <label>User Input</label>
                                    <input
                                        fluid
                                        icon='user'
                                        iconPosition='left'
                                        placeholder='Enter your details'
                                        type='text'
                                        name="firstName"
                                        onChange={setForm}
                                        value={firstName}
                                        ref={register({ validate: firstName => firstName && firstName.length > 3 })}
                                    />
                                     {errors.firstName && <p className="customError">Username invalid</p>}
                                </Form.Field>
                               

                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Field  className="CustomForm">
                                    <label>User Input</label>
                                    <input
                                        fluid
                                        icon='user'
                                        iconPosition='left'
                                        placeholder='Enter your details'
                                        type='text'
                                        name="firstName"
                                        onChange={setForm}
                                        value={firstName}
                                        ref={register({ validate: firstName => firstName && firstName.length > 3 })}
                                    />
                                      {errors.firstName && <p className="customError">Username invalid</p>}
                                </Form.Field>

                                <Form.Field  className="CustomForm">
                                    <label>User Input</label>
                                    <input
                                        fluid
                                        icon='user'
                                        iconPosition='left'
                                        placeholder='Enter your details'
                                        type='text'
                                        name="firstName"
                                        onChange={setForm}
                                        value={firstName}
                                        ref={register({ validate: firstName => firstName && firstName.length > 3 })}
                                    />
                                     {errors.firstName && <p className="customError">Username invalid</p>}
                                </Form.Field>
                            </Form.Group>

                            <Button
                                color='teal'
                                fluid
                                size='large'
                                type="submit"
                            >
                                Next
                        </Button>

                        </Segment>
                    </center>
                </Form>

            </Grid.Column>
        </Grid>
    )

}

export default Registration_First;