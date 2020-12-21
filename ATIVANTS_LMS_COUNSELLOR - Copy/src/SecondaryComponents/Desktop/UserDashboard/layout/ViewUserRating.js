import React from 'react';
import {
    Button, Form, Header, Image, Input,
    Dropdown, Grid, Modal, Placeholder,
    Message, Segment, Card, Img, Icon,
    Table, Label, Container, List, Popup, Rating
} from "semantic-ui-react";
import { ToastContainer, toast } from 'react-toastify';
import ChangeSession from "./UserRequestChangeSessionModel"
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
// import FullCalendar from '@fullcalendar/react'
// import interactionPlugin from '@fullcalendar/interaction'
// import timeGridPlugin from ' ullcalendar/timegrid'
import matthew from "../../../../Static/Images/matthew.png";
import { baseURLAPI, baseURL } from "../../../../Global";
const axios = require('axios');


class ViewUserRating extends React.Component {
    state = {
        requests: [],
        openModel: false,
        element: {},
        requestID: '',
        feedback: '',
        rating: '',
        userID: '', reviewId: '',
        cousellorID: " ",
        formwarning: "",
        updateopenModel: false,
        deleteModel: false,
        loading: true
    }

    componentDidMount() {
        this.setTable();
    }

    setTable = () => {
        axios.get(baseURLAPI + '/rating/userSent/' + localStorage.userID, {
            headers: {
                jwtToken: localStorage.jwtToken
            },
            data: {
                userID: localStorage.userID

            }
        })
            .then((res) => {
                const requests = res.data;

                this.setState({ requests: requests, loading: false });
                console.log(requests);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    handleRate = (e, { rating, maxRating }) =>
        this.setState({ rating, maxRating })
    _onKeyUp = e => {
        var value = e.target.value.toLowerCase();
        this.setState({ feedback: value });
    };

    feebackModel = (details) => {
        this.setState({ userID: details.ct_user_id, openModel: true, cousellorID: details.ct_counsellor_id, requestID: details.id });

    };
    sendMessage = () => {
        console.log(this.state.feedback);
        if (this.state.feedback && this.state.rating) {
            const headers = {
                jwtToken: localStorage.jwtToken
            }
            const data = {
                requestID: this.state.requestID,
                feedback: this.state.feedback,
                rating: this.state.rating,
                userID: this.state.userID,
                cousellorID: this.state.cousellorID
            }
            console.log(data);
            axios.post(baseURLAPI + '/rating/rating', { formData: data }, {
                headers: headers
            })
                .then((res) => {
                    console.log(res);
                    this.setTable();
                    this.setState({ formwarning: ' ' });
                    toast.success('Feedback Successfully Sent!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: '',
                    });

                })
                .catch(function (error) {
                    console.log(error);
                    toast.error('An error occurred!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: '',
                    });
                });
        } else {

            this.setState({ formwarning: 'form incomplete' });
        }
    }
    DeletefeebackModel = (details) => {
        console.log(details.review_details.id)

        this.setState({
            deleteModel: true,
            reviewId: details.review_details.id
        });
    };


    UpdatefeebackModel = (details) => {
        console.log(details.review_details.id)

        this.setState({
            formwarning: '',
            userID: details.review_details.ct_counsellor_user_id,
            updateopenModel: true,
            rating: details.review_details.ct_counsellor_stars,
            feedback: details.review_details.ct_counsellor_review,
            cousellorID: details.review_details.ct_counsellor_id,
            reviewId: details.review_details.id
        });
    };
    deleteFeedback = () => {
        console.log(this.state.feedback);

        const headers = {
            jwtToken: localStorage.jwtToken
        }
        const data = {
            reviewId: this.state.reviewId,

        }
        console.log(data);
        axios.post(baseURLAPI + '/rating/Delete', { formData: data }, {
            headers: headers
        })
            .then((res) => {
                console.log(res); this.setTable();
                this.setState({ formwarning: ' ', deleteModel: false });
                toast.success('Feedback Deleted Successfully Sent!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: '',
                });

            })
            .catch(function (error) {
                console.log(error);
                toast.error('An error occurred!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: '',
                });
            });

    }
    sendUpdate = () => {
        console.log(this.state.feedback);
        if (this.state.feedback && this.state.rating) {
            const headers = {
                jwtToken: localStorage.jwtToken
            }
            const data = {
                reviewId: this.state.reviewId,
                feedback: this.state.feedback,
                rating: this.state.rating,
                userID: this.state.userID,
                cousellorID: this.state.cousellorID
            }
            console.log(data);
            axios.post(baseURLAPI + '/rating/UpdateRating', { formData: data }, {
                headers: headers
            })
                .then((res) => {
                    console.log(res); this.setTable();
                    this.setState({ formwarning: ' ' });
                    toast.success('Feedback Successfully Sent!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: '',
                    });

                })
                .catch(function (error) {
                    console.log(error);
                    toast.error('An error occurred!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: '',
                    });
                });
        } else {

            this.setState({ formwarning: 'form incomplete' });

        }
    }

    render() {

        return ( 
                   
            <Grid columns='equal' divided style={{ padding: '1%' }} >
                <Grid.Row textAlign='center'>
                    <Grid.Column textAlign= "center" >  <Container  style={{ width: "70%" }}  >
                        <h1>Counsellor in the  list of your review</h1>
                        <Table style={{ width: "100%" }} basic='very' celled collapsing padded>
                            <Table.Body>
                                {this.state.requests.length > 0 ? (
                                    this.state.requests.map((details, index) => (
                                        <Table.Row>
                                            <Table.Cell width= "3"  >
                                                <div  >
                                                    {details.TX_PICTURE ? (<div ><div style={{ float: "left", paddingRight: "5px" }}>
                                                        <Image size="tiny" src={details.TX_PICTURE} avatar /> </div><div  >
                                                            <p> <strong>{details.TX_USER_NAME}    </strong> <br />
                                                    Programme attended :     {details.ct_counselling_subject_name} <br />
                                                        Level :     {details.ct_counselling_level_name} <br />
                                                        Last Attended :   {details.ct_session_date.substring(0, 10)} <br /> </p>
                                                        </div>    </div>) :
                                                        (
                                                            <div ><div style={{ float: "left", paddingRight: "5px" }}>
                                                                <Image size="tiny" src={matthew} avatar />   </div><div  >
                                                                    <p> <strong>{details.TX_USER_NAME}    </strong> <br />
                                                        Programme attended :     {details.ct_counselling_subject_name} <br />
                                                            Level :     {details.ct_counselling_level_name} <br />
                                                            Last Attended :  {details.ct_session_date.substring(0, 10)} <br /> </p>
                                                                </div>    </div>
                                                        )}</div> </Table.Cell>
                                            <Table.Cell width= "3" textAlign="right">
                                                <div  >
                                                    {details.review == 1 ? (<div>
                                                        <p>  Feedback  :  {details.review_details.ct_counsellor_review}< br /><Rating icon='star' rating={details.review_details.ct_counsellor_stars} maxRating={5} disabled />   <br />

                                                                Posted date : {details.review_details.ct_date}
                                                        </p> <Label padded size="medium" as='a' color="red" onClick={() => this.DeletefeebackModel(details)}   ><Icon name='trash' size='large' /> Delete</Label>
                                                        <Label size="medium" as='a' onClick={() => this.UpdatefeebackModel(details)}   >   <Icon name='edit' size='large' /> Update Feedback </Label>
                                                        <Modal
                                                            onClose={() => this.setState({ updateopenModel: false, formwarning: " ", rating: "", feedback: "" })}
                                                            onOpen={() => this.setState({ updateopenModel: true, formwarning: " ", rating: "", feedback: "" })}
                                                            open={this.state.updateopenModel}

                                                        >
                                                            <Modal.Header>Update Rating</Modal.Header>
                                                            <Modal.Content  >
                                                                <Form  >
                                                                    <Form.Group>
                                                                        <Form.Input
                                                                            style={{ width: "300px" }}
                                                                            type="FeedBack"
                                                                            onChange={this._onKeyUp}
                                                                            name="m"
                                                                            id="m"
                                                                            placeholder="FeedBack"
                                                                        /> </Form.Group>
                                                                    <Form.Group>
                                                                        <Rating maxRating={5} rating={this.state.rating} onRate={this.handleRate} /></Form.Group>
                                                                    <Form.Group>  <Form.Button style={{ width: "100px" }} onClick={() => this.sendUpdate()}>  Send </Form.Button>
                                                                    </Form.Group>
                                                                    <strong style={{ color: "red" }}> {this.state.formwarning}</strong>
                                                                </Form>
                                                            </Modal.Content  >
                                                            <Modal.Actions>
                                                                <Button color='black' onClick={() => this.setState({ updateopenModel: false })}>
                                                                    Close
                                                                </Button>
                                                            </Modal.Actions>
                                                        </Modal>
                                                        <Modal
                                                            onClose={() => this.setState({ deleteModel: false, formwarning: " ", updaterating: "", updatefeedback: "" })}
                                                            onOpen={() => this.setState({ deleteModel: true, formwarning: " ", updaterating: "", updatefeedback: "" })}
                                                            open={this.state.deleteModel}

                                                        >
                                                            <Modal.Header>Delete Rating</Modal.Header>
                                                            <Modal.Content  >
                                                                <p> Are you sure to delete this review? </p>
                                                            </Modal.Content  >
                                                            <Modal.Actions>
                                                                <Button color='black' onClick={() => this.setState({ deleteModel: false })}>
                                                                    No
                                                                </Button>
                                                                <Button color='blue' onClick={() => this.deleteFeedback()}>
                                                                    Delete anyway
                                                                </Button>
                                                            </Modal.Actions>
                                                        </Modal>
                                                    </div>
                                                    ) : (<div>
                                                        <p> Not yet rated </p>
                                                        <Label size="medium" as='a' onClick={() => this.feebackModel(details)}   >   <Icon name='add circle' size='large' /> Add Feedback </Label>
                                                        <Modal
                                                            onClose={() => this.setState({ openModel: false, formwarning: " ", rating: "", feedback: "" })}
                                                            onOpen={() => this.setState({ openModel: true, formwarning: " ", rating: "", feedback: "" })}
                                                            open={this.state.openModel}
                                                        >
                                                            <Modal.Header>Add Rating</Modal.Header>
                                                            <Modal.Content  >
                                                                <Form  >
                                                                    <Form.Group>
                                                                        <Form.Input
                                                                            style={{ width: "300px" }}
                                                                            type="FeedBack"
                                                                            onChange={this._onKeyUp}
                                                                            name="m"
                                                                            id="m"
                                                                            placeholder="FeedBack"
                                                                        /> </Form.Group>
                                                                    <Form.Group>
                                                                        <Rating maxRating={5} rating={this.state.rating} onRate={this.handleRate} /></Form.Group>
                                                                    <Form.Group>  <Form.Button style={{ width: "100px" }} onClick={() => this.sendMessage()}>  Send </Form.Button>
                                                                    </Form.Group>
                                                                    <strong style={{ color: "red" }}> {this.state.formwarning}</strong>
                                                                </Form>
                                                            </Modal.Content  >
                                                            <Modal.Actions>
                                                                <Button color='black' onClick={() => this.setState({ openModel: false })}>
                                                                    Close
                                                                </Button>
                                                            </Modal.Actions>
                                                        </Modal>
                                                    </div>)}
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>))
                                ) :
                                    (
                                        this.state.loading ? (<Table.Row>
                                            <Table.Cell textAlign="center">
                                                <h3>  Page is loading...........   </h3>
                                                <Icon size="huge" loading name='spinner' />
                                            </Table.Cell>
                                        </Table.Row>) : (<Table.Row>
                                            <Table.Cell textAlign="center">
                                                No review found.. create a session with counsellor to review counsellor
                                        </Table.Cell>
                                        </Table.Row>)
                                    )
                                }
                            </Table.Body>
                        </Table>  </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default ViewUserRating;