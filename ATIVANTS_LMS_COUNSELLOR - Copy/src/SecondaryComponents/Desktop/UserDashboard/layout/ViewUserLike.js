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
  Grid,
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
import CreateSession from "./CounsellorCreateSessionModel";

import CreateMessage from "./CounsellorCreateMessageModel";

import { baseURLAPI, baseURL } from "../../../../Global";
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
class ViewUserLike extends React.Component {
  state = {
    loading: true,
    activeIndex: 0,
    post: [],
    allPosts: [],
    minValue: 0,
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
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
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

  componentDidMount() {
    var counsellingSubjectNameOptions = [
      { key: "00", text: "Any Subject", value: "00" },
    ];

    axios.get(baseURLAPI + '/favourites/userfavourites/' + localStorage.userID)
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
        });
      });

    axios.get(baseURLAPI + "/form/list").then((res) => {
      var counsellingSubjectNameOptionsArray = res.data.COUNSELLING_SUBJECTS;

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

      this.setState({
        counsellingSubjectNameOptions: counsellingSubjectNameOptions,
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
        item.counselling_introduction[0].ct_counsellor_about_description
          .toLowerCase()
          .includes(value.toLowerCase()) &&
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

      if (
        item.counsellor_details[0].CT_LAST_NAME.toLowerCase().includes(
          value.toLowerCase()
        ) &&
        itemNotPushed
      ) {
        post.push(item);
        itemNotPushed = false;
      }
    }

    this.setState({ post });
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
    this.setState({ post: dayfilteredpost, maxValue: maxValue });
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
    this.setState({ post: dayfilteredpost, minValue: minValue });
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
    this.setState({ post: post, counsellingSubjectName: subjectValue });
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
    this.setState({ post: post, counsellingDayName: DayValue });
  };
  messageModel = (person) => {
    this.setState({
      userID: localStorage.userID,
      showMessage: true,
      messageCounsellorID: person.counsellor_details[0].CT_COUNSELLOR_ID,
      messagePerson: person,
    });
  };
  sessionModel = (person) => {
    console.log("sdfasfsdf");
    this.setState({
      userID: localStorage.userID,
      show: true,
      sessionCounsellorID: person.counsellor_details[0].CT_COUNSELLOR_ID,
      sessionPerson: person,
    });
  };
  addtoFav = (person) => {



    console.log(person.counsellor_details);
    const headers = {
      jwtToken: localStorage.jwtToken,
    };
    const data = {
      userID: localStorage.userID,
      favouriteID: person.counsellor_details[0].CT_COUNSELLOR_ID,
    };
    console.log(data);
    axios
      .post(
        baseURLAPI + "/favourites/addFavorites",
        { formData: data },
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res);
        document.getElementById(person.counsellor_details[0].CT_COUNSELLOR_ID).className = "red heart large icon";

        toast.success("Successfully added to favourites!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: "",
        });
      })
      .catch(function (error) {
        console.log(error);
        toast.error("An error occurred!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: "",
        });
      });
  };
  removetoFav = (person) => {

    const headers = {
      jwtToken: localStorage.jwtToken,
    };
    const data = {
      userID: localStorage.userID,
      favouriteID: person.counsellor_details[0].CT_COUNSELLOR_ID,
    };
    console.log(data);
    axios
      .post(
        baseURLAPI + "/favourites/removeFavorites",
        { formData: data },
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res);

        toast.success("Successfully removed to favourites!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: "",
        });
      })
      .catch(function (error) {
        console.log(error);
        toast.error("An error occurred!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: "",
        });
      });



    var post = [];

    this.state.allPosts.forEach(checkItem);

    function checkItem(item, index) {
      var itemNotPushed = true;

      console.log(parseInt(item.counsellor_details[0].CT_COUNSELLOR_ID));

      console.log(parseInt(person.counsellor_details[0].CT_COUNSELLOR_ID));

      console.log(parseInt(item.counsellor_details[0].CT_COUNSELLOR_ID) == parseInt(person.counsellor_details[0].CT_COUNSELLOR_ID));
      console.log(parseInt(item.counsellor_details[0].CT_COUNSELLOR_ID) == parseInt(person.counsellor_details[0].CT_COUNSELLOR_ID));
      if (!(parseInt(item.counsellor_details[0].CT_COUNSELLOR_ID) == parseInt(person.counsellor_details[0].CT_COUNSELLOR_ID))) {
        post.push(item);

      }
    }
    this.setState({ post: post });

  };
  render() {
    const { activeIndex } = this.state;

    return (
      <Grid columns="equal" divided>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <Input
                type="search"
                onChange={this._onKeyUp}
                name="s"
                id="s"
                placeholder="Search"
              />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Dropdown
                value={this.state.minValue}
                options={priceRange}
                onChange={this._onMinPrice}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Dropdown
                value={this.state.maxValue}
                options={priceRange}
                onChange={this._onMaxPrice}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Dropdown
                value={this.state.counsellingSubjectName}
                options={this.state.counsellingSubjectNameOptions}
                onChange={this._onSubjectChange}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Dropdown
                value={this.state.counsellingDayName}
                options={dayOptions}
                onChange={this._onDayChange}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row textAlign="center">
          <Grid.Column>
            <Container>
              {this.state.loading ? (
                <Segment>
                  <div textAlign="center">
                    <h3> Page is loading........... </h3>
                    <Icon size="huge" loading name="spinner" />
                  </div>{" "}
                </Segment>
              ) : (
                  <div></div>
                )}

              {this.state.post.map((person, index) => (
                <div class="ui card" style={{ width: "100%" }}>
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
                  <Card style={{ width: "100%" }}>
                    <Card.Content>



                    <div   style={{ float: "left" , paddingRight:"2%" }} >
                    <Image   width="200px"  bordered 
                        src={  person.counselling_introduction[0].ct_counsellor_photo}  verticalAlign='top' /> <span>{
                          person.counsellor_details[0].FavisAvailable == '1' ?
                          (<Icon id={person.counsellor_details[0].CT_COUNSELLOR_ID} onClick={() => this.removetoFav(person)} color='red' size='large' name='heart' />
                          )
                          :
                          (<Icon color='grey' id={person.counsellor_details[0].CT_COUNSELLOR_ID} onClick={() => this.addtoFav(person)} size='large' name='heart' />
                          )
                          } </span>  
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
                              <Table.Cell>

                                <p>
                                  {" "}
                                  <Rating
                                    icon="star"
                                    defaultRating={
                                      person.counselling_average_review
                                    }
                                    maxRating={5}
                                    disabled
                                  />{" "}
                                  {person.counselling_total_review} reviews{" "}
                                </p>
                              </Table.Cell>
                              <Table.Cell>
                                <p>
                                  {" "}
                                  <Icon
                                    size="big"
                                    name="money bill alternate"
                                  />
                                  <strong>
                                    {" "}
                                    S$ {person.counselling_average_price}{" "}
                                  </strong>{" "}
                                  average per hour{" "}
                                </p>
                              </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell colspan="2">
                                {" "}
                                <Button
                                  style={{ width: "100%" }}
                                  onClick={() => this.sessionModel(person)}
                                >
                                  Session{" "}
                                </Button>
                              </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell colspan="2">
                                <Button
                                  style={{ width: "100%" }}
                                  onClick={() => this.messageModel(person)}
                                >
                                  Message{" "}
                                </Button>
                              </Table.Cell>
                            </Table.Row>
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
                          <List size='large' horizontal  >
                           
                            <List.Item as='a'> {person.counsellor_details[0].CT_FIRST_NAME}{" "} </List.Item>
                            <List.Item as='a'>{person.counsellor_details[0].CT_LAST_NAME}{" "}  </List.Item>

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
                          active={activeIndex === index}
                          index={index}
                          onClick={this.handleClick}
                        >
                          <Icon name="dropdown" />
                          Read More{" "}
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === index}>
                          <Segment>
                            <h2>Counsellor Introduction Video</h2>
                            {person.counselling_introduction[0]
                              .ct_counsellor_video_url ? (
                                <iframe
                                  width="560"
                                  height="315"
                                  src={
                                    person.counselling_introduction[0]
                                      .ct_counsellor_video_url
                                  }
                                  frameborder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowfullscreen
                                ></iframe>
                              ) : (
                                // <iframe width="600" height="315" src={COUNSELLOR_VIDEO_URL}>
                                // </iframe>

                                <p style={{ color: "red" }}>
                                  No video was provided
                                </p>
                              )}
                          </Segment>

                          <Segment>
                            <h2>Available Counselling Sessions</h2>
                            <div
                              style={{
                                float: "left",
                                width: "50%",
                                textAlign: "left",
                                padding: "3%",
                              }}
                            >
                              <h3>Monday</h3>
                              <Table basic="very" celled collapsing>
                                <Table.Header>
                                  <Table.Row>
                                    <Table.HeaderCell>
                                      Session Start Time{" "}
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                      Session End Time{" "}
                                    </Table.HeaderCell>
                                  </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                  {person.counselling_monday.length > 0 ? (
                                    person.counselling_monday.map(
                                      (details, index) =>
                                        details.ct_to && details.ct_from ? (
                                          <Table.Row>
                                            <Table.Cell>
                                              {details.ct_from}
                                            </Table.Cell>
                                            <Table.Cell>
                                              {details.ct_to}
                                            </Table.Cell>
                                          </Table.Row>
                                        ) : (
                                            <Table.Row>
                                              <Table.Cell>
                                                {" "}
                                              No Monday Sessions
                                            </Table.Cell>
                                            </Table.Row>
                                          )
                                    )
                                  ) : (
                                      <Table.Row>
                                        <Table.Cell>
                                          {" "}
                                        No Monday Sessions
                                      </Table.Cell>
                                      </Table.Row>
                                    )}
                                </Table.Body>
                              </Table>
                            </div>
                            <div
                              style={{
                                float: "right",
                                width: "50%",
                                textAlign: "left",
                                padding: "3%",
                              }}
                            >
                              <h3>Tuesday</h3>
                              <Table basic="very" celled collapsing>
                                <Table.Header>
                                  <Table.Row>
                                    <Table.HeaderCell>
                                      Session Start Time{" "}
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                      Session End Time{" "}
                                    </Table.HeaderCell>
                                  </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                  {person.counselling_tuesday.length > 0 ? (
                                    person.counselling_tuesday.map(
                                      (details, index) =>
                                        details.ct_to && details.ct_from ? (
                                          <Table.Row>
                                            <Table.Cell>
                                              {details.ct_from}
                                            </Table.Cell>
                                            <Table.Cell>
                                              {details.ct_to}
                                            </Table.Cell>
                                          </Table.Row>
                                        ) : (
                                            <Table.Row>
                                              <Table.Cell>
                                                {" "}
                                              No Tuesday Sessions
                                            </Table.Cell>
                                            </Table.Row>
                                          )
                                    )
                                  ) : (
                                      <Table.Row>
                                        <Table.Cell>
                                          {" "}
                                        No Tuesday Sessions
                                      </Table.Cell>
                                      </Table.Row>
                                    )}
                                </Table.Body>
                              </Table>
                            </div>
                            <div
                              style={{
                                float: "left",
                                width: "50%",
                                textAlign: "left",
                                padding: "3%",
                              }}
                            >
                              <h3>Wednesday</h3>
                              <Table basic="very" celled collapsing>
                                <Table.Header>
                                  <Table.Row>
                                    <Table.HeaderCell>
                                      Session Start Time{" "}
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                      Session End Time{" "}
                                    </Table.HeaderCell>
                                  </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                  {person.counselling_wednesday.length > 0 ? (
                                    person.counselling_wednesday.map(
                                      (details, index) =>
                                        details.ct_to && details.ct_from ? (
                                          <Table.Row>
                                            <Table.Cell>
                                              {details.ct_from}
                                            </Table.Cell>
                                            <Table.Cell>
                                              {details.ct_to}
                                            </Table.Cell>
                                          </Table.Row>
                                        ) : (
                                            <Table.Row>
                                              <Table.Cell>
                                                {" "}
                                              No Wednesday Sessions
                                            </Table.Cell>
                                            </Table.Row>
                                          )
                                    )
                                  ) : (
                                      <Table.Row>
                                        <Table.Cell>
                                          {" "}
                                        No Wednesday Sessions
                                      </Table.Cell>
                                      </Table.Row>
                                    )}
                                </Table.Body>
                              </Table>
                            </div>
                            <div
                              style={{
                                float: "right",
                                width: "50%",
                                textAlign: "left",
                                padding: "3%",
                              }}
                            >
                              <h3>Thursday</h3>
                              <Table basic="very" celled collapsing>
                                <Table.Header>
                                  <Table.Row>
                                    <Table.HeaderCell>
                                      Session Start Time{" "}
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                      Session End Time{" "}
                                    </Table.HeaderCell>
                                  </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                  {person.counselling_thursday.length > 0 ? (
                                    person.counselling_thursday.map(
                                      (details, index) =>
                                        details.ct_to && details.ct_from ? (
                                          <Table.Row>
                                            <Table.Cell>
                                              {details.ct_from}
                                            </Table.Cell>
                                            <Table.Cell>
                                              {details.ct_to}
                                            </Table.Cell>
                                          </Table.Row>
                                        ) : (
                                            <Table.Row>
                                              <Table.Cell>
                                                {" "}
                                              No Thursay Sessions
                                            </Table.Cell>
                                            </Table.Row>
                                          )
                                    )
                                  ) : (
                                      <Table.Row>
                                        <Table.Cell>
                                          {" "}
                                        No Thursay Sessions
                                      </Table.Cell>
                                      </Table.Row>
                                    )}
                                </Table.Body>
                              </Table>
                            </div>
                            <div
                              style={{
                                float: "left",
                                width: "50%",
                                textAlign: "left",
                                padding: "3%",
                              }}
                            >
                              <h3>Friday</h3>
                              <Table basic="very" celled collapsing>
                                <Table.Header>
                                  <Table.Row>
                                    <Table.HeaderCell>
                                      Session Start Time{" "}
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                      Session End Time{" "}
                                    </Table.HeaderCell>
                                  </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                  {person.counselling_friday.length > 0 ? (
                                    person.counselling_friday.map(
                                      (details, index) =>
                                        details.ct_to && details.ct_from ? (
                                          <Table.Row>
                                            <Table.Cell>
                                              {details.ct_from}
                                            </Table.Cell>
                                            <Table.Cell>
                                              {details.ct_to}
                                            </Table.Cell>
                                          </Table.Row>
                                        ) : (
                                            <Table.Row>
                                              <Table.Cell>
                                                {" "}
                                              No Friday Sessions
                                            </Table.Cell>
                                            </Table.Row>
                                          )
                                    )
                                  ) : (
                                      <Table.Row>
                                        <Table.Cell>
                                          {" "}
                                        No Friday Sessions
                                      </Table.Cell>
                                      </Table.Row>
                                    )}
                                </Table.Body>
                              </Table>
                            </div>

                            <div
                              style={{
                                float: "right",
                                width: "50%",
                                textAlign: "left",
                                padding: "3%",
                              }}
                            >
                              <h3>Saturday</h3>
                              <Table basic="very" celled collapsing>
                                <Table.Header>
                                  <Table.Row>
                                    <Table.HeaderCell>
                                      Session Start Time{" "}
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                      Session End Time{" "}
                                    </Table.HeaderCell>
                                  </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                  {person.counselling_saturday.length > 0 ? (
                                    person.counselling_saturday.map(
                                      (details, index) =>
                                        details.ct_to && details.ct_from ? (
                                          <Table.Row>
                                            <Table.Cell>
                                              {details.ct_from}
                                            </Table.Cell>
                                            <Table.Cell>
                                              {details.ct_to}
                                            </Table.Cell>
                                          </Table.Row>
                                        ) : (
                                            <Table.Row>
                                              <Table.Cell>
                                                {" "}
                                              No Saturday Sessions
                                            </Table.Cell>
                                            </Table.Row>
                                          )
                                    )
                                  ) : (
                                      <Table.Row>
                                        <Table.Cell>
                                          {" "}
                                        No Saturday Sessions
                                      </Table.Cell>
                                      </Table.Row>
                                    )}
                                </Table.Body>
                              </Table>
                              <Container>
                                <h2>Ratings</h2>
                                <Table basic="very" width="100%">
                                  {" "}
                                  <Table.Body>
                                    {person.counsellor_review.length > 0 ? (
                                      person.counsellor_review.map(
                                        (details, index) => (
                                          <Table.Row>
                                            <Table.Cell>
                                              <Message width="100%">
                                                {details.TX_PICTURE ? (
                                                  <div>
                                                    <Image
                                                      src={details.TX_PICTURE}
                                                      avatar
                                                    />
                                                    <strong>
                                                      {" "}
                                                      {
                                                        details.TX_USER_NAME
                                                      }{" "}
                                                    </strong>{" "}
                                                  </div>
                                                ) : (
                                                    <div>
                                                      <Image size="small">
                                                        <Icon
                                                          disabled
                                                          name="user"
                                                        />
                                                        <strong>
                                                          {" "}
                                                          {
                                                            details.TX_USER_NAME
                                                          }{" "}
                                                        </strong>
                                                      </Image>
                                                    </div>
                                                  )}
                                                <Rating
                                                  icon="star"
                                                  defaultRating={
                                                    details.ct_counsellor_stars
                                                  }
                                                  maxRating={5}
                                                  disabled
                                                />{" "}
                                                <br />
                                                <span>
                                                  {" "}
                                                  {
                                                    details.ct_counselling_level_name
                                                  }{" "}
                                                  |{" "}
                                                  {
                                                    details.ct_counselling_subject_name
                                                  }{" "}
                                                </span>
                                                <p>
                                                  {" "}
                                                  {details.ct_counsellor_review}
                                                </p>
                                              </Message>
                                            </Table.Cell>
                                          </Table.Row>
                                        )
                                      )
                                    ) : (
                                        <Table.Row>
                                          <Table.Cell>
                                            {" "}
                                          No Rating for this counsellor yet.....
                                        </Table.Cell>
                                        </Table.Row>
                                      )}{" "}
                                  </Table.Body>
                                </Table>
                              </Container>
                            </div>
                          </Segment>
                        </Accordion.Content>
                      </Accordion>
                    </Card.Content>
                  </Card>
                </div>
              ))}
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default ViewUserLike;
