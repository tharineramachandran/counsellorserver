import React from "react";
import {Menu,
  Button,
  Form,
  Header,
  Image,
  Input,
  Dropdown,
  Grid,
  Modal,
  Placeholder,
  Message,
  Segment,
  Tab,
  Card,
  Img,
  Icon,
  Table,
  Label,
  Container,
  List,
  Popup,
  Rating,
} from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify"; 
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import matthew from "../../../../../../Static/Images/matthew.png";
import { baseURLAPI, baseURL } from "../../../../../../Global";
const axios = require("axios");

class ViewUserRating extends React.Component {
  state = {
    requests: [],
    openModel: false,
    element: {},
    requestID: "",
    feedback: "",
    direction: false,
    rating: "",
    userID: "",
    reviewId: "",
    cousellorID: " ",
    formwarning: "",
    updateopenModel: false,
    deleteModel: false,
    loading: true,
    panes: [],
    sort: "Date-down",
    sortOptions: [
      {
        key: "Date-up",
        text: "Latest First",
        value: "Date-up",
        icon: "clock outline",
      },
      {
        key: "Date-down",
        text: "Earliest First",
        value: "Date-down",
        icon: "clock outline",
      },
      {
        key: "Level-down",
        text: "Counselling Level ",
        value: "Level-down",
        icon: "sort alphabet descending",
      },
      {
        key: "Level-up",
        text: "Counselling Level ",
        value: "Level-up",
        icon: "sort alphabet ascending",
      },
      {
        key: "Subject-down",
        text: "Counselling subject",
        value: "Subject-down",
        icon: "sort alphabet descending",
      },
      {
        key: "Subject-up",
        text: "Counselling subject",
        value: "Subject-up",
        icon: "sort alphabet ascending",
      },
      {
        key: "Counsellor-down",
        text: "Counsellor name",
        value: "Counsellor-down",
        icon: "sort alphabet descending",
      },
      {
        key: "Counsellor-up",
        text: "Counsellor name",
        value: "Counsellor-up",
        icon: "sort alphabet ascending",
      },
    ],

    activeIndex: 0,
  };

  componentDidMount() {
    this.setTable();
  }

  setTable = () => {
    axios
      .get(baseURLAPI + "/rating/userSent/" + localStorage.userID, {
        headers: {
          jwtToken: localStorage.jwtToken,
        },
        data: {
          userID: localStorage.userID,
        },
      })
      .then((res) => {
        const requests = res.data;
        console.log(requests);
        this.setState({ requests: requests, loading: false });
        this.sortbydate("e", { value: "Date-up" });
      })
      .catch(function (error) {
        console.log(error);
      });

    var panes = [

       
      {
        menuItem: "All",
        render: () => (
          <Tab.Pane>
          {this.state.requests.length > 0 && (  
                     <div style={{color:"black" , float : "right",paddingBottom:"1%",paddingLeft:"1%"}}>
              Sort By {"  "}
              <Dropdown
                inline
                options={this.state.sortOptions}
                value={this.state.sort}
                onChange={this.sortbydate}
              />
            </div>)} 

            {this.state.requests.length > 0 ? (
              this.state.requests.map((person, index) => (
                <div style={{ paddingTop: "1%", paddingBottom: "1%" }}>
                  <div
                    
                    style={{ width: "100%", margin: "auto" }}
                  >
                    <Card  style={{ width: "100%"  }}>
                      <Card.Content>
                        <div style={{ float: "left", paddingRight: "2%" }}>
                          {person.TX_PICTURE ? (
                            <Image
                              width="100px"
                              bordered
                              src={person.TX_PICTURE}
                              verticalAlign="top"
                            />
                          ) : (
                            <Image
                              width="100px"
                              bordered
                              src={matthew}
                              verticalAlign="top"
                            />
                          )}
                        </div>

                        {person.review == 1 ? (
                          <div style={{ width: "30%", float: "right" }}>
                            <List floated="right" horizontal>
                              <List.Item>
                                <p style={{ color: "grey" }}>
                                  Posted on :{" "}
                                  {person.review_details.ct_date.substring(
                                    8,
                                    10
                                  )}
                                  /
                                  {person.review_details.ct_date.substring(
                                    5,
                                    7
                                  )}
                                  /
                                  {person.review_details.ct_date.substring(
                                    0,
                                    4
                                  )}
                                </p>
                              </List.Item>
                            </List>
                          </div>
                        ) : (
                          <div style={{ width: "30%", float: "right" }}>
                            <List floated="right" horizontal>
                              <List.Item>
                                <Icon color="blue" name="circle" />
                              </List.Item>
                            </List>
                          </div>
                        )}

                        <div
                          style={{
                            float: "left",
                            width: "50%",
                            textAlign: "left",
                          }}
                        >
                          <div>
                            {person.review == 1 ? (
                              <div>
                                <Card.Header style={{ width: "100%" }}>
                                  <List horizontal>
                                    <List.Item as="a">
                                      {person.TX_USER_NAME}
                                    </List.Item>
                                    <List.Item>
                                      <Rating
                                        icon="star"
                                        rating={
                                          person.review_details
                                            .ct_counsellor_stars
                                        }
                                        maxRating={5}
                                        disabled
                                      />
                                    </List.Item>
                                  </List>
                                </Card.Header>
                                <Card.Description>
                                  <p style={{ color: "grey" }}>
                                    {person.ct_counselling_subject_name} ,{" "}
                                    {person.ct_counselling_level_name}
                                    <br />
                                    {person.ct_session_start_time.substring(
                                      11,
                                      16
                                    )}{" "}
                                    -{" "}
                                    {person.ct_session_end_time.substring(
                                      11,
                                      16
                                    )}{" "}
                                    on {person.ct_session_date.substring(8, 10)}
                                    /{person.ct_session_date.substring(5, 7)}/
                                    {person.ct_session_date.substring(0, 4)}
                                  </p>
                                  <p>
                                    Feedback :{" "}
                                    {person.review_details.ct_counsellor_review}
                                    <br />
                                  </p>{" "}
                                </Card.Description>
               
                              </div>
                            ) : (
                              <div>
                                <Card.Header style={{ width: "100%" }}>
                                  <List horizontal>
                                    <List.Item as="a">
                                      {person.TX_USER_NAME}
                                    </List.Item>
                                  </List>
                                </Card.Header>
                                <Card.Description>
                                  <p
                                    style={{
                                      color: "grey",
                                      paddingBottom: "2%",
                                    }}
                                  >
                                    {person.ct_counselling_subject_name} ,{" "}
                                    {person.ct_counselling_level_name}
                                    <br />
                                    {person.ct_session_start_time.substring(
                                      11,
                                      16
                                    )}{" "}
                                    -{" "}
                                    {person.ct_session_end_time.substring(
                                      11,
                                      16
                                    )}{" "}
                                    on {person.ct_session_date.substring(8, 10)}
                                    /{person.ct_session_date.substring(5, 7)}/
                                    {person.ct_session_date.substring(0, 4)}
                                  </p>{" "}
                                </Card.Description>

                                <Label
                                  size="medium"
                                  as="a"
                                  onClick={() => this.feebackModel(person)}
                                >
                                  {" "}
                                  <Icon name="add circle" size="large" /> Add
                                  Feedback{" "}
                                </Label>
                                <Modal
                                  onClose={() =>
                                    this.setState({
                                      openModel: false,
                                      formwarning: " ",
                                      rating: "",
                                      feedback: "",
                                    })
                                  }
                                  onOpen={() =>
                                    this.setState({
                                      openModel: true,
                                      formwarning: " ",
                                      rating: "",
                                      feedback: "",
                                    })
                                  }
                                  open={this.state.openModel}
                                >
                                  <Modal.Header>Add Rating</Modal.Header>
                                  <Modal.Content>
                                    <Form>
                                      <Form.Group>
                                        <Form.Input
                                          style={{ width: "300px" }}
                                          type="FeedBack"
                                          onChange={this._onKeyUp}
                                          name="m"
                                          id="m"
                                          placeholder="FeedBack"
                                        />{" "}
                                      </Form.Group>
                                      <Form.Group>
                                        <Rating
                                          maxRating={5}
                                          rating={this.state.rating}
                                          onRate={this.handleRate}
                                        />
                                      </Form.Group>
                                      <Form.Group>
                                        {" "}
                                        <Form.Button
                                          style={{ width: "100px" }}
                                          onClick={() => this.sendMessage()}
                                        >
                                          {" "}
                                          Send{" "}
                                        </Form.Button>
                                      </Form.Group>
                                      <strong style={{ color: "red" }}>
                                        {" "}
                                        {this.state.formwarning}
                                      </strong>
                                    </Form>
                                  </Modal.Content>
                                  <Modal.Actions>
                                    <Button
                                      color="black"
                                      onClick={() =>
                                        this.setState({ openModel: false })
                                      }
                                    >
                                      Close
                                    </Button>
                                  </Modal.Actions>
                                </Modal>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card.Content>
                    </Card>
                  </div>{" "}
                </div>
              ))
            ) : this.state.loading ? (
              <div style={{ width: "100%", textAlign: "center" }}>
                <h3> Page is loading.. </h3>
                <Icon size="huge" loading name="spinner" />
              </div>
            ) : (
              <div style={{ width: "100%", textAlign: "center" }}>
                <p style={{ padding: "3%" }}>
                  {" "}
                  No review found. create a session with counsellor to review
                  counsellor
                </p>
              </div>
            )}
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Unreviewed Counsellors",
        render: () => (
          <Tab.Pane>
            {this.state.requests.length > 0 && (  
                     <div style={{color:"black" , float : "right",paddingBottom:"1%",paddingLeft:"1%"}}>
              Sort By {"  "}
              <Dropdown
                inline
                options={this.state.sortOptions}
                value={this.state.sort}
                onChange={this.sortbydate}
              />
            </div>)} 
            {this.state.requests.length > 0 ? (
              this.state.requests.map((person, index) => (
                <div style={{ paddingTop: "1%", paddingBottom: "1%" }}>
                  {person.review == 0 && (
                    <div
                      class="ui card"
                      style={{ width: "100%", margin: "auto" }}
                    >
                      <Card style={{ width: "100%" }}>
                        <Card.Content>
                          <div style={{ float: "left", paddingRight: "2%" }}>
                            {person.TX_PICTURE ? (
                              <Image
                                width="100px"
                                bordered
                                src={person.TX_PICTURE}
                                verticalAlign="top"
                              />
                            ) : (
                              <Image
                                width="100px"
                                bordered
                                src={matthew}
                                verticalAlign="top"
                              />
                            )}
                          </div>

                          {person.review == 1 ? (
                            <div style={{ width: "30%", float: "right" }}>
                              <List floated="right" horizontal>
                                <List.Item>
                                  <p style={{ color: "grey" }}>
                                    Posted on :{" "}
                                    {person.review_details.ct_date.substring(
                                      8,
                                      10
                                    )}
                                    /
                                    {person.review_details.ct_date.substring(
                                      5,
                                      7
                                    )}
                                    /
                                    {person.review_details.ct_date.substring(
                                      0,
                                      4
                                    )}
                                  </p>
                                </List.Item>
                              </List>
                            </div>
                          ) : (
                            <div style={{ width: "30%", float: "right" }}>
                              <List floated="right" horizontal>
                                <List.Item>
                                  <Icon color="blue" name="circle" />
                                </List.Item>
                              </List>
                            </div>
                          )}

                          <div
                            style={{
                              float: "left",
                              width: "50%",
                              textAlign: "left",
                            }}
                          >
                            <div>
                              {person.review == 1 ? (
                                <div>
                                  <Card.Header style={{ width: "100%" }}>
                                    <List horizontal>
                                      <List.Item as="a">
                                        {person.TX_USER_NAME}
                                      </List.Item>
                                      <List.Item>
                                        <Rating
                                          icon="star"
                                          rating={
                                            person.review_details
                                              .ct_counsellor_stars
                                          }
                                          maxRating={5}
                                          disabled
                                        />
                                      </List.Item>
                                    </List>
                                  </Card.Header>
                                  <Card.Description>
                                    <p style={{ color: "grey" }}>
                                      {person.ct_counselling_subject_name} ,{" "}
                                      {person.ct_counselling_level_name}
                                      <br />
                                      {person.ct_session_start_time.substring(
                                        11,
                                        16
                                      )}{" "}
                                      -{" "}
                                      {person.ct_session_end_time.substring(
                                        11,
                                        16
                                      )}{" "}
                                      on{" "}
                                      {person.ct_session_date.substring(8, 10)}/
                                      {person.ct_session_date.substring(5, 7)}/
                                      {person.ct_session_date.substring(0, 4)}
                                    </p>
                                    <p>
                                      Feedback :{" "}
                                      {
                                        person.review_details
                                          .ct_counsellor_review
                                      }
                                      <br />
                                    </p>{" "}
                                  </Card.Description>
                                </div>
                              ) : (
                                <div>
                                  <Card.Header style={{ width: "100%" }}>
                                    <List horizontal>
                                      <List.Item as="a">
                                        {person.TX_USER_NAME}
                                      </List.Item>
                                    </List>
                                  </Card.Header>
                                  <Card.Description>
                                    <p
                                      style={{
                                        color: "grey",
                                        paddingBottom: "2%",
                                      }}
                                    >
                                      {person.ct_counselling_subject_name} ,{" "}
                                      {person.ct_counselling_level_name}
                                      <br />
                                      {person.ct_session_start_time.substring(
                                        11,
                                        16
                                      )}{" "}
                                      -{" "}
                                      {person.ct_session_end_time.substring(
                                        11,
                                        16
                                      )}{" "}
                                      on{" "}
                                      {person.ct_session_date.substring(8, 10)}/
                                      {person.ct_session_date.substring(5, 7)}/
                                      {person.ct_session_date.substring(0, 4)}
                                    </p>{" "}
                                  </Card.Description>

                                  <Label
                                    size="medium"
                                    as="a"
                                    onClick={() => this.feebackModel(person)}
                                  >
                                    {" "}
                                    <Icon name="add circle" size="large" /> Add
                                    Feedback{" "}
                                  </Label>
                                  <Modal
                                    onClose={() =>
                                      this.setState({
                                        openModel: false,
                                        formwarning: " ",
                                        rating: "",
                                        feedback: "",
                                      })
                                    }
                                    onOpen={() =>
                                      this.setState({
                                        openModel: true,
                                        formwarning: " ",
                                        rating: "",
                                        feedback: "",
                                      })
                                    }
                                    open={this.state.openModel}
                                  >
                                    <Modal.Header>Add Rating</Modal.Header>
                                    <Modal.Content>
                                      <Form>
                                        <Form.Group>
                                          <Form.Input
                                            style={{ width: "300px" }}
                                            type="FeedBack"
                                            onChange={this._onKeyUp}
                                            name="m"
                                            id="m"
                                            placeholder="FeedBack"
                                          />{" "}
                                        </Form.Group>
                                        <Form.Group>
                                          <Rating
                                            maxRating={5}
                                            rating={this.state.rating}
                                            onRate={this.handleRate}
                                          />
                                        </Form.Group>
                                        <Form.Group>
                                          {" "}
                                          <Form.Button
                                            style={{ width: "100px" }}
                                            onClick={() => this.sendMessage()}
                                          >
                                            {" "}
                                            Send{" "}
                                          </Form.Button>
                                        </Form.Group>
                                        <strong style={{ color: "red" }}>
                                          {" "}
                                          {this.state.formwarning}
                                        </strong>
                                      </Form>
                                    </Modal.Content>
                                    <Modal.Actions>
                                      <Button
                                        color="black"
                                        onClick={() =>
                                          this.setState({ openModel: false })
                                        }
                                      >
                                        Close
                                      </Button>
                                    </Modal.Actions>
                                  </Modal>
                                </div>
                              )}
                            </div>
                          </div>
                        </Card.Content>
                      </Card>
                    </div>
                  )}
                </div>
              ))
            ) : this.state.loading ? (
              <div style={{ width: "100%", textAlign: "center" }}>
                <h3> Page is loading.. </h3>
                <Icon size="huge" loading name="spinner" />
              </div>
            ) : (
              <div style={{ width: "100%", textAlign: "center" }}>
                <p style={{ padding: "3%" }}>
                  {" "}
                  No review found. create a session with counsellor to review
                  counsellor
                </p>
              </div>
            )}
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Reviewed Counsellors",
        render: () => (
          <Tab.Pane>
            {this.state.requests.length > 0 && (  
            <div style={{color:"black" , float : "right",paddingBottom:"1%",paddingLeft:"1%"}}>
     Sort By {"  "}
     <Dropdown
       inline
       options={this.state.sortOptions}
       value={this.state.sort}
       onChange={this.sortbydate}
     />
   </div>)} 
            {this.state.requests.length > 0 ? (
              this.state.requests.map((person, index) => (
                <div style={{ paddingTop: "1%", paddingBottom: "1%" }}>
                  {person.review == 1 && (
                    <div
                      class="ui card"
                      style={{ width: "100%", margin: "auto" }}
                    >
                      <Card style={{ width: "100%" }}>
                        <Card.Content>
                          <div style={{ float: "left", paddingRight: "2%" }}>
                            {person.TX_PICTURE ? (
                              <Image
                                width="100px"
                                bordered
                                src={person.TX_PICTURE}
                                verticalAlign="top"
                              />
                            ) : (
                              <Image
                                width="100px"
                                bordered
                                src={matthew}
                                verticalAlign="top"
                              />
                            )}
                          </div>

                          {person.review == 1 ? (
                            <div style={{ width: "30%", float: "right" }}>
                              <List floated="right" horizontal>
                                <List.Item>
                                  <p style={{ color: "grey" }}>
                                    Posted on :{" "}
                                    {person.review_details.ct_date.substring(
                                      8,
                                      10
                                    )}
                                    /
                                    {person.review_details.ct_date.substring(
                                      5,
                                      7
                                    )}
                                    /
                                    {person.review_details.ct_date.substring(
                                      0,
                                      4
                                    )}
                                  </p>
                                </List.Item>
                              </List>
                            </div>
                          ) : (
                            <div style={{ width: "30%", float: "right" }}>
                              <List floated="right" horizontal>
                                <List.Item>
                                  <Icon color="blue" name="circle" />
                                </List.Item>
                              </List>
                            </div>
                          )}

                          <div
                            style={{
                              float: "left",
                              width: "50%",
                              textAlign: "left",
                            }}
                          >
                            <div>
                              {person.review == 1 ? (
                                <div>
                                  <Card.Header style={{ width: "100%" }}>
                                    <List horizontal>
                                      <List.Item as="a">
                                        {person.TX_USER_NAME}
                                      </List.Item>
                                      <List.Item>
                                        <Rating
                                          icon="star"
                                          rating={
                                            person.review_details
                                              .ct_counsellor_stars
                                          }
                                          maxRating={5}
                                          disabled
                                        />
                                      </List.Item>
                                    </List>
                                  </Card.Header>
                                  <Card.Description>
                                    <p style={{ color: "grey" }}>
                                      {person.ct_counselling_subject_name} ,{" "}
                                      {person.ct_counselling_level_name}
                                      <br />
                                      {person.ct_session_start_time.substring(
                                        11,
                                        16
                                      )}{" "}
                                      -{" "}
                                      {person.ct_session_end_time.substring(
                                        11,
                                        16
                                      )}{" "}
                                      on{" "}
                                      {person.ct_session_date.substring(8, 10)}/
                                      {person.ct_session_date.substring(5, 7)}/
                                      {person.ct_session_date.substring(0, 4)}
                                    </p>
                                    <p>
                                      Feedback :{" "}
                                      {
                                        person.review_details
                                          .ct_counsellor_review
                                      }
                                      <br />
                                    </p>{" "}
                                  </Card.Description>
                                </div>
                              ) : (
                                <div>
                                  <Card.Header style={{ width: "100%" }}>
                                    <List horizontal>
                                      <List.Item as="a">
                                        {person.TX_USER_NAME}
                                      </List.Item>
                                    </List>
                                  </Card.Header>
                                  <Card.Description>
                                    <p
                                      style={{
                                        color: "grey",
                                        paddingBottom: "2%",
                                      }}
                                    >
                                      {person.ct_counselling_subject_name} ,{" "}
                                      {person.ct_counselling_level_name}
                                      <br />
                                      {person.ct_session_start_time.substring(
                                        11,
                                        16
                                      )}{" "}
                                      -{" "}
                                      {person.ct_session_end_time.substring(
                                        11,
                                        16
                                      )}{" "}
                                      on{" "}
                                      {person.ct_session_date.substring(8, 10)}/
                                      {person.ct_session_date.substring(5, 7)}/
                                      {person.ct_session_date.substring(0, 4)}
                                    </p>{" "}
                                  </Card.Description>

                                  <Label
                                    size="medium"
                                    as="a"
                                    onClick={() => this.feebackModel(person)}
                                  >
                                    {" "}
                                    <Icon name="add circle" size="large" /> Add
                                    Feedback{" "}
                                  </Label>
                                  <Modal
                                    onClose={() =>
                                      this.setState({
                                        openModel: false,
                                        formwarning: " ",
                                        rating: "",
                                        feedback: "",
                                      })
                                    }
                                    onOpen={() =>
                                      this.setState({
                                        openModel: true,
                                        formwarning: " ",
                                        rating: "",
                                        feedback: "",
                                      })
                                    }
                                    open={this.state.openModel}
                                  >
                                    <Modal.Header>Add Rating</Modal.Header>
                                    <Modal.Content>
                                      <Form>
                                        <Form.Group>
                                          <Form.Input
                                            style={{ width: "300px" }}
                                            type="FeedBack"
                                            onChange={this._onKeyUp}
                                            name="m"
                                            id="m"
                                            placeholder="FeedBack"
                                          />{" "}
                                        </Form.Group>
                                        <Form.Group>
                                          <Rating
                                            maxRating={5}
                                            rating={this.state.rating}
                                            onRate={this.handleRate}
                                          />
                                        </Form.Group>
                                        <Form.Group>
                                          {" "}
                                          <Form.Button
                                            style={{ width: "100px" }}
                                            onClick={() => this.sendMessage()}
                                          >
                                            {" "}
                                            Send{" "}
                                          </Form.Button>
                                        </Form.Group>
                                        <strong style={{ color: "red" }}>
                                          {" "}
                                          {this.state.formwarning}
                                        </strong>
                                      </Form>
                                    </Modal.Content>
                                    <Modal.Actions>
                                      <Button
                                        color="black"
                                        onClick={() =>
                                          this.setState({ openModel: false })
                                        }
                                      >
                                        Close
                                      </Button>
                                    </Modal.Actions>
                                  </Modal>
                                </div>
                              )}
                            </div>
                          </div>
                        </Card.Content>
                      </Card>
                    </div>
                  )}
                </div>
              ))
            ) : this.state.loading ? (
              <div style={{ width: "100%", textAlign: "center" }}>
                <h3> Page is loading.. </h3>
                <Icon size="huge" loading name="spinner" />
              </div>
            ) : (
              <div style={{ width: "100%", textAlign: "center" }}>
                <p style={{ padding: "3%" }}>
                  {" "}
                  No review found. create a session with counsellor to review
                  counsellor
                </p>
              </div>
            )}
          </Tab.Pane>
        ),
      } 
    ];
    this.setState({ panes });
  };

  handleRate = (e, { rating, maxRating }) =>
    this.setState({ rating, maxRating });
  _onKeyUp = (e) => {
    var value = e.target.value.toLowerCase();
    this.setState({ feedback: value });
  };

  feebackModel = (details) => {
    this.setState({
      userID: details.ct_user_id,
      openModel: true,
      cousellorID: details.ct_counsellor_id,
      requestID: details.id,
    });
  };
  sendMessage = () => {
    if (this.state.feedback && this.state.rating) {
      const headers = {
        jwtToken: localStorage.jwtToken,
      };
      const data = {
        requestID: this.state.requestID,
        feedback: this.state.feedback,
        rating: this.state.rating,
        userID: this.state.userID,
        cousellorID: this.state.cousellorID,
      };

      axios
        .post(
          baseURLAPI + "/rating/rating",
          { formData: data },
          {
            headers: headers,
          }
        )
        .then((res) => {
          this.setTable();
           
          this.setState({    openModel: false, formwarning: " " });
          toast.success("Feedback Successfully Sent!", {
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
    } else {
      this.setState({ formwarning: "form incomplete" });
    }
  };
  DeletefeebackModel = (details) => {
    console.log(details.review_details.id);

    this.setState({
      deleteModel: true,
      reviewId: details.review_details.id,
    });
  };

  UpdatefeebackModel = (details) => {
    console.log(details.review_details.id);

    this.setState({
      formwarning: "",
      userID: details.review_details.ct_counsellor_user_id,
      updateopenModel: true,
      rating: details.review_details.ct_counsellor_stars,
      feedback: details.review_details.ct_counsellor_review,
      cousellorID: details.review_details.ct_counsellor_id,
      reviewId: details.review_details.id,
    });
  };
  deleteFeedback = () => {
    console.log(this.state.feedback);

    const headers = {
      jwtToken: localStorage.jwtToken,
    };
    const data = {
      reviewId: this.state.reviewId,
    };
    console.log(data);
    axios
      .post(
        baseURLAPI + "/rating/Delete",
        { formData: data },
        {
          headers: headers,
        }
      )
      .then((res) => {
        this.setTable();
        this.setState({ formwarning: " ", deleteModel: false });
        toast.success("Feedback Deleted Successfully Sent!", {
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

  sortbydate = (e, data) => {
    var dropdownValue = data.value;
    console.log(dropdownValue);
    if (dropdownValue) {
      this.setState({ sort: dropdownValue });
    }
    var sortdata = dropdownValue.split("-");
    console.log(sortdata);
    var arr1 = this.state.requests;

    for (var i = 0; i < arr1.length; ++i) {
      arr1[i].ct_sort_date = new Date(
        arr1[i].ct_session_date.substring(0, 4) +
          "/" +
          arr1[i].ct_session_date.substring(5, 7) +
          "/" +
          arr1[i].ct_session_date.substring(8, 10)
      );
    }
    var points2 = arr1;

    if (sortdata[0] == "Date") {
      if (sortdata[1] == "up") {
        points2.sort(function (w, q) {
          var c = new Date(w.ct_session_date);
          var d = new Date(q.ct_session_date);
          return d - c;
        });
      } else {
        points2.sort(function (w, q) {
          var c = new Date(w.ct_session_date);
          var d = new Date(q.ct_session_date);
          return c - d;
        });
      }
    } 
    
    if (sortdata[0] == "Level") {
      points2.sort(compare);

      function compare(a, b) {
        // Use toUpperCase() to ignore character casing
        const bandA = a.ct_counselling_level_name.toLowerCase();
        const bandB = b.ct_counselling_level_name.toLowerCase();

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


     

    if (sortdata[0] == "Subject") {
      points2.sort(compare);

      function compare(a, b) {
        // Use toUpperCase() to ignore character casing
        const bandA = a.ct_counselling_subject_name.toLowerCase();
        const bandB = b.ct_counselling_subject_name.toLowerCase();

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
     

    if (sortdata[0] == "Counsellor") {
      points2.sort(compare);

      function compare(a, b) {
        // Use toUpperCase() to ignore character casing
        const bandA = a.TX_USER_NAME.toLowerCase();
        const bandB = b.TX_USER_NAME.toLowerCase();

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
    console.log(points2);
    this.setState({ requests: points2 });
  };

  sendUpdate = () => {
    console.log(this.state.feedback);
    if (this.state.feedback && this.state.rating) {
      const headers = {
        jwtToken: localStorage.jwtToken,
      };
      const data = {
        reviewId: this.state.reviewId,
        feedback: this.state.feedback,
        rating: this.state.rating,
        userID: this.state.userID,
        cousellorID: this.state.cousellorID,
      };
      console.log(data);
      axios
        .post(
          baseURLAPI + "/rating/UpdateRating",
          { formData: data },
          {
            headers: headers,
          }
        )
        .then((res) => {
          console.log(res);
          this.setTable();
          this.setState({ formwarning: " " });
          toast.success("Feedback Successfully Sent!", {
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
    } else {
      this.setState({ formwarning: "form incomplete" });
    }
  };

  render() {
    return (
      <Grid columns="equal" divided style={{ padding: "1%" }}>
        <Grid.Row textAlign="center">
          <Grid.Column textAlign="center">
            {" "}
            <h1>Counsellor in the list of your review</h1>{" "}
             
          </Grid.Column> 
        </Grid.Row> 
        <Grid.Row>
          <Grid.Column>
            <Tab fluid
              menu={{    widths: 3   , color: "teal", attached: false, tabular: false }}
              //   renderActiveOnly={true}
              style={{
                width: "60%",
                margin: "auto",
             
              }}
              //   defaultActiveIndex={0}

              panes={this.state.panes}
            /> 
 
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default ViewUserRating;