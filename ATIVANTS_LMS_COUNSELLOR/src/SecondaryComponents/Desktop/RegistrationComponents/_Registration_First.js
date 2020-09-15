import React, { useState, useEffect, useContext } from 'react';
import {
    Header, Icon, Form, Image, Message,
    Segment, Grid, Modal, Search, Button, Dimmer, Loader, Label, Container, Breadcrumb, Divider, Popup, List, Dropdown, Select
} from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import _AxiosInstance from '../../../Store/_AxiosInstance'

const Registration_First = ({ formData, setForm, navigation, step }) => {

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
        COUNSELLOR_INSTITUTION_TYPE_CODE,
        COUNSELLOR_QUALIFICATION_INSTITUTE

    } = formData;
    console.log(formData)

    const [icon_name, setIcon_name] = useState('circle');

    const { handleSubmit, register, errors } = useForm({});
    const [WS_Countries, setWS_Countries] = useState({});
    const [WS_Institutes, setWS_Institutes] = useState({});
    const [WS_Qualifications, setWS_Qualifications] = useState({});
    const [QualificationList, setQualificationList] = useState([]);
    const [inputList, setInputList] = useState([{ CT_QUALIFICATION_CODE: "", CT_INSTITUTE_CODE: "" }]);



    useEffect(() => {
        _AxiosInstance.get('Selectlist')
            .then(res => {
                console.log(res.data)
                const countries = res.data['COUNTRIES'];
                const institutes = res.data['INSTITUTES'];
                const qualifications = res.data['QUALIFICATIONS'];
                setWS_Countries(countries);
                setWS_Institutes(institutes);
                setWS_Qualifications(qualifications);
            })
            .catch(err => {

            })

        return () => {
            console.log("cleaned up state...");
            setWS_Countries({});
            setWS_Qualifications({});
            setWS_Institutes({});
            console.log(WS_Countries);
        };

    }, []);


    const addQualification = () => {

    }

    let countriesList = WS_Countries.length > 0 && WS_Countries.map((item, i) => {
        return (
            <>
                <option key={item.ID} value={item.CT_COUNTRY_CODE}>{item.CT_COUNTRY_NAME}</option>
            </>
        )
    }, this);


    let qualificationsList = WS_Qualifications.length > 0 && WS_Qualifications.map((item, i) => {
        return (
            <>
                <option key={item.ID} value={item.CT_QUALIFICATION_CODE}>{item.CT_QUALIFICATION_NAME}</option>
            </>
        )
    }, this);

    let instituteList = WS_Institutes.length > 0 && WS_Institutes.map((item, i) => {
        return (
            <>
                <option key={item.ID} value={item.CT_INSTITUTE_CODE}>{item.CT_INSTITUTE_NAME}</option>
            </>
        )
    }, this);

    const onSubmit = (data) => {

        navigation.next();
    };

    useEffect(() => {

        const e = {
            target: {
                name: "COUNSELLOR_QUALIFICATION_INSTITUTE",
                value: inputList
            }
        };
        setForm(e);

    }, [inputList])

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

    const Counsellor_Institute = [
        {
            title: "Choose Institute",
            name: [
                "Adrenaline Addicts", "Culture Lovers", "Aquatic adventures", "Beach enthusiasts"
            ],
            code: [0, 1, 2, 3]
        }
    ]


    useEffect(() => {
        if (step.id == 'Counsellor_details')
            setIcon_name('circle')
        else
            setIcon_name('circle outline')

    }, [])

    useEffect(() => {
        if (COUNSELLOR_QUALIFICATION_INSTITUTE) {
            console.log(COUNSELLOR_QUALIFICATION_INSTITUTE)
            // setInputList({ CT_QUALIFICATION_CODE: COUNSELLOR_QUALIFICATION_INSTITUTE, CT_INSTITUTE_CODE: "" }COUNSELLOR_QUALIFICATION_INSTITUTE)
        }
    }, [])

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { CT_QUALIFICATION_CODE: "", CT_INSTITUTE_CODE: "" }]);
    };

    console.log(formData);

    return (
        <React.Fragment>
            <Grid>
                <Grid.Column>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <center>
                            <Segment inverted color='teal' size="mini" style={{ width: '85%', textAlign: 'center' }}>
                                <Container>
                                    <div style={{ float: 'left', marginLeft: '2rem' }}>
                                        <h4>Registation for Counsellor</h4>
                                    </div>
                                    <div style={{ float: 'right', padding: '1rem;' }}>
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
                                                <Label as='a' circular onClick={() => navigation.go(0)}>
                                                    <Icon name={icon_name} />
                                                Personal Details&nbsp;
                                            </Label>
                                                <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(1)}>
                                                    <Icon name="circle outline" />
                                                Profile Photo&nbsp;
                                            </Label>
                                                <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(2)}>
                                                    <Icon name="circle outline" />
                                                Description&nbsp;
                                            </Label>
                                                <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(3)}>
                                                    <Icon name="circle outline" />
                                                Video&nbsp;
                                            </Label>
                                            </List.Item>
                                        </List>
                                    </div>
                                </Container>
                                <div style={{ width: '100%' }}>
                                    <center>
                                        <Segment style={{ width: '95%' }}>
                                            <center>
                                                <div style={{ width: '100%', textAlign: 'left' }}>
                                                    <Label as='a' color='blue' ribbon>
                                                        Personal Details
                                        </Label>
                                                </div>
                                                <br />
                                                <Form.Group widths='equal'>

                                                    <Form.Field className="CustomForm">
                                                        <Icon name="user" className="customIconsAlign" />
                                    &nbsp;&nbsp;&nbsp;
                                    <input
                                                            placeholder='First Name'
                                                            type='text'
                                                            name="COUNSELLOR_FIRST_NAME"
                                                            onChange={setForm}
                                                            value={COUNSELLOR_FIRST_NAME}
                                                        // ref={register({ validate: COUNSELLOR_FIRST_NAME => COUNSELLOR_FIRST_NAME && COUNSELLOR_FIRST_NAME.length > 3 })}
                                                        />
                                                        {errors.COUNSELLOR_FIRST_NAME && <p className="customError">Username invalid</p>}
                                                    </Form.Field>


                                                    <Form.Field className="CustomForm">
                                                        <Icon name="user" className="customIconsAlign" />
                                &nbsp;&nbsp;&nbsp;
                                    <input
                                                            fluid
                                                            icon='user'
                                                            iconPosition='left'
                                                            placeholder='Last Name'
                                                            type='text'
                                                            name="COUNSELLOR_LAST_NAME"
                                                            onChange={setForm}
                                                            value={COUNSELLOR_LAST_NAME}
                                                        // ref={register({ validate: COUNSELLOR_LAST_NAME => COUNSELLOR_LAST_NAME && COUNSELLOR_LAST_NAME.length > 3 })}
                                                        />
                                                        {errors.COUNSELLOR_LAST_NAME && <p className="customError">Username invalid</p>}
                                                    </Form.Field>


                                                </Form.Group>

                                                <Form.Group widths='equal'>
                                                    <Form.Field className="CustomForm">
                                                        <Icon name="user" className="customIconsAlign" />
                                &nbsp;&nbsp;&nbsp;
                                    <input
                                                            fluid
                                                            icon='user'
                                                            iconPosition='left'
                                                            placeholder='Email'
                                                            type='text'
                                                            name="COUNSELLOR_EMAIL"
                                                            onChange={setForm}
                                                            value={COUNSELLOR_EMAIL}
                                                        // ref={register({ validate: COUNSELLOR_EMAIL => COUNSELLOR_EMAIL && COUNSELLOR_EMAIL.length > 3 })}
                                                        />
                                                        {errors.COUNSELLOR_EMAIL && <p className="customError">Username invalid</p>}
                                                    </Form.Field>

                                                    <Form.Field className="CustomForm">
                                                        <Icon name="user" className="customIconsAlign" />
                                                        &nbsp;&nbsp;&nbsp;
                                                        <input
                                                            fluid
                                                            placeholder='Phone number'
                                                            type='text'
                                                            name="COUNSELLOR_PHONE_NUMBER"
                                                            onChange={setForm}
                                                            value={COUNSELLOR_PHONE_NUMBER}
                                                        // ref={register({ validate: COUNSELLOR_PHONE_NUMBER => COUNSELLOR_PHONE_NUMBER && COUNSELLOR_PHONE_NUMBER.length > 3 })}
                                                        />
                                                        {errors.COUNSELLOR_PHONE_NUMBER && <p className="customError">Username invalid</p>}
                                                    </Form.Field>

                                                </Form.Group>


                                                <Form.Group widths='equal'>
                                                    <Form.Field className="CustomForm">
                                                        <Icon name="user" className="customIconsAlign" />
                                                        &nbsp;&nbsp;&nbsp;
                                                        <select name="COUNSELLOR_COUNTRY_CODE" value={COUNSELLOR_COUNTRY_CODE} onChange={setForm} placeholder="select your country">
                                                            <option selected hidden>Select your country</option>
                                                            {countriesList}
                                                        </select>
                                                    </Form.Field>

                                                    <Form.Field>
                                                    </Form.Field>

                                                </Form.Group>
                                                <br />
                                                <div style={{ width: '100%', textAlign: 'left' }}>
                                                    <Label as='a' color='blue' ribbon>
                                                        Educational details
                                   </Label>
                                                </div>
                                                <Form.Group widths='equal'>
                                                    {inputList.map((x, i) => {
                                                        return (
                                                            <React.Fragment>
                                                                <Form.Field className="CustomForm">
                                                                    <Icon name="user" className="customIconsAlign" />
                                                        &nbsp;&nbsp;&nbsp;
                                                                <select
                                                                        name="CT_QUALIFICATION_CODE"
                                                                        value={x.CT_QUALIFICATION_CODE}
                                                                        onChange={(e) => handleInputChange(e, i)}
                                                                        placeholder="select your Qualification"
                                                                    >
                                                                        <option selected hidden>Select Your Qualification</option>
                                                                        {qualificationsList}
                                                                    </select>
                                                                </Form.Field>
                                                                <Form.Field className="CustomForm">
                                                                    <Icon name="user" className="customIconsAlign" />
                                                                    &nbsp;&nbsp;&nbsp;
                                                                    <select
                                                                        name="CT_INSTITUTE_CODE"
                                                                        value={x.CT_INSTITUTE_CODE}
                                                                        onChange={(e) => handleInputChange(e, i)}
                                                                        placeholder="select your Institute"
                                                                    >
                                                                        <option selected hidden>
                                                                            Select your institute
                                                                </option>
                                                                        {instituteList}
                                                                    </select>
                                                                </Form.Field>
                                                                <br />
                                                                <br/>
                                                                <div style={{ textAlign: 'left'}}>
                                                                    {inputList.length !== 1 && (
                                                                        <Label as="a" onClick={() => handleRemoveClick(i)} circular style={{ marginRight: '10px' }}>
                                                                            <Icon name='remove' style={{ margin: '0px' }} />
                                                                        </Label>
                                                                    )}

                                                                    {inputList.length - 1 === i && (
                                                                        <Label as="a" onClick={handleAddClick} circular style={{ marginRight: '10px' }}>
                                                                            <Icon name='add' style={{ margin: '0px' }} />
                                                                        </Label>
                                                                    )}
                                                                </div>
                                                            </React.Fragment>
                                                        );
                                                    })}
                                                </Form.Group>



                                                <br />
                                                <div style={{ width: '100%', textAlign: 'left' }}>
                                                    <Label as='a' color='blue' ribbon>
                                                        Counselling details
                            </Label>
                                                </div>
                                                <br />
                                                <Form.Group widths='equal'>
                                                    <Form.Field className="CustomForm">
                                                        <Icon name="user" className="customIconsAlign" />
                                &nbsp;&nbsp;&nbsp;
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
                                                        <Icon name="user" className="customIconsAlign" />
                                &nbsp;&nbsp;&nbsp;
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
                                                    <Form.Field className="CustomForm">
                                                        <Icon name="user" className="customIconsAlign" />
                                    &nbsp;&nbsp;&nbsp;
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
                                    $
                                    {/* {errors.COUNSELLOR_HOURLY_RATE && <p className="customError">Username invalid</p>} */}
                                                    </Form.Field>

                                                </Form.Group>
                                            </center>
                                        </Segment>
                                    </center>
                                </div>
                            </Segment>
                        </center>
                    </Form>

                </Grid.Column>
            </Grid >
        </React.Fragment>
    )

}

export default Registration_First;