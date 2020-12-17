import React, { useState, useEffect, useContext } from 'react';
import {
    Header, Icon, Form, Image, Message, Table,
    Segment, Grid, Modal, Search, Button, Dimmer, Loader, Label, Container, Breadcrumb, Divider, Popup, List, Dropdown, Select, Tab, TableHeader
} from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import _AxiosInstance from '../../../../Store/_AxiosInstance'

import { ToastContainer, toast } from 'react-toastify';
import { baseURLAPI, baseURL } from "../../../../Global";
const axios = require('axios');
const Edit_First = ({ formData, setForm, navigation, step }) => {
    const [firstboxError, setfirstboxError] = useState([]);
    const [secondboxError, setsecondboxError] = useState([]);
    const [thirdboxError, setthirdboxError] = useState([]);
    const [fourthboxError, setfourthboxError] = useState([]);
    const [fifthboxError, setfifthboxError] = useState([]);
    const [sixthboxError, setsixthboxError] = useState([]);
    const [seventhboxError, setseventhboxError] = useState([]);
    const [eighthboxError, seeighthboxError] = useState([]);
    const {
        //FIRST REGISTRATION PAGE 
        COUNSELLOR_FIRST_NAME,
        COUNSELLOR_LAST_NAME,
        COUNSELLOR_EMAIL,
        COUNSELLOR_PHONE_NUMBER,
        COUNSELLOR_COUNTRY_CODE,
        COUNSELLOR_COUNSELLING_SUBJECT_ID,
        COUNSELLOR_HOURLY_RATE,
        COUNSELLOR_QUALIFICATION_INSTITUTE,
        COUNSELLOR_COUNSELLING_DETAILS, COUNSELLOR_EXISTING_QUALIFICATION_INSTITUTE,
        COUNSELLOR_EXISTING_COUNSELLING_DETAILS

    } = formData;
    console.log(formData)

    const [icon_name, setIcon_name] = useState('circle');
    const [EXISTING_COUNSELLING_DETAILS, setEXISTING_COUNSELLING_DETAILS] = useState();

    const [EXISTING_QUALIFICATION_INSTITUTE, setEXISTING_QUALIFICATION_INSTITUTE] = useState();
    const { handleSubmit, register, errors } = useForm({});
    const [WS_Countries, setWS_Countries] = useState({});
    const [WS_Institutes, setWS_Institutes] = useState({});
    const [WS_Qualifications, setWS_Qualifications] = useState({});
    const [WS_Counselling_Subjects, setWS_Counselling_Subjects] = useState({});
    const [WS_Counselling_Levels, setWS_Counselling_Levels] = useState({});
    const [inputQualificationList, setInputQualificationList] = useState([{ CT_QUALIFICATION_CODE: "", CT_INSTITUTE_CODE: "", CT_QUALIFICATION_NAME: "", CT_INSTITUTE_NAME: "" }]);
    const [inputCounsellingDetailsList, setInputCounsellingDetailsList] = useState([{
        CT_COUNSELLING_SUBJECT_CODE: "", CT_COUNSELLING_LEVEL_CODE: "", COUNSELLOR_HOURLY_RATE: "",
        CT_COUNSELLING_SUBJECT_NAME: "", CT_COUNSELLING_LEVEL_NAME: ""
    }]);

    useEffect(() => {
        _AxiosInstance.get('form/list')
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

        axios.get(baseURLAPI + '/Counsellor/info/' + localStorage.userID, {
            headers: {
                jwtToken: localStorage.jwtToken
            },
            data: {
                userID: localStorage.userID

            }
        })
            .then(res => {
                console.log(res.data)
                var counsellor = res.data.counsellor;
                console.log(counsellor.details[0])

                var e = {
                    target: {
                        name: "COUNSELLOR_FIRST_NAME",
                        value: counsellor.details[0].CT_FIRST_NAME
                    }
                };
                setForm(e);
                var e = {
                    target: {
                        name: "COUNSELLOR_COUNTRY_CODE",
                        value: counsellor.details[0].CT_COUNTRY_CODE
                    }
                };
                setForm(e);
                e = {
                    target: {
                        name: "COUNSELLOR_LAST_NAME",
                        value: counsellor.details[0].CT_LAST_NAME
                    }
                };
                setForm(e);
                e = {
                    target: {
                        name: "COUNSELLOR_EMAIL",
                        value: counsellor.details[0].CT_EMAIL
                    }
                };
                setForm(e);
                e = {
                    target: {
                        name: "COUNSELLOR_PHONE_NUMBER",
                        value: counsellor.details[0].CT_PHONE_NUMBER
                    }
                };
                setForm(e);
                var education = counsellor.counselling_education;
                let new_educ = []

                for (var i = 0; i < education.length; i++) {
                    console.log();
                    var edu_obj = {

                        CT_INSTITUTE_CODE: education[i].ct_institute_code,
                        CT_INSTITUTE_NAME: education[i].ct_institute_name,
                        CT_QUALIFICATION_CODE: education[i].ct_qualification_code,
                        CT_QUALIFICATION_NAME: education[i].ct_qualification_name,
                    };

                    new_educ.push(edu_obj);
                }
                e = {
                    target: {
                        name: "COUNSELLOR_QUALIFICATION_INSTITUTE",
                        value: new_educ
                    }
                };
                setForm(e);

                e = {
                    target: {
                        name: "COUNSELLOR_EXISTING_QUALIFICATION_INSTITUTE",
                        value: new_educ
                    }
                };
                setForm(e);
                setEXISTING_QUALIFICATION_INSTITUTE(new_educ);
                setInputQualificationList(new_educ);

                var counselling_details = counsellor.counselling_details;
                let new_counselling_details = []

                for (var i = 0; i < counselling_details.length; i++) {
                    console.log();
                    var new_counselling_details_obj = {

                        CT_COUNSELLING_LEVEL_CODE: counselling_details[i].ct_counselling_level_code,
                        CT_COUNSELLING_LEVEL_NAME: counselling_details[i].ct_counselling_level_name,
                        CT_COUNSELLING_SUBJECT_NAME: counselling_details[i].ct_counselling_subject_name,
                        CT_COUNSELLING_SUBJECT_CODE: counselling_details[i].ct_counselling_subject_code,

                        COUNSELLOR_HOURLY_RATE: parseInt(counselling_details[i].ct_counsellor_hourly_rate)
                    };

                    new_counselling_details.push(new_counselling_details_obj);
                }


                e = {
                    target: {
                        name: "COUNSELLOR_EXISTING_COUNSELLING_DETAILS",
                        value: new_counselling_details
                    }
                };
                setForm(e);
                e = {
                    target: {
                        name: "COUNSELLOR_COUNSELLING_DETAILS",
                        value: new_counselling_details
                    }
                };
                setForm(e);
                setInputCounsellingDetailsList(new_counselling_details);
                setEXISTING_COUNSELLING_DETAILS(new_counselling_details);

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

    }, [])

    // handle input change
    const handleInputChangeForQualification = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputQualificationList];
        list[index][name] = value;
        console.log(WS_Qualifications);

        if (name == "CT_QUALIFICATION_CODE") {
            var CT_QUALIFICATION_NAME = WS_Qualifications.find(x => x.CT_QUALIFICATION_CODE === value).CT_QUALIFICATION_NAME;

            list[index]["CT_QUALIFICATION_NAME"] = CT_QUALIFICATION_NAME;

        }

        if (name == "CT_INSTITUTE_CODE") {
            var CT_INSTITUTE_NAME = WS_Institutes.find(x => x.CT_INSTITUTE_CODE === value).CT_INSTITUTE_NAME;
            list[index]["CT_INSTITUTE_NAME"] = CT_INSTITUTE_NAME;
        } setInputQualificationList(list);
        console.log(checkQualificationInstitute(list[index], list));
        if (checkQualificationInstitute(list[index], list, index)) {
            var updated = COUNSELLOR_EXISTING_QUALIFICATION_INSTITUTE.concat(list);

            var e = {
                target: {
                    name: "COUNSELLOR_EXISTING_QUALIFICATION_INSTITUTE",
                    value: updated
                }
            };
            setForm(e);
            setEXISTING_QUALIFICATION_INSTITUTE(updated);

        }
    };
    const checkQualificationInstitute = (add, list, index) => {
        var errorlist = [];
        console.log("ss");
        console.log(add);
        if (add.CT_INSTITUTE_NAME && add.CT_QUALIFICATION_NAME) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].CT_INSTITUTE_CODE == add.CT_INSTITUTE_CODE && list[i].CT_QUALIFICATION_CODE == add.CT_QUALIFICATION_CODE && index != i) {
                    errorlist.push("you have already added this qualification");
                    console.log("you have already added this qualification");
                    return false;

                }
            }
            console.log("true");
            if (errorlist.length > 0) { return false; } else { return true }

        } else { console.log("false"); return false; }

    }


    const checkCounsellingDetails = (add, list, index, name) => {
        var errorlist = [];
        console.log("ss");
        console.log(add);
        if (name === "COUNSELLOR_HOURLY_RATE") {

        }
        else { }
        if (add.CT_COUNSELLING_LEVEL_NAME && add.CT_COUNSELLING_SUBJECT_NAME && add.COUNSELLOR_HOURLY_RATE) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].CT_COUNSELLING_LEVEL_CODE == add.CT_COUNSELLING_LEVEL_CODE && list[i].CT_COUNSELLING_SUBJECT_CODE == add.CT_COUNSELLING_SUBJECT_CODE && index != i) {
                    errorlist.push("you have already added this qualification");
                    console.log("you have already added this qualification");
                    return false;

                }
            }
            console.log("true");
            if (errorlist.length > 0) { return false; } else { return true }

        } else { console.log("false"); return false; }

    }

    // handle click event of the Remove button
    const handleRemoveClickForQualification = index => {
        const list = [...inputQualificationList];
        list.splice(index, 1);
        setInputQualificationList(list);
    };

    // handle click event of the Add button
    const handleAddClickForQualification = () => {
        setInputQualificationList([...inputQualificationList, { CT_QUALIFICATION_CODE: "", CT_INSTITUTE_CODE: "", CT_QUALIFICATION_NAME: "", CT_INSTITUTE_NAME: "" }]);
    };


    // handle input change
    const handleInputChangeForCounselling = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputCounsellingDetailsList];
        list[index][name] = value;
        if (name == "CT_COUNSELLING_LEVEL_CODE") {
            var CT_COUNSELLING_LEVEL_NAME = WS_Counselling_Levels.find(x => x.CT_COUNSELLING_LEVEL_CODE === value).CT_COUNSELLING_LEVEL_NAME;
            list[index]["CT_COUNSELLING_LEVEL_NAME"] = CT_COUNSELLING_LEVEL_NAME;

        }

        if (name == "CT_COUNSELLING_SUBJECT_CODE") {
            var CT_COUNSELLING_SUBJECT_NAME = WS_Counselling_Subjects.find(x => x.CT_COUNSELLING_SUBJECT_CODE === value).CT_COUNSELLING_SUBJECT_NAME;
            list[index]["CT_COUNSELLING_SUBJECT_NAME"] = CT_COUNSELLING_SUBJECT_NAME;
        }


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
            CT_COUNSELLING_SUBJECT_CODE: "", CT_COUNSELLING_LEVEL_CODE: "", COUNSELLOR_HOURLY_RATE: ""
        }]);
    };
    const handleRemoveClickForExistingQualification = (i) => {
        var updated = COUNSELLOR_EXISTING_QUALIFICATION_INSTITUTE;
        updated.splice(i, 1);
        console.log(updated);
        var e = {
            target: {
                name: "COUNSELLOR_EXISTING_QUALIFICATION_INSTITUTE",
                value: updated
            }
        };
        setForm(e);

        setEXISTING_QUALIFICATION_INSTITUTE(updated);

    };

    const handleRemoveClickForExistingCounselling = (i) => {
        var updated = COUNSELLOR_EXISTING_COUNSELLING_DETAILS;
        updated.splice(i, 1);
        console.log(updated);
        var e = {
            target: {
                name: "COUNSELLOR_EXISTING_COUNSELLING_DETAILS",
                value: updated
            }
        };
        setForm(e);

        setEXISTING_COUNSELLING_DETAILS(updated);

    };




    const _handleSubmitClick = async () => {

        var firstString = [];
        var secondString = [];
        var thirdString = [];
        var fourthString = [];
        var fifthString = [];
        var sixthString = [];
        var seventhString = [];
        var eightString = [];

        axios.post(`http://localhost:5000/Counsellor/UpdateDetails`, { formData: formData, COUNSELLORID: localStorage.userID })
            .then(res => {
                console.log(res);
                console.log(res.data);

                toast.success('Counsellee update  of counsellor', {
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
                    var list = error.response.data; // => the response payload 
                    toast.error('Unsuccessful update of counsellor', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: '',
                    });

                    list.forEach(DisplayValidation);
                    console.log(firstString);
                    setfirstboxError(firstString);
                    setsecondboxError(secondString);
                    setthirdboxError(thirdString);
                    setfourthboxError(fourthString);
                    setfifthboxError(fifthString);
                    setsixthboxError(sixthString);
                    setseventhboxError(seventhString);

                    function DisplayValidation(item, index) {


                        if (item.error == "COUNSELLOR_FIRST_NAME" || item.error == "COUNSELLOR_LAST_NAME" || item.error == "COUNSELLOR_COUNTRY_CODE" || item.error == "COUNSELLOR_EMAIL" || item.error == "COUNSELLOR_PHONE_NUMBER") {
                            firstString.push(item.message);

                        }

                        if (item.error == "COUNSELLOR_QUALIFICATION_INSTITUTE") {
                            secondString.push(item.message);

                        }
                        if (item.error == "COUNSELLOR_COUNSELLING_DETAILS") {
                            thirdString.push(item.message);

                        }

                    }


                }
            });

    }


    return (
        <React.Fragment>
            <Grid>
                <Grid.Column>
                    <Form  >
                        <center>
                            <Segment inverted color='teal' size="mini" style={{ width: '85%', textAlign: 'center' }}>
                                <Container>
                                    
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
                                            <Label as='a' className="activeBreadCrumb"circular onClick={() => navigation.go(6)}>
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
                                            <center>
                                                <div style={{ width: '100%', textAlign: 'left' }}>
                                                    <Label as='a' color='blue' ribbon>
                                                        Personal Details
                                        </Label>
                                                </div>
                                                <br />   {firstboxError.length > 0 && (
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

                                                            {secondboxError.length > 0 && (
                                                                <Form.Group widths='equal'>
                                                                    <Form.Field className="CustomForm">
                                                                        <Message negative style={{ padding: '0.5rem' }}>
                                                                            {secondboxError.map((firstStringmessage, index) => (
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
                                                            {thirdboxError.length > 0 && (
                                                                <Form.Group widths='equal'>
                                                                    <Form.Field className="CustomForm">
                                                                        <Message negative style={{ padding: '0.5rem' }}>
                                                                            {thirdboxError.map((firstStringmessage, index) => (
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
                                                                        name="CT_COUNSELLING_LEVEL_CODE"
                                                                        value={x.CT_COUNSELLING_LEVEL_CODE}
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
                                            </center> <Button className="appBanner" color='blue' onClick={_handleSubmitClick}>
                                                <Icon name='send' className="appBanner" /> Update Details &nbsp;&nbsp;
                                    </Button> &nbsp;&nbsp;&nbsp;
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

export default Edit_First;