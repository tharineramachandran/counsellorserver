import React, { useState, useEffect, useContext } from 'react';
import {
    Header, Icon, Form, Image, Message,
    Segment, Grid, Modal, Search, Button, Dimmer, Loader, Input, Container, List, Label, Divider, Item, Dropdown, Select, Checkbox
} from 'semantic-ui-react';

import { useForm } from "react-hook-form";
import Timekeeper from 'react-timekeeper';
import { DateInput, TimeInput, DateTimeInput, DatesRangeInput } from 'semantic-ui-calendar-react';

import { baseURLAPI, baseURL } from "../../../../Global";
import { ToastContainer, toast } from 'react-toastify';
const axios = require('axios')
const Edit_Fourth = ({ formData, setForm, navigation, step }) => {
    var SLOT_AVAILABILITY = []

    const {
        COUNSELLOR_TIME_ZONE_CODE,
        COUNSELLOR_AVAILABILITY_MONDAY,
        COUNSELLOR_AVAILABILITY_TUESDAY,
        COUNSELLOR_AVAILABILITY_WEDNESDAY,
        COUNSELLOR_AVAILABILITY_THURSDAY,
        COUNSELLOR_AVAILABILITY_FRIDAY,
        COUNSELLOR_AVAILABILITY_SATURDAY,
    } = formData;
    const [firstboxError, setfirstboxError] = useState([]);
    const [secondboxError, setsecondboxError] = useState([]);

    const [icon_name, setIcon_name] = useState('circle');
    const [days, setDays] = useState({
        Monday: [{ FROM: "", TO: "" }],
        Tuesday: [{ FROM: "", TO: "" }],
        Wednesday: [{ FROM: "", TO: "" }],
        Thursday: [{ FROM: "", TO: "" }],
        Friday: [{ FROM: "", TO: "" }],
        Saturday: [{ FROM: "", TO: "" }],
        // sunday: [{ FROM: "", TO: "" }],
    });

    const [time, setTime] = useState([
        { Id: '00:30', value: '00:30' }, { Id: '01:00', value: '01:00' }, { Id: '01:30', value: '01:30' }, { Id: '02:00', value: '02:00' }, { Id: '02:30', value: '02:30' }, { Id: '03:00', value: '03:00' }, { Id: '03:30', value: '03:30' }, { Id: '04:00', value: '04:00' }, { Id: '04:30', value: '04:30' }, { Id: '05:00', value: '05:00' },
        { Id: '05:30', value: '05:30' }, { Id: '06:00', value: '06:00' }, { Id: '06:30', value: '06:30' }, { Id: '07:00', value: '07:00' }, { Id: '07:30', value: '07:30' }, { Id: '08:00', value: '08:00' }, { Id: '08:30', value: '08:30' }, { Id: '09:00', value: '09:00' }, { Id: '09:30', value: '09:30' }, { Id: '10:00', value: '10:00' },
        { Id: '10:30', value: '10:30' }, { Id: '11:00', value: '11:00' }, { Id: '11:30', value: '11:30' }, { Id: '12:00', value: '12:00' }, { Id: '12:30', value: '12:30' }, { Id: '13:00', value: '13:00' }, { Id: '13:30', value: '13:30' }, { Id: '14:00', value: '14:00' }, { Id: '14:30', value: '14:30' }, { Id: '15:00', value: '15:00' },
        { Id: '15:30', value: '15:30' }, { Id: '16:00', value: '16:00' }, { Id: '16:30', value: '16:30' }, { Id: '17:00', value: '17:00' }, { Id: '17:30', value: '17:30' }, { Id: '18:00', value: '18:00' }, { Id: '18:30', value: '18:30' }, { Id: '19:00', value: '19:00' }, { Id: '19:30', value: '19:30' }, { Id: '20:00', value: '20:00' },
        { Id: '20:30', value: '20:30' }, { Id: '21:00', value: '21:00' }, { Id: '21:30', value: '21:30' }, { Id: '22:00', value: '22:00' }, { Id: '22:30', value: '22:30' }, { Id: '23:00', value: '23:00' }, { Id: '23:30', value: '23:30' }, { Id: '24:00', value: '24:00' }
    ]);

    let timeList = time.length > 0 && time.map((item, i) => {
        return (
            <>
                <option key={item.Id} value={item.id}>{item.value}</option>
            </>
        )
    }, this);
    useEffect(() => {


        axios.get(baseURLAPI + '/Counsellor/availableDates/' + localStorage.userID, {
            headers: {
                jwtToken: localStorage.jwtToken
            },
            data: {
                userID: localStorage.userID

            }
        })
            .then(res => {


                var e = {
                    target: {
                        name: "COUNSELLOR_AVAILABILITY_FRIDAY",
                        value: res.data.CT_COUNSELLOR_AVAILABILITY_FRIDAY
                    }
                };
                setForm(e);

                var e = {
                    target: {
                        name: "COUNSELLOR_AVAILABILITY_MONDAY",
                        value: res.data.CT_COUNSELLOR_AVAILABILITY_MONDAY
                    }
                };
                setForm(e);
                e = {
                    target: {
                        name: "COUNSELLOR_AVAILABILITY_SATURDAY",
                        value: res.data.CT_COUNSELLOR_AVAILABILITY_SATURDAY
                    }
                };
                setForm(e);
                e = {
                    target: {
                        name: "COUNSELLOR_AVAILABILITY_THURSDAY",
                        value: res.data.CT_COUNSELLOR_AVAILABILITY_THURSDAY
                    }
                };
                setForm(e);
                e = {
                    target: {
                        name: "COUNSELLOR_AVAILABILITY_TUESDAY",
                        value: res.data.CT_COUNSELLOR_AVAILABILITY_TUESDAY
                    }
                };
                setForm(e);
                e = {
                    target: {
                        name: "COUNSELLOR_AVAILABILITY_WEDNESDAY",
                        value: res.data.CT_COUNSELLOR_AVAILABILITY_WEDNESDAY
                    }
                };
                setForm(e);


                if (res.data.CT_COUNSELLOR_AVAILABILITY_SATURDAY) {

                    setDays((days) => ({
                        ...days,
                        ['Saturday']: res.data.CT_COUNSELLOR_AVAILABILITY_SATURDAY
                    }));
                }
                if (res.data.CT_COUNSELLOR_AVAILABILITY_FRIDAY) {
                    setDays((days) => ({
                        ...days,
                        ['Friday']: res.data.CT_COUNSELLOR_AVAILABILITY_FRIDAY
                    }));
                }

                if (res.data.CT_COUNSELLOR_AVAILABILITY_MONDAY) {
                    setDays((days) => ({
                        ...days,
                        ['Monday']: res.data.CT_COUNSELLOR_AVAILABILITY_MONDAY
                    }));
                }
                if (res.data.CT_COUNSELLOR_AVAILABILITY_TUESDAY) {

                    setDays((days) => ({
                        ...days,
                        ['Tuesday']: res.data.CT_COUNSELLOR_AVAILABILITY_TUESDAY
                    }));
                }
                if (res.data.CT_COUNSELLOR_AVAILABILITY_WEDNESDAY) {
                    setDays((days) => ({
                        ...days,
                        ['Wednesday']: res.data.CT_COUNSELLOR_AVAILABILITY_WEDNESDAY
                    }));
                }
                if (res.data.CT_COUNSELLOR_AVAILABILITY_THURSDAY) {
                    setDays((days) => ({
                        ...days,
                        ['Thursday']: res.data.CT_COUNSELLOR_AVAILABILITY_THURSDAY
                    }));
                }



            }).catch(err => {
                console.log("err")
                console.log(err)
            })



        if (step.id == 'Counsellor_about')
            setIcon_name('circle')
        else
            setIcon_name('circle outline')
    }, [])


    useEffect(() => {







        if (COUNSELLOR_AVAILABILITY_MONDAY) {
            if (COUNSELLOR_AVAILABILITY_MONDAY.length > 0) {
                setDays((days) => ({
                    ...days,
                    Monday: COUNSELLOR_AVAILABILITY_MONDAY
                }));
            }
        }

        if (COUNSELLOR_AVAILABILITY_TUESDAY) {
            if (COUNSELLOR_AVAILABILITY_TUESDAY.length > 0) {
                setDays((days) => ({
                    ...days,
                    Tuesday: COUNSELLOR_AVAILABILITY_TUESDAY
                }));
            }
        }

        if (COUNSELLOR_AVAILABILITY_WEDNESDAY) {
            if (COUNSELLOR_AVAILABILITY_WEDNESDAY.length > 0) {
                setDays((days) => ({
                    ...days,
                    Wednesday: COUNSELLOR_AVAILABILITY_WEDNESDAY
                }));
            }
        }
        if (COUNSELLOR_AVAILABILITY_THURSDAY) {
            if (COUNSELLOR_AVAILABILITY_THURSDAY.length > 0) {
                setDays((days) => ({
                    ...days,
                    Thursday: COUNSELLOR_AVAILABILITY_THURSDAY
                }));
            }
        }
        if (COUNSELLOR_AVAILABILITY_FRIDAY) {
            if (COUNSELLOR_AVAILABILITY_FRIDAY.length > 0) {
                setDays((days) => ({
                    ...days,
                    Friday: COUNSELLOR_AVAILABILITY_FRIDAY
                }));
            }
        }
        if (COUNSELLOR_AVAILABILITY_SATURDAY) {
            if (COUNSELLOR_AVAILABILITY_SATURDAY.length > 0) {
                setDays((days) => ({
                    ...days,
                    Saturday: COUNSELLOR_AVAILABILITY_SATURDAY
                }));
            }
        }
 
    }, []);


    const onSubmit = () => {
        const e = {
            target: {
                name: "COUNSELLOR_AVAILABILITY_MONDAY",
                value: days.Monday
            }
        };
        const f = {
            target: {
                name: "COUNSELLOR_AVAILABILITY_TUESDAY",
                value: days.Tuesday
            }
        };

        const g = {
            target: {
                name: "COUNSELLOR_AVAILABILITY_WEDNESDAY",
                value: days.Wednesday
            }
        };

        const h = {
            target: {
                name: "COUNSELLOR_AVAILABILITY_THURSDAY",
                value: days.Thursday
            }
        };

        const i = {
            target: {
                name: "COUNSELLOR_AVAILABILITY_FRIDAY",
                value: days.Friday
            }
        };

        const j = {
            target: {
                name: "COUNSELLOR_AVAILABILITY_SATURDAY",
                value: days.Saturday
            }
        };
        var empty = [{ FROM: '', TO: '' }];


        setForm(e);
        setForm(f);
        setForm(g);
        setForm(h);
        setForm(i);
        setForm(j);


    };

    // handle input change
    const handleInputChangeForDay = (e, day, index) => {
        const { name, value } = e.target;
        const list = [...days[day]];
        list[index][name] = value;

        for (var i = 0; i < list.length; i++) {
            //check validity of date
            var validateResults = validate(list[i].TO, list[i].FROM, i, list);
            // view results and display validation results

            var resultsDisplay = "your " + day + " slots : \r\n";
            if (!(validateResults.results)) {
                if (!(validateResults.isNotOverlapping)) {

                    resultsDisplay += "* Overlap with one another \r\n";
                }
                if (!(validateResults.isdateTrue)) {

                    resultsDisplay += "* start timing is after ending time \r\n ";

                }
                if (!(validateResults.isNotSameDate)) {
                    resultsDisplay += "* is the same time\r\n";
                }

                alert(resultsDisplay);
                break;

            }
            else {
                setDays((days) => ({
                    ...days,
                    [day]: list
                }));

                addtoForm();
            }
            console.log(formData);
        }

        function validate(sTime, eTime, checkIndex, list) {

            var isNotOverlapping = true;
            var sTimedate = new Date();
            var eTimedate = new Date();
            var isdateTrue = true;
            var isNotSameDate = true;

            if ((sTime.includes(":")) && (eTime.includes(":"))) {

                // init date values 
                var sTime_t = sTime.split(":");
                sTimedate.setHours(parseInt(sTime_t[0]));
                sTimedate.setMinutes(parseInt(sTime_t[1]));

                var eTime_t = eTime.split(":");
                eTimedate.setHours(parseInt(eTime_t[0]));
                eTimedate.setMinutes(parseInt(eTime_t[1]));
                if (eTimedate > sTimedate) {
                    isdateTrue = false;
                }
                if (sTimedate.getTime() === eTimedate.getTime()) {
                    isNotSameDate = false;
                }

            }
            if (isdateTrue && isNotSameDate) {
                for (var index = 0; index < list.length; index++) {

                    var item = list[index];
                    // make sure same date is not checked
                    if ((checkIndex != index) && (item.TO.includes(":")) && (item.FROM.includes(":"))) {
                        // init values
                        var itemFrom = item.FROM.split(":");
                        var startdate2 = new Date();
                        startdate2.setHours(parseInt(itemFrom[0]));
                        startdate2.setMinutes(parseInt(itemFrom[1]));

                        var itemTo = item.TO.split(":");
                        var enddate2 = new Date();
                        enddate2.setHours(parseInt(itemTo[0]));
                        enddate2.setMinutes(parseInt(itemTo[1]));

                        // check if dates overlap
                        if (dateRangeOverlaps(sTimedate, eTimedate, startdate2, enddate2)) {

                            isNotOverlapping = false;

                            break;
                        }
                        // function to check if dates overlap 
                        function dateRangeOverlaps(a_start, a_end, b_start, b_end) {
                            if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
                            if (a_start <= b_end && b_end <= a_end) return true; // b ends in a
                            if (b_start < a_start && a_end < b_end) return true; // a in b
                            return false;
                        }
                    }

                }

            }
            // init result values 
            var validateObject = {
                isNotOverlapping: isNotOverlapping,
                isdateTrue: isdateTrue,
                isNotSameDate: isNotSameDate,
                results: isNotOverlapping && isdateTrue && isNotSameDate
            };
            // return values
            return validateObject;
        }
    };

    // handle click event of the Remove button
    const handleRemoveClickForDay = (day, index) => {

        const list = [...days[day]];
        list.splice(index, 1);

        setDays((days) => ({
            ...days,
            [day]: list
        }));

        addtoForm();


    };

    // handle click event of the Add button
    const handleAddClickForDay = (day) => () => {

        setDays((days) => ({
            ...days,
            [day]: [...days[day], { FROM: "", TO: "" }]
        }));

    };

    const { handleSubmit, register, errors } = useForm({

    });

    useEffect(() => {
        if (step.id == 'Counsellor_availability')
            setIcon_name('circle')
        else
            setIcon_name('circle outline')
    }, [])


    function addtoForm() {
        const e = {
            target: {
                name: "COUNSELLOR_AVAILABILITY_MONDAY",
                value: days.Monday
            }
        };
        const f = {
            target: {
                name: "COUNSELLOR_AVAILABILITY_TUESDAY",
                value: days.Tuesday
            }
        };

        const g = {
            target: {
                name: "COUNSELLOR_AVAILABILITY_WEDNESDAY",
                value: days.Wednesday
            }
        };

        const h = {
            target: {
                name: "COUNSELLOR_AVAILABILITY_THURSDAY",
                value: days.Thursday
            }
        };

        const i = {
            target: {
                name: "COUNSELLOR_AVAILABILITY_FRIDAY",
                value: days.Friday
            }
        };

        const j = {
            target: {
                name: "COUNSELLOR_AVAILABILITY_SATURDAY",
                value: days.Saturday
            }
        };
        var empty = [{ FROM: '', TO: '' }];


        setForm(e);
        setForm(f);
        setForm(g);
        setForm(h);
        setForm(i);
        setForm(j);
        //console.log(formData);
        return true;
    }
    const _handleSubmitClick = () => {

        var done = addtoForm();
        console.log(days);
        // //
        //         var e = {
        //             target: {
        //                 name: "COUNSELLOR_AVAILABILITY_MONDAY",
        //                 value: undefined
        //             }
        //         };
        //         setForm(e);

        //        e = {
        //             target: {
        //                 name: "COUNSELLOR_AVAILABILITY_TUESDAY",
        //                 value: undefined
        //             }
        //         };
        //         setForm(e);

        //         e = {
        //             target: {
        //                 name: "COUNSELLOR_AVAILABILITY_WEDNESDAY",
        //                 value: undefined
        //             }
        //         };setForm(e);

        //         e = {
        //             target: {
        //                 name: "COUNSELLOR_AVAILABILITY_THURSDAY",
        //                 value: undefined
        //             }
        //         }; 
        //         setForm(e);

        //        e = {
        //             target: {
        //                 name: "COUNSELLOR_AVAILABILITY_FRIDAY",
        //                 value: undefined
        //             }
        //         };
        //         setForm(e);

        //         e = {
        //             target: {
        //                 name: "COUNSELLOR_AVAILABILITY_SATURDAY",
        //                 value: undefined
        //             }
        //         }; 
        //         setForm(e);


        console.log(formData);
        if (done) {
            const headers = {
                jwtToken: localStorage.jwtToken
            }

            axios.post(baseURLAPI + '/Counsellor/UpdateTimeTable', { formData: formData, days: days, COUNSELLORID: localStorage.userID },

                {
                    headers: headers
                }
            )
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    setfirstboxError("");
                    //  localStorage.setItem("isCompleted", 1);
                    toast.success('Counsellor updated successfully!', {
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
                        var secondString = [];
                        var list = error.response.data;
                        if (Array.isArray(list)) {
                            list.forEach(DisplayValidation);
                            console.log(firstString);
                            setfirstboxError(firstString);
                            setsecondboxError(secondString);
                            function DisplayValidation(item, index) {

                                if (item.error == "COUNSELLOR_HEADLINE") {
                                    firstString.push(item.message);

                                }
                                if (item.error == "COUNSELLOR_VIDEO_URL") {
                                    secondString.push(item.message);

                                }

                            }
                        }
                        toast.error('Unsuccessful update counsellor', {
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
        } else { console.log("sdfas"); }
    }

    return (

        <Grid>
            <Grid.Column>
                <Form size='small'>
                    <center>

                        <Segment inverted color='teal' size="mini" style={{ width: '85%', textAlign: 'center' }}>
                            <Container>
                                 
                                <div style={{ float: 'right', padding: '1rem;' }}>
                                    <Label as='a' onClick={() => navigation.previous()}>
                                        <Icon name='hand point left outline' />
                                  Previous
                                </Label>
                                    <Label as='a' onClick={onSubmit}>
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
                                                <Label as='a'circular className="activeBreadCrumb"  onClick={() => navigation.go(1)}>
                                                    <Icon name="circle outline" />
                                                Photo&nbsp;
                                            </Label>
                                                <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(2)}>
                                                    <Icon name="circle outline" />
                                                Description&nbsp;
                                            </Label>
                                                <Label as='a'circular onClick={() => navigation.go(3)}>
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
                                            <Grid>
                                                <Grid.Row>
                                                    <Grid.Column width={16}>
                                                        <Segment style={{ width: '80%' }}>
                                                            <div style={{ width: '100%', textAlign: 'left' }}>
                                                                <Label color='red' horizontal>
                                                                    Select your time zone
                                                        </Label>
                                                            </div>
                                                            <br />
                                                            {Object.entries(days).map(([dayKey, day]) => {
                                                                return day.map((x, i) => {
                                                                    return (
                                                                        <React.Fragment>
                                                                            <div style={{ width: '100%' }}>
                                                                                <center>
                                                                                     
                                                                                        <Grid columns='equal'>
                                                                                            <Grid.Column>
                                                                                                <Label>
                                                                                                    <Icon name='circlle' />{dayKey}
                                                                                                </Label>
                                                                                            </Grid.Column>
                                                                                            <Grid.Column>
                                                                                                <Form.Group widths='equal'>
                                                                                                    <Form.Field className="CustomForm">
                                                                                                        <select
                                                                                                            name="FROM"
                                                                                                            value={x.FROM}
                                                                                                            onChange={(e) => handleInputChangeForDay(e, dayKey, i)}
                                                                                                        >
                                                                                                            <option selected hidden>
                                                                                                                From
                                                                                                </option>
                                                                                                            {timeList}
                                                                                                        </select>
                                                                                                    </Form.Field>
                                                                                                    <Form.Field className="CustomForm">
                                                                                                        <select
                                                                                                            name="TO"
                                                                                                            value={x.TO}
                                                                                                            onChange={(e) => handleInputChangeForDay(e, dayKey, i)}
                                                                                                            placeholder="select your Institute"
                                                                                                        >
                                                                                                            <option selected hidden>
                                                                                                                TO
                                                                                                    </option>
                                                                                                            {timeList}
                                                                                                        </select>
                                                                                                    </Form.Field>
                                                                                                </Form.Group>
                                                                                            </Grid.Column>
                                                                                            <Grid.Column>
                                                                                                <div style={{ textAlign: "left" }}>
                                                                                                    {day.length !== 1 && (
                                                                                                        <Label as="a" onClick={() => handleRemoveClickForDay(dayKey, i)} circular style={{ marginRight: '10px' }}>
                                                                                                            <Icon color="red" name='remove' style={{ margin: '0px' }} />
                                                                                                        </Label>
                                                                                                    )}

                                                                                                    {day.length - 1 === i && (
                                                                                                        <Label as="a" onClick={handleAddClickForDay(dayKey)} circular style={{ marginRight: '10px' }}>
                                                                                                            <Icon color="green" name='plus' style={{ margin: '0px' }} />
                                                                                                        </Label>
                                                                                                    )}

                                                                                                </div>

                                                                                            </Grid.Column>
                                                                                        </Grid>
                                                                                </center>
                                                                            </div>
                                                                        </React.Fragment>
                                                                    )
                                                                })
                                                            })
                                                            }


                                                        </Segment>          <Form.Group widths='equal'>
                                                            <Form.Field className="CustomForm">
                                                                <Button className="appBanner" color='blue' onClick={_handleSubmitClick}>
                                                                    <Icon name='send' className="appBanner" /> Update Details &nbsp;&nbsp;
                                    </Button> &nbsp;&nbsp;&nbsp;
                                                    </Form.Field>
                                                        </Form.Group>
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </center>

                                    </Segment>

                                </center>
                            </div>
                        </Segment>
                    </center>
                </Form>
            </Grid.Column>
        </Grid >
    )

}

export default Edit_Fourth;