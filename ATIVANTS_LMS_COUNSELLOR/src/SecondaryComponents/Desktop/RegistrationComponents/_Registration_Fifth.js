import React, { useState, useEffect, useContext } from 'react';
import {
    Header, Icon, Form, Image, Message,
    Segment, Grid, Modal, Search, Button, Dimmer, Loader, Input, List, Label, Divider, Item, Dropdown, Select, Checkbox
} from 'semantic-ui-react';

import { useForm } from "react-hook-form";
import Timekeeper from 'react-timekeeper';
import { DateInput, TimeInput, DateTimeInput, DatesRangeInput } from 'semantic-ui-calendar-react';

const Registration_Fifth = ({ formData, setForm, navigation }) => {

    const {
        COUNSELLOR_TIME_ZONE_CODE,
        COUNSELLOR_AVAILABILITY_DATE,

        COUNSELLOR_AVAILABILITY_MONDAY,
        COUNSELLOR_AVAILABILITY_TIME_MONDAY_FROM,
        COUNSELLOR_AVAILABILITY_TIME_MONDAY_TO,

        COUNSELLOR_AVAILABILITY_TUESDAY,
        COUNSELLOR_AVAILABILITY_TIME_TUESDAY_FROM,
        COUNSELLOR_AVAILABILITY_TIME_TUESDAY_TO,

        COUNSELLOR_AVAILABILITY_WEDNESDAY,
        COUNSELLOR_AVAILABILITY_TIME_WEDNESDAY_FROM,
        COUNSELLOR_AVAILABILITY_TIME_WEDNESDAY_TO,

        COUNSELLOR_AVAILABILITY_THURSDAY,
        COUNSELLOR_AVAILABILITY_TIME_THURSDAY_FROM,
        COUNSELLOR_AVAILABILITY_TIME_THURSDAY_TO,

        COUNSELLOR_AVAILABILITY_FRIDAY,
        COUNSELLOR_AVAILABILITY_TIME_FRIDAY_FROM,
        COUNSELLOR_AVAILABILITY_TIME_FRIDAY_TO,

        COUNSELLOR_AVAILABILITY_SATURDAY,
        COUNSELLOR_AVAILABILITY_TIME_SATURDAY_FROM,
        COUNSELLOR_AVAILABILITY_TIME_SATURDAY_TO

    } = formData;

    const [timings, setTimings] = useState('')

    const [mondayFrom, setMondayFrom] = useState({ time: '' });
    const [mondayTo, setMondayTo] = useState({ time: '' });
    const [tuesdayFrom, setTuesdayFrom] = useState({ time: '' });
    const [tuesdayTo, setTuesdayTo] = useState({ time: '' });
    const [wednesdayFrom, setWednesdayFrom] = useState({ time: '' });
    const [wednesdayTo, setWednesdayTo] = useState({ time: '' });
    const [thursdayFrom, setThursdayFrom] = useState({ time: '' });
    const [thursdayTo, setThursdayTo] = useState({ time: '' });
    const [fridayFrom, setFridayFrom] = useState({ time: '' });
    const [fridayTo, setFridayTo] = useState({ time: '' });
    const [satFrom, setSatFrom] = useState({ time: '' });
    const [satTo, setSatTo] = useState({ time: '' });


    const friendOptions = [
        {
            key: 'Jenny Hess',
            text: 'Jenny Hess',
            value: 'Jenny Hess',
            image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
        },
        {
            key: 'Elliot Fu',
            text: 'Elliot Fu',
            value: 'Elliot Fu',
            image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
        },
    ]

    const { handleSubmit, register, errors } = useForm({

    });



    const onSubmit = (data) => {
        navigation.next()
    };

    const Counsellor_TimeZone = [
        {
            title: "Choose Institute",
            name: [
                "Adrenaline Addicts", "Culture Lovers", "Aquatic adventures", "Beach enthusiasts"
            ],
            code: [0, 1, 2, 3]
        }
    ]

    const onMondayFrom = (val) => {
        setMondayFrom({ ...mondayFrom, time: val.target.value })
    }

    const onMondayTo = (val) => {
        setMondayTo({ ...mondayTo, time: val.target.value })
    }


    const onTuesFrom = (val) => {
        setTuesdayFrom({ ...tuesdayFrom, time: val.target.value })
    }

    const onTueTo = (val) => {
        setTuesdayTo({ ...tuesdayTo, time: val.target.value })
    }

    const onWedFrom = (val) => {
        setWednesdayFrom({ ...wednesdayFrom, time: val.target.value })
    }

    const onWedTo = (val) => {
        setWednesdayTo({ ...wednesdayTo, time: val.target.value })
    }

    const onThuFrom = (val) => {
        setThursdayFrom({ ...thursdayFrom, time: val.target.value })
    }

    const onThuTo = (val) => {
        setThursdayTo({ ...thursdayTo, time: val.target.value })
    }

    const onFriFrom = (val) => {
        setFridayFrom({ ...fridayFrom, time: val.target.value })
    }

    const onFriTo = (val) => {
        setFridayTo({ ...fridayTo, time: val.target.value })
    }

    const onSatFrom = (val) => {
        setSatFrom({ ...satFrom, time: val.target.value })
    }

    const onSatTo = (val) => {
        setSatTo({ ...satTo, time: val.target.value })
    }




    useEffect(() => {
        formData.COUNSELLOR_AVAILABILITY_TIME_MONDAY_FROM = mondayFrom.time;
    }, [mondayFrom])

    useEffect(() => {
        formData.COUNSELLOR_AVAILABILITY_TIME_MONDAY_TO = mondayTo.time;
    }, [mondayTo])

    useEffect(() => {
        formData.COUNSELLOR_AVAILABILITY_TIME_TUESDAY_FROM = tuesdayFrom.time;
    }, [tuesdayFrom])

    useEffect(() => {
        formData.COUNSELLOR_AVAILABILITY_TIME_TUESDAY_TO = tuesdayTo.time;
    }, [tuesdayTo])

    useEffect(() => {
        formData.COUNSELLOR_AVAILABILITY_TIME_WEDNESDAY_FROM = wednesdayFrom.time;
    }, [wednesdayFrom])

    useEffect(() => {
        formData.COUNSELLOR_AVAILABILITY_TIME_WEDNESDAY_TO = wednesdayTo.time;
    }, [wednesdayTo])

    useEffect(() => {
        formData.COUNSELLOR_AVAILABILITY_TIME_THURSDAY_FROM = thursdayFrom.time;
    }, [thursdayFrom])

    useEffect(() => {
        formData.COUNSELLOR_AVAILABILITY_TIME_THURSDAY_TO = thursdayTo.time;
    }, [thursdayTo])

    useEffect(() => {
        formData.COUNSELLOR_AVAILABILITY_TIME_FRIDAY_FROM = fridayFrom.time;
    }, [fridayFrom])

    useEffect(() => {
        formData.COUNSELLOR_AVAILABILITY_TIME_FRIDAY_TO = fridayTo.time;
    }, [fridayTo])

    useEffect(() => {
        formData.COUNSELLOR_AVAILABILITY_TIME_SATURDAY_FROM = satFrom.time;
    }, [satFrom])

    useEffect(() => {
        formData.COUNSELLOR_AVAILABILITY_TIME_SATURDAY_TO = satTo.time;
    }, [satTo])


    useEffect(() => {

        if (COUNSELLOR_AVAILABILITY_TIME_MONDAY_FROM)
            setMondayFrom({ time: COUNSELLOR_AVAILABILITY_TIME_MONDAY_FROM })

        if (COUNSELLOR_AVAILABILITY_TIME_MONDAY_TO)
            setMondayTo({ time: COUNSELLOR_AVAILABILITY_TIME_MONDAY_TO })

        if (COUNSELLOR_AVAILABILITY_TIME_TUESDAY_FROM)
            setTuesdayFrom({ time: COUNSELLOR_AVAILABILITY_TIME_TUESDAY_FROM })

        if (COUNSELLOR_AVAILABILITY_TIME_TUESDAY_TO)
            setTuesdayTo({ time: COUNSELLOR_AVAILABILITY_TIME_TUESDAY_TO })

        if (COUNSELLOR_AVAILABILITY_TIME_WEDNESDAY_FROM)
            setWednesdayFrom({ time: COUNSELLOR_AVAILABILITY_TIME_WEDNESDAY_FROM })

        if (COUNSELLOR_AVAILABILITY_TIME_WEDNESDAY_TO)
            setWednesdayTo({ time: COUNSELLOR_AVAILABILITY_TIME_WEDNESDAY_TO })

        if (COUNSELLOR_AVAILABILITY_TIME_THURSDAY_FROM)
            setThursdayFrom({ time: COUNSELLOR_AVAILABILITY_TIME_THURSDAY_FROM })

        if (COUNSELLOR_AVAILABILITY_TIME_THURSDAY_TO)
            setThursdayTo({ time: COUNSELLOR_AVAILABILITY_TIME_THURSDAY_TO })

        if (COUNSELLOR_AVAILABILITY_TIME_FRIDAY_FROM)
            setFridayFrom({ time: COUNSELLOR_AVAILABILITY_TIME_FRIDAY_FROM })

        if (COUNSELLOR_AVAILABILITY_TIME_FRIDAY_TO)
            setFridayTo({ time: COUNSELLOR_AVAILABILITY_TIME_FRIDAY_TO })

        if (COUNSELLOR_AVAILABILITY_TIME_SATURDAY_FROM)
            setSatFrom({ time: COUNSELLOR_AVAILABILITY_TIME_SATURDAY_FROM })

        if (COUNSELLOR_AVAILABILITY_TIME_SATURDAY_TO)
            setSatTo({ time: COUNSELLOR_AVAILABILITY_TIME_SATURDAY_TO })
    }, [])

    console.log(formData)
    // console.log("monday.time = ", monday.time);

    return (

        <Grid>
            <Grid.Column>
                <Form size='small' onSubmit={handleSubmit(onSubmit)}>
                    <center>

                        <h1>Availability</h1>
                        <h2>Set your time zone</h2>

                        <Item.Group>
                            <Item>
                                <Item.Content>
                                    <Form.Group>
                                        <Form.Field className="CustomForm">
                                            <label>Country of origin</label>
                                            <select name="COUNSELLOR_TIME_ZONE_CODE" value={COUNSELLOR_TIME_ZONE_CODE} onChange={setForm} placeholder="choose subject">
                                                {
                                                    Counsellor_TimeZone.map((level) => {
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
                                </Item.Content>
                            </Item>

                        </Item.Group>

                        <h4>Set your Availability</h4><br />

                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={16}>
                                    <center>
                                        <Segment style={{ width: '50%', textAlign: 'center', border: '0px solid transparent' }}>


                                            <Segment.Group horizontal size="tiny" className="HeadingForAvailability">
                                                <Segment className="customSegment">
                                                    <Label color="teal" horizontal>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Days&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                             </Label>
                                                </Segment>
                                                <Segment className="customSegment">
                                                    <Label color="teal" horizontal>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;From&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                             </Label>
                                                </Segment>
                                                <Segment className="customSegment">
                                                    <Label color="teal" horizontal>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                             </Label>
                                                </Segment>
                                            </Segment.Group>


                                            <Segment.Group horizontal size="tiny" className="HeadingForAvailability">
                                                <Segment className="customSegment">
                                                    <Label style={{ display: 'block' }}>
                                                        <Checkbox label='Monday' />

                                                    </Label>
                                                </Segment>
                                                <Segment className="customSegment">
                                                    <input
                                                        type="time"
                                                        step="1"
                                                        value={mondayFrom.time ? mondayFrom.time : formData.COUNSELLOR_AVAILABILITY_TIME_MONDAY_FROM}
                                                        name="From"
                                                        className="form-control"
                                                        placeholder="Time"
                                                        onChange={onMondayFrom}
                                                    />
                                                </Segment>
                                                <Segment className="customSegment">
                                                    <input
                                                        type="time"
                                                        step="1"
                                                        value={mondayTo.time ? mondayTo.time : formData.COUNSELLOR_AVAILABILITY_TIME_MONDAY_TO}
                                                        name="To"
                                                        className="form-control"
                                                        placeholder="Time"
                                                        onChange={onMondayTo}
                                                    /></Segment>
                                            </Segment.Group>


                                            <Segment.Group horizontal size="tiny" className="HeadingForAvailability">
                                                <Segment className="customSegment">
                                                    <Label style={{ display: 'block' }}>
                                                        <Checkbox label='Tuesady' />

                                                    </Label>
                                                </Segment>
                                                <Segment className="customSegment">
                                                    <input
                                                        type="time"
                                                        step="1"
                                                        value={tuesdayFrom.time ? tuesdayFrom.time : formData.COUNSELLOR_AVAILABILITY_TIME_TUESDAY_FROM}
                                                        name="COUNSELLOR_AVAILABILITY_TIME_FROM"
                                                        className="form-control"
                                                        placeholder="Time"
                                                        onChange={onTuesFrom}
                                                    />
                                                </Segment>
                                                <Segment className="customSegment">
                                                    <input
                                                        type="time"
                                                        step="1"
                                                        value={tuesdayTo.time ? tuesdayTo.time : formData.COUNSELLOR_AVAILABILITY_TIME_TUESDAY_TO}
                                                        name="COUNSELLOR_AVAILABILITY_TIME_FROM"
                                                        className="form-control"
                                                        placeholder="Time"
                                                        onChange={onTueTo}
                                                    /></Segment>
                                            </Segment.Group>

                                            <Segment.Group horizontal size="tiny" className="HeadingForAvailability">
                                                <Segment className="customSegment">
                                                    <Label style={{ display: 'block' }}>
                                                        <Checkbox label='Wednesday' />

                                                    </Label>
                                                </Segment>
                                                <Segment className="customSegment">
                                                    <input
                                                        type="time"
                                                        step="1"
                                                        value={wednesdayFrom.time ? wednesdayFrom.time : formData.COUNSELLOR_AVAILABILITY_TIME_WEDNESDAY_FROM}
                                                        name="COUNSELLOR_AVAILABILITY_TIME_FROM"
                                                        className="form-control"
                                                        placeholder="Time"
                                                        onChange={onWedFrom}
                                                    />
                                                </Segment>
                                                <Segment className="customSegment">
                                                    <input
                                                        type="time"
                                                        step="1"
                                                        value={wednesdayTo.time ? wednesdayTo.time : formData.COUNSELLOR_AVAILABILITY_TIME_WEDNESDAY_TO}
                                                        name="COUNSELLOR_AVAILABILITY_TIME_FROM"
                                                        className="form-control"
                                                        placeholder="Time"
                                                        onChange={onWedTo}
                                                    /></Segment>
                                            </Segment.Group>

                                            <Segment.Group horizontal size="tiny" className="HeadingForAvailability">
                                                <Segment className="customSegment">
                                                    <Label style={{ display: 'block' }}>
                                                        <Checkbox label='Thursday' />

                                                    </Label>
                                                </Segment>
                                                <Segment className="customSegment">
                                                    <input
                                                        type="time"
                                                        step="1"
                                                        value={thursdayFrom.time ? thursdayFrom.time : formData.COUNSELLOR_AVAILABILITY_TIME_THURSDAY_FROM}
                                                        name="COUNSELLOR_AVAILABILITY_TIME_FROM"
                                                        className="form-control"
                                                        placeholder="Time"
                                                        onChange={onThuFrom}
                                                    />
                                                </Segment>
                                                <Segment className="customSegment">
                                                    <input
                                                        type="time"
                                                        step="1"
                                                        value={thursdayTo.time ? thursdayTo.time : formData.COUNSELLOR_AVAILABILITY_TIME_THURSDAY_TO}
                                                        name="COUNSELLOR_AVAILABILITY_TIME_FROM"
                                                        className="form-control"
                                                        placeholder="Time"
                                                        onChange={onThuTo}
                                                    /></Segment>
                                            </Segment.Group>

                                            <Segment.Group horizontal size="tiny" className="HeadingForAvailability">
                                                <Segment className="customSegment">
                                                    <Label style={{ display: 'block' }}>
                                                        <Checkbox label='Friday' />

                                                    </Label>
                                                </Segment>
                                                <Segment className="customSegment">
                                                    <input
                                                        type="time"
                                                        step="1"
                                                        value={fridayFrom.time ? fridayFrom.time : formData.COUNSELLOR_AVAILABILITY_TIME_FRIDAY_FROM}
                                                        name="COUNSELLOR_AVAILABILITY_TIME_FROM"
                                                        className="form-control"
                                                        placeholder="Time"
                                                        onChange={onFriFrom}
                                                    />
                                                </Segment>
                                                <Segment className="customSegment">
                                                    <input
                                                        type="time"
                                                        step="1"
                                                        value={fridayTo.time ? fridayTo.time : formData.COUNSELLOR_AVAILABILITY_TIME_FRIDAY_TO}
                                                        name="COUNSELLOR_AVAILABILITY_TIME_FROM"
                                                        className="form-control"
                                                        placeholder="Time"
                                                        onChange={onFriTo}
                                                    /></Segment>
                                            </Segment.Group>

                                            <Segment.Group horizontal size="tiny" className="HeadingForAvailability">
                                                <Segment className="customSegment">
                                                    <Label style={{ display: 'block' }}>
                                                        <Checkbox label='Saturday' />

                                                    </Label>
                                                </Segment>
                                                <Segment className="customSegment">
                                                    <input
                                                        type="time"
                                                        step="1"
                                                        value={satFrom.time ? satFrom.time : formData.COUNSELLOR_AVAILABILITY_TIME_SATURDAY_FROM}
                                                        name="COUNSELLOR_AVAILABILITY_TIME_FROM"
                                                        className="form-control"
                                                        placeholder="Time"
                                                        onChange={onSatFrom}
                                                    />
                                                </Segment>
                                                <Segment className="customSegment">
                                                    <input
                                                        type="time"
                                                        step="1"
                                                        value={satTo.time ? satTo.time : formData.COUNSELLOR_AVAILABILITY_TIME_SATURDAY_TO}
                                                        name="COUNSELLOR_AVAILABILITY_TIME_FROM"
                                                        className="form-control"
                                                        placeholder="Time"
                                                        onChange={onSatTo}
                                                    /></Segment>
                                            </Segment.Group>


                                        </Segment>
                                    </center>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <br />
                        <Button
                            color='teal'
                            fluid
                            size='large'
                            onClick={() => navigation.previous()}
                        >
                            Back
                            </Button>

                        <Button
                            color='teal'
                            fluid
                            size='large'
                            type="submit"
                            onClick={() => navigation.next()}
                        >
                            Next
                    </Button>

                    </center>
                </Form>

            </Grid.Column>
        </Grid >
    )

}

export default Registration_Fifth;