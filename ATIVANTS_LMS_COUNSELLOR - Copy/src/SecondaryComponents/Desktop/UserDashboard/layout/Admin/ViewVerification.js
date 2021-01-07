// import React from 'react';
// import {
//     Button, Form, Header, Image, Input,
//     Dropdown, Grid, Modal,
//     Message, Segment, Card, Img, Icon,
//     Table, Label, Container, List, Popup
// } from "semantic-ui-react";
// import { ToastContainer, toast } from 'react-toastify'; 
// import {baseURLAPI ,baseURL }from "../../../../../Global";
// const axios = require('axios');
// class ViewVerification extends React.Component {
//     state = {
//         loading:true,
//         requests: [],
//         openModel: false,
//         totalRequests :0
//     }

//     componentDidMount() {
//        this.setTable();
    
          
//     } 
//     setTable = ( ) => {
      
//         axios.get(baseURLAPI+'/verification/getCounsellors/', {
//             headers: {
//                 jwtToken: localStorage.jwtToken
//             },
//             data: {
//                 userID: localStorage.userID

//             }
//         })
//             .then((res) => {
//                 const requests = res.data;
//                console.log("requests");
//                console.log(requests);
//                 const openModel = false;
                
//                 this.setState({ requests, openModel });
//                 this.setState({ 
//                     loading:false,
                    
//                 });
//             })
//             .catch(function (error) {
//                 console.log(error);
//                 console.log("requests"); 
//                 this.setState({ 
//                     loading:false,
                    
//                 });
//             }); 
         
//     }


//     acceptRequest = (requestID, response) => {
//         console.log(requestID);
//         console.log(response);
//         if (Number.isInteger(parseInt(localStorage.userID) )   ){  



//         var data = {
//             requestID: requestID,
//             response: response,
//             counsellorID: localStorage.userID
//         };

//         var options = {
//             headers: {
//                 jwtToken: localStorage.jwtToken,
//             }
//         };
//         axios.get(baseURLAPI+'/request/google/get',
//             {
//                 params: {
//                     requestID: requestID,
//                     response: response,
//                     counsellorID: localStorage.userID
//                 }
//             })
//             .then((res) => {
             
//                 if (res.status == 200) {
//                     toast.success('Request accepted successfully!', {
//                         position: "top-right",
//                         autoClose: 3000,
//                         hideProgressBar: true,
//                         closeOnClick: true,
//                         pauseOnHover: false,
//                         draggable: true,
//                         progress: '',
//                     });

                   
//                 }
//                 else {
//                     toast.error(res.data.message, {
//                         position: "top-right",
//                         autoClose: 3000,
//                         hideProgressBar: true,
//                         closeOnClick: true,
//                         pauseOnHover: false,
//                         draggable: true,
//                         progress: '',
//                     });
//                 }
//             })
//             .catch(function (error) {
//                 console.log(error);
//                 toast.error("please sign-in to your google calendar", {
//                     position: "top-right",
//                     autoClose: 3000,
//                     hideProgressBar: true,
//                     closeOnClick: true,
//                     pauseOnHover: false,
//                     draggable: true,
//                     progress: '',
//                 });
//             });
//         }else {

//             toast.error("session expired.Please relogin", {
//                 position: "top-right",
//                 autoClose: 3000,
//                 hideProgressBar: true,
//                 closeOnClick: true,
//                 pauseOnHover: false,
//                 draggable: true,
//                 progress: '',
//             });


//         }    this.setTable();
//     };

//     render() {
//         return (
//             <Grid columns='equal' divided>

//                 <Grid.Row textAlign='center'>
//                     <Grid.Column>
//                         <Container>
//                             <h1>Counsellors for verification</h1>
                             
                              
//                                 { 
//                         this.state.loading ? (<Segment>
//                                             <div textAlign="center">
//                                             <h3>  Page is loading... </h3>
//                                               <Icon size = "huge" loading name='spinner' />
//                                               </div>       </Segment>
//                                       ):( <Table basic='very' celled collapsing>
//                                       <Table.Header>
//                                           <Table.Row>
//                                               <Table.HeaderCell>Counsellor</Table.HeaderCell>
//                                               <Table.HeaderCell>Counsellee Name </Table.HeaderCell>
//                                               <Table.HeaderCell>Counsellee Email </Table.HeaderCell>
//                                               <Table.HeaderCell>Session Date </Table.HeaderCell>
//                                               <Table.HeaderCell>Session Start Time </Table.HeaderCell>
//                                               <Table.HeaderCell>Session End Time </Table.HeaderCell>
//                                               <Table.HeaderCell>Session Time Zone </Table.HeaderCell>
//                                               <Table.HeaderCell>Options</Table.HeaderCell>
//                                           </Table.Row>
//                                       </Table.Header>  <Table.Body>
//                                             {this.state.requests.length > 0 ? (
//                                         this.state.requests.map((details, index) => (
//                                             <Table.Row>
//                                                 <Table.Cell>
//                                                     {details.id}
//                                                 </Table.Cell>
//                                                 <Table.Cell>
//                                                     {details.TX_USER_NAME}
//                                                 </Table.Cell>
//                                                 <Table.Cell>
//                                                     {details.TX_USER_EMAIL}
//                                                 </Table.Cell>

//                                                 <Table.Cell>
//                                                     {details.ct_session_date}
//                                                 </Table.Cell>
//                                                 <Table.Cell>
//                                                     {details.ct_session_start_time}
//                                                 </Table.Cell>
//                                                 <Table.Cell>
//                                                     {details.ct_session_end_time}
//                                                 </Table.Cell>
//                                                 <Table.Cell>
//                                                     {details.ct_counsellor_timezone_code}
//                                                 </Table.Cell>
//                                                 <Table.Cell>
//                                                 <button   class="ui positive button"   onClick={() => this.acceptRequest(details.id, 1)}><Icon name='check' /> Accept </button>
 
//                                                 </Table.Cell>    <Table.Cell>
//                                                 <button class="ui negative button"  onClick={() => this.acceptRequest(details.id, 0)} ><Icon name='close' /> Decline </button>
                                                   
//                                                 </Table.Cell>    
//                                             </Table.Row>))
//                                     ) :
//                                         (
//                                             <Table.Row>
//                                                 <Table.Cell>
//                                                     No requests found for you today
//                                         </Table.Cell>
//                                             </Table.Row>
//                                         )
//                                     }
//                                          </Table.Body> </Table> )  }

                                   
                             
                           
//                         </Container>
//                     </Grid.Column>
//                 </Grid.Row>
//             </Grid>
//         )
//     }
// }

// export default ViewVerification;











import React, { useState, useContext, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  Form,
  Modal,
  Header,
  Image,
  Input,
  Dropdown,
  Grid,Tab,
  Message,
  Accordion,
  Icon,
  Segment,
  Card,
  Img,
  Rating,
  Table,
  Label,
  Container,
  List,
  Popup,
} from "semantic-ui-react";
import CreateSession from "../CounsellorCreateSessionModel";

import CreateMessage from "../CounsellorCreateMessageModel";

import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { baseURLAPI, baseURL } from "../../../../../Global";
import { Slider } from "react-semantic-ui-range";
const axios = require("axios");
const dayOptions = [
  { key: "Monday", text: "Monday", value: "Monday" },
  { key: "Tuesday", text: "Tuesday", value: "Tuesday" },
  { key: "Wednesday", text: "Wednesday", value: "Wednesday" },
  { key: "Thursday", text: "Thursday", value: "Thursday" },
  { key: "Friday", text: "Friday", value: "Friday" },
  { key: "Saturday", text: "Saturday", value: "Saturday" },
  { key: "Anyday", text: "Anyday", value: "Anyday" },
];

var priceRange = [];
var dayCheck;
var subjectCheck;
var k = 0;
for (var i = 0; k < 1000; i++) {
  priceRange.push({ key: i, text: k, value: k });
  k += 50;
}
class ViewVerification extends React.Component {
  state = {
    loading: true,
    activeIndex: 0,
    post: [],
    allPosts: [],
    minValue: 0,
    showVideo: false,
    videoURL: {},
    maxValue: 0,
    counsellingSubjectName: 0,
    counsellingSubjectNameOptions: [],
    counsellingDayName: 0,
    showMessage: false,
    show: false,
    messagePerson: "",
    messageCounsellorID: " ",
    sessionCounsellorID: " ",
    sessionPerson: " ",
    userID: "",
    displayReview: 2,
    sort: "Date-down",
    sortOptions: [
      {
        key: "Review-down",
        text: "Review ",
        value: "Review-down",
        icon: "sort numeric descending",
      },
      {
        key: "Review-up",
        text: "Review   ",
        value: "Review-up",
        icon: "sort numeric ascending",
      },

      {
        key: "Name-down",
        text: "Name   ",
        value: "Name-down",
        icon: "sort alphabet descending",
      },
      {
        key: "Name-up",
        text: "Name ",
        value: "Name-up",
        icon: "sort alphabet ascending",
      },

      {
        key: "Price-down",
        text: "Price ",
        value: "Price-down",
        icon: "sort numeric descending",
      },
      {
        key: "Price-up",
        text: "Price ",
        value: "Price-up",
        icon: "sort numeric ascending",
      },
    ],

    panes : [
        {
          menuItem: "Pending Approval",
          render: () => 
            <Tab.Pane> 
                     <Container>
              {this.state.post.length > 0 && (
                <div
                  style={{
                    color: "black",
                    float: "right",
                    paddingBottom: "1%",
                    paddingLeft: "1%",
                  }}
                >
                  Sort By {"  "}
                  <Dropdown
                    inline
                    options={this.state.sortOptions}
                    value={this.state.sort}
                    onChange={this.sortbydate}
                  />
                </div>
              )}

              {this.state.loading ? (
                <Segment>
                  <div textAlign="center">
                    <h3> Page is loading... </h3>
                    <Icon size="huge" loading name="spinner" />
                  </div>{" "}
                </Segment>
              ) : (
                <div></div>
              )}

              {this.state.post.map((person, index) => (
  <div>

{ parseInt( person.counsellor_details[0].CT_COUNSELLOR_VERIFIED)  == 0 &&(   <div class="ui card" style={{ width: "100%" }}>
                  <Modal
                    onClose={() => this.setState({ showMessage: false })}
                    onOpen={() => this.setState({ showMessage: true })}
                    open={this.state.showMessage}
                  >
                    <Modal.Header>Message to counsellor</Modal.Header>
                    <Modal.Content>
                      <Modal.Description>
                        <CreateMessage
                          CounsellorID={this.state.messageCounsellorID}
                          person={this.state.messagePerson}
                          UserID={this.state.userID}
                        />
                      </Modal.Description>
                    </Modal.Content>
                  </Modal>
                  <Modal
                    closeIcon
                    onClose={() => this.setState({ show: false })}
                    onOpen={() => this.setState({ show: true })}
                    open={this.state.show}
                  >
                    <Modal.Header>Create a session request</Modal.Header>
                    <Modal.Content>
                      {/* <Image style={{ padding: '5%' }} size='medium' src={person.counselling_introduction[0].ct_counsellor_photo} wrapped /> */}
                      <Modal.Description>
                        <CreateSession
                          CounsellorID={this.state.sessionCounsellorID}
                          person={this.state.sessionPerson}
                          UserID={this.state.userID}
                        />
                      </Modal.Description>
                    </Modal.Content>
                  </Modal>{" "}
                  <Modal
                    closeIcon
                    onClose={() => this.setState({ showMessage: false })}
                    onOpen={() => this.setState({ showMessage: true })}
                    open={this.state.showMessage}
                  >
                    <Modal.Header>Message to counsellor</Modal.Header>
                    <Modal.Content>
                      <Modal.Description>
                        <CreateMessage
                          CounsellorID={this.state.messageCounsellorID}
                          person={this.state.messagePerson}
                          UserID={this.state.userID}
                        />
                      </Modal.Description>
                    </Modal.Content>
                  </Modal>
                  <Modal
                    closeIcon
                    onClose={() => this.setState({ showVideo: false })}
                    onOpen={() => this.setState({ showVideo: true })}
                    open={this.state.showVideo}
                  >
                    <Modal.Content>
                      <h2>Counsellor Introduction Video</h2>
                      <Segment textAlign="center">
                        {this.state.videoURL ? (
                          <iframe
                            width="900"
                            height="400"
                            src={this.state.videoURL}
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                          ></iframe>
                        ) : (
                          <p style={{ color: "red" }}>No video was provided</p>
                        )}
                      </Segment>
                    </Modal.Content>
                  </Modal>
                  <Card style={{ width: "100%" }}>
                    <Card.Content>
                      <div style={{ float: "left", paddingRight: "2%" }}>
                        <Image
                          width="200px"
                          bordered
                          src={
                            person.counselling_introduction[0]
                              .ct_counsellor_photo
                          }
                          verticalAlign="top"
                        />{" "}
                       
                      </div>

                      {/* <Image
                        width="200px"
                        style={{ padding: "5%", float: "left" }}
                        src={
                          person.counselling_introduction[0].ct_counsellor_photo
                        }
                        // wrapped
                        // ui={true}
                        label={{
                          as: 'a',
                          position:"top right",
                          content:

                            person.counsellor_details[0].FavisAvailable == '1' ?
                              (<Icon id={person.counsellor_details[0].CT_COUNSELLOR_ID} onClick={() => this.removetoFav(person)} color='red' size='large' name='heart' />
                              )
                              :
                              (<Icon color='grey' id={person.counsellor_details[0].CT_COUNSELLOR_ID} onClick={() => this.addtoFav(person)} size='large' name='heart' />
                              )
                          ,

                        }}

                      /> */}

                      <div style={{ width: "20%", float: "right" }}>
                        <Table floated="right" basic="very" collapsing>
                          <Table.Body>
                           
                            <Table.Row>
                              <Table.Cell colspan="2">
                                {" "}
                                <Button
                                  style={{ width: "100%" }}
                                  onClick={() => this.updateUser(person, 1 )}
                                >
                                  <Icon name="check" />
                                  Accept User
                                </Button>
                              </Table.Cell>
                            </Table.Row><Table.Row>
                              <Table.Cell colspan="2">
                                {" "}
                                <Button
                                  style={{ width: "100%" }}
                                  onClick={() => this.updateUser(person,2)}
                                >
                                  <Icon name="check" />
                                  Decline User
                                </Button>
                              </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell colspan="2">
                                <Button
                                  style={{ width: "100%" }}
                                  onClick={() => this.messageModel(person)}
                                >
                                  {" "}
                                  <Icon name="inbox" />
                                  Send a message
                                </Button>
                              </Table.Cell>
                            </Table.Row>
                            {person.counselling_introduction[0]
                              .ct_counsellor_video_url ? (
                              <Table.Row>
                                <Table.Cell colspan="2">
                                  <Button
                                    style={{ width: "100%" }}
                                    onClick={() => this.videoModel(person)}
                                    color="youtube"
                                  >
                                    <Icon name="youtube" />
                                    View Video
                                  </Button>
                                </Table.Cell>
                              </Table.Row>
                            ) : (
                              // <iframe width="600" height="315" src={COUNSELLOR_VIDEO_URL}>
                              // </iframe>

                              <p style={{ color: "red" }}></p>
                            )}
                          </Table.Body>
                        </Table>
                      </div>
                      <div
                        style={{
                          float: "left",
                          width: "50%",
                          textAlign: "left",
                        }}
                      >
                        <Card.Header>
                          {" "}
                          <List size="large" horizontal>
                            <List.Item as="a">
                              {" "}
                              {person.counsellor_details[0].CT_FIRST_NAME}{" "}
                            </List.Item>
                            <List.Item as="a">
                              {person.counsellor_details[0].CT_LAST_NAME}{" "}
                            </List.Item>
                          </List>
                        </Card.Header>
                        <Card.Description>
                          <strong>My Counselling Group(s)</strong>
                          {person.counselling_details.map((details, index) => (
                            <p>
                              <span>
                                {" "}
                                {details.ct_counselling_level_name} -{" "}
                                {details.ct_counselling_subject_name} - S$
                                {details.ct_counsellor_hourly_rate}{" "}
                              </span>
                            </p>
                          ))}
                          <strong>My Qualification</strong>
                          {person.counselling_education.map(
                            (details, index) => (
                              <p>
                                <span>
                                  {" "}
                                  {details.ct_qualification_name} -{" "}
                                  {details.ct_institute_name}{" "}
                                </span>
                              </p>
                            )
                          )}
                          <strong>
                            {
                              person.counselling_introduction[0]
                                .ct_counsellor_headline
                            }
                          </strong>
                          <p>
                            {
                              person.counselling_introduction[0]
                                .ct_counsellor_about_description
                            }
                          </p>
                        </Card.Description>
                      </div>
                    </Card.Content>
                    <Card.Content extra>
                      <Accordion>
                        <Accordion.Title
                          active={this.state.activeIndex === index}
                          index={index}
                          onClick={this.handleClick}
                        >
                          <Icon name="dropdown" />
                          Read More{" "}
                        </Accordion.Title>
                        <Accordion.Content active={this.state.activeIndex === index}>
                          <Segment>
                            <h2>Available Counselling Sessions</h2>
                            <div
                              style={{
                                position: "relative",
                              }}
                            >
                              {this.state.activeIndex === index && (
                                <FullCalendar
                                  expandRows={true}
                                  handleWindowResize={true}
                                  nowIndicator={false}
                                  plugins={[
                                    dayGridPlugin,
                                    timeGridPlugin,
                                    interactionPlugin,
                                  ]}
                                  headerToolbar={false}
                                  height={500}
                                  initialView="timeGridWeek"
                                  duration={{ days: 7 }}
                                  dayHeaderFormat={{
                                    weekday: "long",
                                  }}
                                  events={person.calendar}
                                />
                              )}
                            </div> 
                          </Segment>
                        </Accordion.Content>
                      </Accordion>
                    </Card.Content>
                  </Card>
                </div>)     }
             

</div>



              ))}
            </Container>
      </Tab.Pane>,
        },{
            menuItem: "Confirmed Requests",
            render: () => <Tab.Pane> 
        </Tab.Pane>,
          }
      ],
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex, displayReview: 2 });
  };
  loadMore = (person) => {
    console.log(person);
    this.setState({ displayReview: this.state.displayReview + 2 });
  };
  subjectCheck = (subjectCode, post) => {
    var filteredpost = [];
    if (subjectCode == "00") {
      filteredpost = post;
    } else {
      post.forEach(checkEachPost);

      function checkEachPost(item, index) {
        for (let detail of item.counselling_details) {
          if (Number(detail.ct_counselling_subject_code) == subjectCode) {
            filteredpost.push(item);
            break;
          }
        }
      }
    }
    return filteredpost;
  };

  videoModel = (person) => {
    this.setState({
      showVideo: true,
      videoURL: person.counselling_introduction[0].ct_counsellor_video_url,
    });
    console.log(this.state.videoURL);
  };
  dayCheck = (day, post) => {
    var filteredpost = [];
    post.forEach(checkEachPost);
    function checkEachPost(item, index) {
      switch (day) {
        case "Monday":
          if (item.counselling_monday.length > 0) {
            filteredpost.push(item);
          }

          break;
        case "Tuesday":
          if (item.counselling_tuesday.length > 0) {
            filteredpost.push(item);
          }

          break;
        case "Wednesday":
          if (item.counselling_wednesday.length > 0) {
            filteredpost.push(item);
          }
          break;
        case "Thursday":
          if (item.counselling_thursday.length > 0) {
            filteredpost.push(item);
          }
          break;
        case "Friday":
          if (item.counselling_friday.length > 0) {
            filteredpost.push(item);
          }
          break;
        case "Saturday":
          if (item.counselling_saturday.length > 0) {
            filteredpost.push(item);
          }
          break;
        case "Anyday":
          filteredpost.push(item);

          break;
        default:
          break;
      }
    }
    return filteredpost;
  };

  priceRange = (minValue, maxValue, post) => {
    var minPost = [];
    var filteredpost = [];

    post.forEach(checkMinEachPost);
    function checkMinEachPost(item, index) {
      for (let detail of item.counselling_details) {
        if (Number(detail.ct_counsellor_hourly_rate) >= minValue) {
          minPost.push(item);
          break;
        }
      }
    }

    minPost.forEach(checkMaxEachPost);

    function checkMaxEachPost(item, index) {
      for (let detail of item.counselling_details) {
        if (Number(detail.ct_counsellor_hourly_rate) <= maxValue) {
          filteredpost.push(item);
          break;
        }
      }
    }
    console.log(filteredpost);
    return filteredpost;
  };

  levelCheck = (levelCode, post) => {
    var filteredpost = [];
    if (levelCode == "00") {
      filteredpost = post;
    } else {
      post.forEach(checkEachPost);

      function checkEachPost(item, index) {
        for (let detail of item.counselling_details) {
          if (Number(detail.ct_counselling_level_code) == levelCode) {
            filteredpost.push(item);
            break;
          }
        }
      }
    }
    return filteredpost;
  };
  componentDidMount() {
    var counsellingSubjectNameOptions = [
      { key: "00", text: "Any Subject", value: "00" },
    ];

    var counsellingLevelNameOptions = [
      { key: "00", text: "Any Level", value: "00" },
    ];

    axios.get(baseURLAPI+'/verification/getCounsellors/', {
                    headers: {
                        jwtToken: localStorage.jwtToken
                    },
                    data: {
                        userID: localStorage.userID
        
                    }
                })
      .then((res) => {
        const persons = res.data.counsellor;
        const minValue = 0;
        const maxValue = 950;
        const counsellingSubjectName = 2;
        this.setState({
          post: persons,
          allPosts: persons,
          minValue: minValue,
          maxValue: maxValue,
          counsellingSubjectName: "00",
          show: false,
          loading: false,
          counsellingDayName: "Anyday",
          counsellingLevelName: "00",
        });
      });

    axios.get(baseURLAPI + "/form/list").then((res) => {
      var counsellingSubjectNameOptionsArray = res.data.COUNSELLING_SUBJECTS;
      var counsellingLevelNameOptionsArray = res.data.COUNSELLING_LEVELS;
      counsellingSubjectNameOptionsArray.forEach(
        setcounsellingSubjectNameOptions
      );

      function setcounsellingSubjectNameOptions(item, index) {
        counsellingSubjectNameOptions.push({
          key: item.CT_COUNSELLING_SUBJECT_CODE,
          text: item.CT_COUNSELLING_SUBJECT_NAME,
          value: item.CT_COUNSELLING_SUBJECT_CODE,
        });
      }
      counsellingLevelNameOptionsArray.forEach(setcounsellingLevelNameOptions);

      function setcounsellingLevelNameOptions(item, index) {
        counsellingLevelNameOptions.push({
          key: item.CT_COUNSELLING_LEVEL_CODE,
          text: item.CT_COUNSELLING_LEVEL_NAME,
          value: item.CT_COUNSELLING_LEVEL_CODE,
        });
      }
      this.setState({
        counsellingSubjectNameOptions: counsellingSubjectNameOptions,
        counsellingLevelNameOptions: counsellingLevelNameOptions,
        counsellingDayOptions: [],
      });
    });
  }

  _onKeyUp = (e) => {
    // filter post list by description  using onKeyUp function
    var post = [];
    var value = e.target.value.toLowerCase();
    this.state.allPosts.forEach(checkItem);

    function checkItem(item, index) {
      var itemNotPushed = true;

      if (
        item.counselling_introduction[0].ct_counsellor_about_description
          .toLowerCase()
          .includes(value.toLowerCase()) &&
        itemNotPushed
      ) {
        post.push(item);
        console.log("---------------intro----------------");
        itemNotPushed = false;
      }

      if (
        item.counselling_introduction[0].ct_counsellor_headline
          .toLowerCase()
          .includes(value.toLowerCase()) &&
        itemNotPushed
      ) {
        post.push(item);
        console.log("---------------intro----------------");
        itemNotPushed = false;
      }

      if (
        item.counsellor_details[0].CT_FIRST_NAME.toLowerCase().includes(
          value.toLowerCase()
        ) &&
        itemNotPushed
      ) {
        post.push(item);
        itemNotPushed = false;
      }

      if (
        item.counsellor_details[0].CT_LAST_NAME.toLowerCase().includes(
          value.toLowerCase()
        ) &&
        itemNotPushed
      ) {
        post.push(item);
        itemNotPushed = false;
      }

      if (
        item.counsellor_details[0].CT_FIRST_NAME.toLowerCase().includes(
          value.toLowerCase()
        ) &&
        itemNotPushed
      ) {
        post.push(item);
        itemNotPushed = false;
      }
      for (var i = 0; i < item.counselling_education.length; i++) {
        console.log(i);
        console.log(item.counselling_education[i]);
        if (
          item.counselling_education[i].ct_qualification_name
            .toLowerCase()
            .includes(value.toLowerCase()) &&
          itemNotPushed
        ) {
          post.push(item);
          itemNotPushed = false;
        }

        if (
          item.counselling_education[i].ct_institute_name
            .toLowerCase()
            .includes(value.toLowerCase()) &&
          itemNotPushed
        ) {
          post.push(item);
          itemNotPushed = false;
        }
      }
    }

    this.setState({ post: post, searchdata: value });
  };

  resetSearch = () => {
    this.setState({
      minValue: 0,
      searchdata: "",
      maxValue: 950,
      counsellingSubjectName: "00",
      counsellingLevelName: "00",
      counsellingDayName: "Anyday",
    });

    var post = this.priceRange(
      this.state.minValue,
      this.state.maxValue,
      this.state.allPosts
    );
    var filteredpost = this.subjectCheck(
      this.state.counsellingSubjectName,
      post
    );
    var dayfilteredpost = this.dayCheck(
      this.state.counsellingDayName,
      filteredpost
    );

    var levelfilteredpost = this.levelCheck(
      this.state.counsellingLevelName,
      dayfilteredpost
    );

    this.setState({ post: levelfilteredpost });
  };

  _onMaxPrice = (e, data) => {
    var maxValue = data.value;
    var post = this.priceRange(
      this.state.minValue,
      maxValue,
      this.state.allPosts
    );
    var filteredpost = this.subjectCheck(
      this.state.counsellingSubjectName,
      post
    );
    var dayfilteredpost = this.dayCheck(
      this.state.counsellingDayName,
      filteredpost
    );

    var levelfilteredpost = this.levelCheck(
      this.state.counsellingLevelName,
      dayfilteredpost
    );

    this.setState({ post: levelfilteredpost, maxValue: maxValue });
  };

  _onMinPrice = (e, data) => {
    var minValue = data.value;
    var post = this.priceRange(
      minValue,
      this.state.maxValue,
      this.state.allPosts
    );
    var filteredpost = this.subjectCheck(
      this.state.counsellingSubjectName,
      post
    );
    var dayfilteredpost = this.dayCheck(
      this.state.counsellingDayName,
      filteredpost
    );
    var levelfilteredpost = this.levelCheck(
      this.state.counsellingLevelName,
      dayfilteredpost
    );

    this.setState({ post: levelfilteredpost, minValue: minValue });
  };

  _onSubjectChange = (e, data) => {
    var subjectValue = data.value;
    var filteredpost = this.subjectCheck(subjectValue, this.state.allPosts);
    var dayfilteredpost = this.dayCheck(
      this.state.counsellingDayName,
      filteredpost
    );
    var post = this.priceRange(
      this.state.minValue,
      this.state.maxValue,
      dayfilteredpost
    );

    var levelfilteredpost = this.levelCheck(
      this.state.counsellingLevelName,
      post
    );
    this.setState({
      post: levelfilteredpost,
      counsellingSubjectName: subjectValue,
    });
  };

  _onLevelChange = (e, data) => {
    var levelValue = data.value;
    var filteredpost = this.levelCheck(levelValue, this.state.allPosts);
    var dayfilteredpost = this.dayCheck(
      this.state.counsellingDayName,
      filteredpost
    );
    var post = this.priceRange(
      this.state.minValue,
      this.state.maxValue,
      dayfilteredpost
    );
    var filteredpost = this.subjectCheck(
      this.state.counsellingSubjectName,
      post
    );
    this.setState({ post: filteredpost, counsellingLevelName: levelValue });
  };

  _onDayChange = (e, data) => {
    var DayValue = data.value;
    var filteredpost = this.dayCheck(DayValue, this.state.allPosts);
    var pricefilteredpost = this.priceRange(
      this.state.minValue,
      this.state.maxValue,
      filteredpost
    );
    var post = this.subjectCheck(
      this.state.counsellingSubjectName,
      pricefilteredpost
    );

    var levelfilteredpost = this.levelCheck(
      this.state.counsellingLevelName,
      post
    );
    this.setState({ post: levelfilteredpost, counsellingDayName: DayValue });
  };
  messageModel = (person) => {
    this.setState({
      userID: localStorage.userID,
      showMessage: true,
      messageCounsellorID: person.counsellor_details[0].CT_COUNSELLOR_ID,
      messagePerson: person,
    });
  };
  updateUser = (person,responce) => {
    console.log([person,responce]);
    
  };
   

  sortbydate = (e, data) => {
    var dropdownValue = data.value;
    console.log(dropdownValue);
    if (dropdownValue) {
      this.setState({ sort: dropdownValue });
    }
    var sortdata = dropdownValue.split("-");
    console.log(sortdata);

    var points2 = this.state.post;

    if (sortdata[0] == "Review") {
      if (sortdata[1] == "up") {
        points2.sort(function (w, q) {
          var c = w.counselling_average_review;
          var d = q.counselling_average_review;
          return d - c;
        });
      } else {
        points2.sort(function (w, q) {
          var c = w.counselling_average_review;
          var d = q.counselling_average_review;
          return c - d;
        });
      }
    }

    if (sortdata[0] == "Price") {
      if (sortdata[1] == "up") {
        points2.sort(function (w, q) {
          var c = w.counselling_average_price;
          var d = q.counselling_average_price;
          return d - c;
        });
      } else {
        points2.sort(function (w, q) {
          var c = w.counselling_average_price;
          var d = q.counselling_average_price;
          return c - d;
        });
      }
    }

    if (sortdata[0] == "Name") {
      points2.sort(compare);

      function compare(a, b) {
        // Use toUpperCase() to ignore character casing
        var name1 =
          a.counsellor_details[0].CT_FIRST_NAME +
          " " +
          a.counsellor_details[0].CT_LAST_NAME;
        var name2 =
          b.counsellor_details[0].CT_FIRST_NAME +
          " " +
          b.counsellor_details[0].CT_LAST_NAME;

        var bandA = name1.toLowerCase();
        var bandB = name2.toLowerCase();

        let comparison = 0;
        if (bandA > bandB) {
          comparison = 1;
        } else if (bandA < bandB) {
          comparison = -1;
        }
        return comparison;
      }

      if (sortdata[1] == "down") {
        points2.reverse();
      }
    }

    console.log("points2");
    console.log(points2);
    this.setState({ post: points2 });
  };

  render() { 
    return (
      <Grid columns="equal" divided>
        <Grid.Row>
          <Grid.Column>
            <Segment.Group horizontal compact>
              <Segment textAlign="center">
                <Input
                  icon="search"
                  fluid
                  onChange={this._onKeyUp}
                  placeholder="Search"
                  value={this.state.searchdata}
                />
              </Segment>

              <Segment>
                <div>
                  Price Range : {"    "}
                  <Dropdown
                    style={{ paddingLeft: "5%", paddingRight: "5%" }}
                    value={this.state.minValue}
                    options={priceRange}
                    onChange={this._onMinPrice}
                    placeholder="min"
                  />
                  -
                  <Dropdown
                    style={{ paddingLeft: "5%" }}
                    value={this.state.maxValue}
                    options={priceRange}
                    onChange={this._onMaxPrice}
                    placeholder="max"
                  />
                </div>
              </Segment>

              <Segment>
                <div>
                  {" "}
                  Level : {"    "}
                  <Dropdown
                    value={this.state.counsellingLevelName}
                    options={this.state.counsellingLevelNameOptions}
                    onChange={this._onLevelChange}
                  />
                </div>
              </Segment>
              <Segment>
                {" "}
                <div>
                  {" "}
                  Subject : {"    "}
                  <Dropdown
                    value={this.state.counsellingSubjectName}
                    options={this.state.counsellingSubjectNameOptions}
                    onChange={this._onSubjectChange}
                  />
                </div>
              </Segment>
              <Segment>
                {" "}
                <div>
                  Available day : {"    "}
                  <Dropdown
                    value={this.state.counsellingDayName}
                    options={dayOptions}
                    onChange={this._onDayChange}
                  />
                  <div style={{ paddingLeft: "2px", float: "right" }}>
                    <Label
                      size="large"
                      as="a"
                      color="blue"
                      onClick={this.resetSearch}
                    >
                      Clear search  
                    </Label>
                  </div>
                </div>{" "}
              </Segment>
            </Segment.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row textAlign="center">
          <Grid.Column>
        

            
            <Tab
              fluid
              menu={{
                widths: 3,
                color: "teal",
                attached: false,
                tabular: false,
              }}
          
              style={{
                width: "60%",
                margin: "auto",
              }}
          
              panes={this.state.panes}
            />



          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default ViewVerification;
