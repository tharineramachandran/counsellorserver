import React, { useState, useEffect, useContext } from 'react';
import {
    Header, Icon, Form, Image, Message,
    Segment, Grid, Modal, Search, Button, Dimmer, Loader, Divider, List, Dropdown, Select
} from 'semantic-ui-react';
import { useForm } from "react-hook-form";

const Registration_First = ({ formData, setForm, navigation }) => {

    const {
        //FIRST REGISTRATION PAGE
        COUNSELLOR_FIRST_NAME,
        COUNSELLOR_LAST_NAME,
        COUNSELLOR_EMAIL,
        COUNSELLOR_PHONE_NUMBER,
        COUNSELLOR_COUNTRY_CODE,
        COUNSELLOR_COUNSELLING_SUBJECT_CODE,
        COUNSELLOR_COUNSELLING_LEVEL_CODE,
        COUNSELLOR_HOURLY_RATE,
        COUNSELLOR_QUALIFICATION_CODE,
        COUNSELLOR_INSTITUTION_TYPE_CODE

    } = formData;
    console.log(formData)

    const { handleSubmit, register, errors } = useForm({

    });

    const onSubmit = (data) => {
        navigation.next()
    };

    const Counsellor_Countries = [
        {
            title: "What kind of traveler are you?",
            name: [
                "Adrenaline Addicts", "Culture Lovers", "Aquatic adventures", "Beach enthusiasts"
            ],
            code: [0, 1, 2, 3]
        }
    ]

    const Counsellor_Subject = [
        {
            title: "Choose subject?",
            name: [
                "Adrenaline Addicts", "Culture Lovers", "Aquatic adventures", "Beach enthusiasts"
            ],
            code: [0, 1, 2, 3]
        }
    ]

    const Counselling_Level = [
        {
            title: "Choose Level?",
            name: [
                "Adrenaline Addicts", "Culture Lovers", "Aquatic adventures", "Beach enthusiasts"
            ],
            code: [0, 1, 2, 3]
        }
    ]

    const Counsellor_Qualification = [
        {
            title: "Choose Qualification",
            name: [
                "Adrenaline Addicts", "Culture Lovers", "Aquatic adventures", "Beach enthusiasts"
            ],
            code: [0, 1, 2, 3]
        }
    ]

    const Counsellor_Institute= [
        {
            title: "Choose Institute",
            name: [
                "Adrenaline Addicts", "Culture Lovers", "Aquatic adventures", "Beach enthusiasts"
            ],
            code: [0, 1, 2, 3]
        }
    ]


    return (

        <Grid>
            <Grid.Column>
                <Form size='small' onSubmit={handleSubmit(onSubmit)}>
                    <center>
                        <Segment stacked style={{ width: '80%', textAlign: 'left' }}>
                            <Form.Group widths='equal'>
                                <Form.Field className="CustomForm">
                                    <label>First name</label>
                                    <input
                                        fluid
                                        icon='user'
                                        iconPosition='left'
                                        placeholder='Enter your details'
                                        type='text'
                                        name="COUNSELLOR_FIRST_NAME"
                                        onChange={setForm}
                                        value={COUNSELLOR_FIRST_NAME}
                                        ref={register({ validate: COUNSELLOR_FIRST_NAME => COUNSELLOR_FIRST_NAME && COUNSELLOR_FIRST_NAME.length > 3 })}
                                    />
                                    {errors.COUNSELLOR_FIRST_NAME && <p className="customError">Username invalid</p>}
                                </Form.Field>


                                <Form.Field className="CustomForm">
                                    <label>Last name</label>
                                    <input
                                        fluid
                                        icon='user'
                                        iconPosition='left'
                                        placeholder='Enter your details'
                                        type='text'
                                        name="COUNSELLOR_LAST_NAME"
                                        onChange={setForm}
                                        value={COUNSELLOR_LAST_NAME}
                                        ref={register({ validate: COUNSELLOR_LAST_NAME => COUNSELLOR_LAST_NAME && COUNSELLOR_LAST_NAME.length > 3 })}
                                    />
                                    {errors.COUNSELLOR_LAST_NAME && <p className="customError">Username invalid</p>}
                                </Form.Field>


                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Field className="CustomForm">
                                    <label>Email</label>
                                    <input
                                        fluid
                                        icon='user'
                                        iconPosition='left'
                                        placeholder='Enter your details'
                                        type='text'
                                        name="COUNSELLOR_EMAIL"
                                        onChange={setForm}
                                        value={COUNSELLOR_EMAIL}
                                        ref={register({ validate: COUNSELLOR_EMAIL => COUNSELLOR_EMAIL && COUNSELLOR_EMAIL.length > 3 })}
                                    />
                                    {errors.COUNSELLOR_EMAIL && <p className="customError">Username invalid</p>}
                                </Form.Field>

                                <Form.Field className="CustomForm">
                                    <label>Phone number</label>
                                    <input
                                        fluid
                                        icon='user'
                                        iconPosition='left'
                                        placeholder='Enter your details'
                                        type='text'
                                        name="COUNSELLOR_PHONE_NUMBER"
                                        onChange={setForm}
                                        value={COUNSELLOR_PHONE_NUMBER}
                                        ref={register({ validate: COUNSELLOR_PHONE_NUMBER => COUNSELLOR_PHONE_NUMBER && COUNSELLOR_PHONE_NUMBER.length > 3 })}
                                    />
                                    {errors.COUNSELLOR_PHONE_NUMBER && <p className="customError">Username invalid</p>}
                                </Form.Field>

                            </Form.Group>


                            <Form.Group widths='equal'>
                                <Form.Field className="CustomForm">
                                    <label>Country of origin</label>
                                    <select name="COUNSELLOR_COUNTRY_CODE" value={COUNSELLOR_COUNTRY_CODE} onChange={setForm} placeholder="choose countrhy">
                                        {
                                            Counsellor_Countries.map((countries) => {
                                                return (
                                                    <React.Fragment>
                                                        <option disabled selected hidden>{countries.title}</option>
                                                        {
                                                            countries.name.map((name, code) => <option value={code}>{name}</option>)
                                                        }
                                                    </React.Fragment>
                                                )

                                            })
                                        }
                                    </select>
                                </Form.Field>

                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Field className="CustomForm">
                                    <label>Country of origin</label>
                                    <select name="COUNSELLOR_COUNSELLING_SUBJECT_CODE" value={COUNSELLOR_COUNSELLING_SUBJECT_CODE} onChange={setForm} placeholder="choose subject">
                                        {
                                            Counsellor_Subject.map((subjects) => {
                                                return (
                                                    <React.Fragment>
                                                        <option disabled selected hidden>{subjects.title}</option>
                                                        {
                                                            subjects.name.map((name, code) => <option value={code}>{name}</option>)
                                                        }
                                                    </React.Fragment>
                                                )

                                            })
                                        }
                                    </select>
                                </Form.Field>

                                <Form.Field className="CustomForm">
                                    <label>Country of origin</label>
                                    <select name="COUNSELLOR_COUNSELLING_LEVEL_CODE" value={COUNSELLOR_COUNSELLING_LEVEL_CODE} onChange={setForm} placeholder="choose subject">
                                        {
                                            Counselling_Level.map((level) => {
                                                return (
                                                    <React.Fragment>
                                                        <option disabled selected hidden>{level.title}</option>
                                                        {
                                                            level.name.map((name, code) => <option value={code}>{name}</option>)
                                                        }
                                                    </React.Fragment>
                                                )

                                            })
                                        }
                                    </select>
                                </Form.Field>

                            </Form.Group>

                           
                            <Form.Group widths='equal'>
                                <Form.Field className="CustomForm">
                                    <label>My Qualification</label>
                                    <input
                                        fluid
                                        icon='user'
                                        iconPosition='left'
                                        placeholder='Enter your details'
                                        type='text'
                                        name="COUNSELLOR_HOURLY_RATE"
                                        onChange={setForm}
                                        value={COUNSELLOR_HOURLY_RATE}
                                        ref={register}
                                    />
                                    <label>$</label>
                                    {/* {errors.COUNSELLOR_HOURLY_RATE && <p className="customError">Username invalid</p>} */}
                                </Form.Field>


                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Field className="CustomForm">
                                    <label>My Qualification</label>
                                    <select name="COUNSELLOR_QUALIFICATION_CODE" value={COUNSELLOR_QUALIFICATION_CODE} onChange={setForm} placeholder="choose subject">
                                        {
                                            Counsellor_Qualification.map((qualification) => {
                                                return (
                                                    <React.Fragment>
                                                        <option disabled selected hidden>{qualification.title}</option>
                                                        {
                                                            qualification.name.map((name, code) => <option value={code}>{name}</option>)
                                                        }
                                                    </React.Fragment>
                                                )

                                            })
                                        }
                                    </select>
                                </Form.Field>


                                <Form.Field className="CustomForm">
                                    <label>Institution</label>
                                    <select name="COUNSELLOR_INSTITUTION_TYPE_CODE" value={COUNSELLOR_INSTITUTION_TYPE_CODE} onChange={setForm} placeholder="choose subject">
                                        {
                                            Counsellor_Institute.map((Institute) => {
                                                return (
                                                    <React.Fragment>
                                                        <option disabled selected hidden>{Institute.title}</option>
                                                        {
                                                            Institute.name.map((name, code) => <option value={code}>{name}</option>)
                                                        }
                                                    </React.Fragment>
                                                )

                                            })
                                        }
                                    </select>
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
        </Grid >
    )

}

export default Registration_First;