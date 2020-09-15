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
        COUNSELLOR_HOURLY_RATE,
        COUNSELLOR_QUALIFICATION_INSTITUTE,
        COUNSELLOR_COUNSELLING_DETAILS

    } = formData;
    console.log(formData)

    const [icon_name, setIcon_name] = useState('circle');

    const { handleSubmit, register, errors } = useForm({});
    const [WS_Countries, setWS_Countries] = useState({});
    const [WS_Institutes, setWS_Institutes] = useState({});
    const [WS_Qualifications, setWS_Qualifications] = useState({});
    const [WS_Counselling_Subjects, setWS_Counselling_Subjects] = useState({});
    const [WS_Counselling_Levels, setWS_Counselling_Levels] = useState({});
    const [inputQualificationList, setInputQualificationList] = useState([{ CT_QUALIFICATION_CODE: "", CT_INSTITUTE_CODE: "" }]);
    const [inputCounsellingDetailsList, setInputCounsellingDetailsList] = useState([{
        CT_COUNSELLING_SUBJECT_CODE: "", COUNSELLOR_COUNSELLING_LEVEL: "", COUNSELLOR_HOURLY_RATE: ""
    }]);

    useEffect(() => {
        _AxiosInstance.get('Selectlist')
            .then(res => {
                console.log(res.data)
                const countries = res.data['COUNTRIES'];
                const institutes = res.data['INSTITUTES'];
                const qualifications = res.data['QUALIFICATIONS'];
                const counselling_subjects = res.data['COUNSELLING_SUBJECTS'];
                const counselling_levels = res.data['COUNSELLING_LEVELS'];
                setWS_Countries(countries);
                setWS_Institutes(institutes);
                setWS_Qualifications(qualifications);
                setWS_Counselling_Subjects(counselling_subjects);
                setWS_Counselling_Levels(counselling_levels);
            })
            .catch(err => {

            })

        return () => {
            console.log("cleaned up state...");
            setWS_Countries({});
            setWS_Qualifications({});
            setWS_Institutes({});
            setWS_Counselling_Subjects({});
            setWS_Counselling_Levels({});
            console.log(WS_Countries);
        };

    }, []);

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

    let counselling_subject_list = WS_Counselling_Subjects.length > 0 && WS_Counselling_Subjects.map((item, i) => {
        return (
            <>
                <option key={item.ID} value={item.CT_COUNSELLING_SUBJECT_CODE}>{item.CT_COUNSELLING_SUBJECT_NAME}</option>
            </>
        )
    }, this);

    let counselling_level_list = WS_Counselling_Levels.length > 0 && WS_Counselling_Levels.map((item, i) => {
        return (
            <>
                <option key={item.ID} value={item.CT_COUNSELLING_LEVEL_CODE}>{item.CT_COUNSELLING_LEVEL_NAME}</option>
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
                value: inputQualificationList
            }
        };
        setForm(e);

    }, [inputQualificationList])

    useEffect(() => {

        const e = {
            target: {
                name: "COUNSELLOR_COUNSELLING_DETAILS",
                value: inputCounsellingDetailsList
            }
        };
        setForm(e);

    }, [inputCounsellingDetailsList])

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
        if (COUNSELLOR_QUALIFICATION_INSTITUTE.length > 0) {
            setInputQualificationList(COUNSELLOR_QUALIFICATION_INSTITUTE)
        }

        if (COUNSELLOR_COUNSELLING_DETAILS.length > 0) {
            setInputCounsellingDetailsList(COUNSELLOR_COUNSELLING_DETAILS)
        }

    }, [])

    useEffect(() => {

    },[])

    // handle input change
    const handleInputChangeForQualification = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputQualificationList];
        list[index][name] = value;
        setInputQualificationList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClickForQualification = index => {
        const list = [...inputQualificationList];
        list.splice(index, 1);
        setInputQualificationList(list);
    };

    // handle click event of the Add button
    const handleAddClickForQualification = () => {
        setInputQualificationList([...inputQualificationList, { CT_QUALIFICATION_CODE: "", CT_INSTITUTE_CODE: "" }]);
    };


    // handle input change
    const handleInputChangeForCounselling = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputCounsellingDetailsList];
        list[index][name] = value;
        setInputCounsellingDetailsList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClickForCounselling = index => {
        const list = [...inputCounsellingDetailsList];
        list.splice(index, 1);
        setInputCounsellingDetailsList(list);
    };

    // handle click event of the Add button
    const handleAddClickForCounselling = () => {
        setInputCounsellingDetailsList([...inputCounsellingDetailsList, {
            CT_COUNSELLING_SUBJECT_CODE: "", COUNSELLOR_COUNSELLING_LEVEL: "", COUNSELLOR_HOURLY_RATE: ""
        }]);
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
                                                        <Icon name="mail" className="customIconsAlign" />
                                &nbsp;&nbsp;&nbsp;
                                    <input

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
                                                        <Icon name="phone" className="customIconsAlign" />
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
                                                        <Icon name="world" className="customIconsAlign" />
                                                        &nbsp;&nbsp;&nbsp;
                                                        <select className="" name="COUNSELLOR_COUNTRY_CODE" value={COUNSELLOR_COUNTRY_CODE} onChange={setForm} placeholder="select your country">
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
                                                <br />

                                                {inputQualificationList.map((x, i) => {
                                                    return (
                                                        <React.Fragment>
                                                            <Form.Group widths='equal'>
                                                                <Form.Field className="CustomForm">
                                                                    <Icon name="graduation" className="customIconsAlign" />
                                                                 &nbsp;&nbsp;&nbsp;
                                                                <select
                                                                        name="CT_QUALIFICATION_CODE"
                                                                        value={x.CT_QUALIFICATION_CODE}
                                                                        onChange={(e) => handleInputChangeForQualification(e, i)}
                                                                        placeholder="select your Qualification"
                                                                    >
                                                                        <option selected hidden>Select Your Qualification</option>
                                                                        {qualificationsList}
                                                                    </select>
                                                                </Form.Field>
                                                                <Form.Field className="CustomForm">
                                                                    <Icon name="university" className="customIconsAlign" />
                                                                    &nbsp;&nbsp;&nbsp;
                                                                    <select
                                                                        name="CT_INSTITUTE_CODE"
                                                                        value={x.CT_INSTITUTE_CODE}
                                                                        onChange={(e) => handleInputChangeForQualification(e, i)}
                                                                        placeholder="select your Institute"
                                                                    >
                                                                        <option selected hidden>
                                                                            Select your institute
                                                                </option>
                                                                        {instituteList}
                                                                    </select>
                                                                </Form.Field>
                                                            </Form.Group>
                                                            <div style={{ textAlign: 'left', width: '84%' }}>
                                                                {inputQualificationList.length !== 1 && (
                                                                    <Label as="a" onClick={() => handleRemoveClickForQualification(i)} circular style={{ marginRight: '10px' }}>
                                                                        <Icon color="red" name='remove' style={{ margin: '0px' }} />
                                                                    </Label>
                                                                )}

                                                                {inputQualificationList.length - 1 === i && (
                                                                    <Label as="a" onClick={handleAddClickForQualification} circular style={{ marginRight: '10px' }}>
                                                                        <Icon color="green" name='plus' style={{ margin: '0px' }} />
                                                                    </Label>
                                                                )}
                                                            </div>

                                                        </React.Fragment>
                                                    );
                                                })}

                                                <br />
                                                <div style={{ width: '100%', textAlign: 'left' }}>
                                                    <Label as='a' color='blue' ribbon>
                                                        Counselling details
                                            </Label>
                                                </div>
                                                <br />

                                                {inputCounsellingDetailsList.map((x, i) => {
                                                    return (

                                                        <React.Fragment>
                                                            <Form.Group widths='equal'>
                                                                <Form.Field className="CustomForm">
                                                                    <Icon name="graduation" className="customIconsAlign" />
                                                                 &nbsp;&nbsp;&nbsp;
                                                                <select
                                                                        name="CT_COUNSELLING_SUBJECT_CODE"
                                                                        value={x.CT_COUNSELLING_SUBJECT_CODE}
                                                                        onChange={(e) => handleInputChangeForCounselling(e, i)}
                                                                        placeholder=""
                                                                    >
                                                                        <option selected hidden>My Counselling Subjects(s)</option>
                                                                        {counselling_subject_list}
                                                                    </select>
                                                                </Form.Field>
                                                                <Form.Field className="CustomForm">
                                                                    <Icon name="university" className="customIconsAlign" />
                                                                    &nbsp;&nbsp;&nbsp;
                                                                    <select
                                                                        name="COUNSELLOR_COUNSELLING_LEVEL"
                                                                        value={x.COUNSELLOR_COUNSELLING_LEVEL}
                                                                        onChange={(e) => handleInputChangeForCounselling(e, i)}
                                                                        placeholder=""
                                                                    >
                                                                        <option selected hidden>
                                                                            Choose your level
                                                                </option>
                                                                        {counselling_level_list}
                                                                    </select>
                                                                </Form.Field>
                                                                <Form.Field className="CustomForm">
                                                                    <Icon name="user" className="customIconsAlign" />
                                                                        &nbsp;&nbsp;&nbsp;
                                                                        <input
                                                                        iconPosition='left'
                                                                        placeholder='Hourly rate'
                                                                        type='text'
                                                                        name="COUNSELLOR_HOURLY_RATE"
                                                                        onChange={(e) => handleInputChangeForCounselling(e, i)}
                                                                        value={x.COUNSELLOR_HOURLY_RATE}

                                                                    />
                                                                </Form.Field>
                                                                 $
                                                            </Form.Group>
                                                            <div style={{ textAlign: 'left', width: '84%' }}>
                                                                {inputCounsellingDetailsList.length !== 1 && (
                                                                    <Label as="a" onClick={() => handleRemoveClickForCounselling(i)} circular style={{ marginRight: '10px' }}>
                                                                        <Icon color="red" name='remove' style={{ margin: '0px' }} />
                                                                    </Label>
                                                                )}

                                                                {inputCounsellingDetailsList.length - 1 === i && (
                                                                    <Label as="a" onClick={handleAddClickForCounselling} circular style={{ marginRight: '10px' }}>
                                                                        <Icon color="green" name='plus' style={{ margin: '0px' }} />
                                                                    </Label>
                                                                )}
                                                            </div>

                                                        </React.Fragment>
                                                    );
                                                })}
                                            </center>
                                        </Segment>
                                    </center>
                                </div>
                            </Segment>
                        </center>
                    </Form>

                </Grid.Column>
            </Grid >
        </React.Fragment >
    )

}

export default Registration_First;