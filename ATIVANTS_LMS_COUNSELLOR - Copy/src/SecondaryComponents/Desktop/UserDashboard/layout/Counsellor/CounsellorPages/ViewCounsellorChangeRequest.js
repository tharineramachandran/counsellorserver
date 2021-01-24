import React from "react";
import {
  Button,
  Form,
  Header,
  Image,
  Input,
  Dropdown,
  Grid,
  Modal,
  Message,
  Segment,
  Card,Tab,
  Img,
  Icon,
  Table,
  Label,
  Container,
  List,
  Popup,
} from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import { baseURLAPI, baseURL, googleRecapcha } from "../../../../../../Global";

import matthew from "../../../../../../Static/Images/matthew.png";
const axios = require("axios");

class ViewCounsellorChangeRequest extends React.Component {
  state = {
    requests: [],
    openModel: false,
    changeRequests: [],
    loading: true,
    changeRequestsloading: true,
    panes :[],
    changeRequestsSort: "Date-down",
    changeRequestsSortOptions: [
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
        key: "Counsellee-down",
        text: "Counsellee name",
        value: "Counsellee-down",
        icon: "sort alphabet descending",
      },
      {
        key: "Counsellee-up",
        text: "Counsellee name",
        value: "Counsellee-up",
        icon: "sort alphabet ascending",
      },
    ],

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
        key: "Counsellee-down",
        text: "Counsellee name",
        value: "Counsellee-down",
        icon: "sort alphabet descending",
      },
      {
        key: "Counsellee-up",
        text: "Counsellee name",
        value: "Counsellee-up",
        icon: "sort alphabet ascending",
      },
    ],
  };

  setTable = () => {
    axios
      .get(baseURLAPI + "/session/counsellor/ChangeRequests/", {
        headers: {
          jwtToken: localStorage.jwtToken,
        },
      })
      .then((res) => {
        const requests = res.data;
        requests.forEach((element) => {
          var requestdatestr = element.request.ct_session_start_time.split("T");
          var requestdatestrdate = requestdatestr[0].split("-");
          var requestdatestr3 = requestdatestr[1].split(":");

          var requestenddatestr = element.request.ct_session_end_time.split(
            "T"
          );
          var requestenddatestr3 = requestenddatestr[1].split(":");
          var requestday = parseInt(requestdatestrdate[2]).toString();

          element.request.ct_session_start_time =
            requestdatestr3[0] + ":" + requestdatestr3[1];
          element.request.ct_session_end_time =
            requestenddatestr3[0] + ":" + requestenddatestr3[1];
          element.request.ct_session_date =
            requestday +
            "/" +
            requestdatestrdate[1] +
            "/" +
            requestdatestrdate[0];

          for (let x = 0; x < element.changeRequests.length; x++) {
            var datestr = element.changeRequests[x].ct_session_start_time.split(
              "T"
            );

            var datestrdate = datestr[0].split("-");
            var datestr3 = datestr[1].split(":");

            var enddatestr = element.changeRequests[
              x
            ].ct_session_end_time.split("T");
            var enddatestr3 = enddatestr[1].split(":");
            var day = parseInt(datestrdate[2]).toString();

            element.changeRequests[x].ct_session_start_time =
              datestr3[0] + ":" + datestr3[1];
            element.changeRequests[x].ct_session_end_time =
              enddatestr3[0] + ":" + enddatestr3[1];
            element.changeRequests[x].ct_session_date =
              day + "/" + datestrdate[1] + "/" + datestrdate[0];
          }
        });
        const openModel = false;
        const loading = false;
        this.setState({ requests, openModel, loading });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(baseURLAPI + "/session/counsellor/acceptChangeRequests/", {
        headers: {
          jwtToken: localStorage.jwtToken,
        },
        data: {
          userID: localStorage.userID,
        },
      })
      .then((res) => {
        const requests = res.data;
        requests.forEach((element) => {
          var datestr = element.ct_session_start_time.split("T");

          var datestrdate = datestr[0].split("-");
          var datestr3 = datestr[1].split(":");

          var enddatestr = element.ct_session_end_time.split("T");

          var enddatestr3 = enddatestr[1].split(":");
          var day = parseInt(datestrdate[2]).toString();

          element.ct_session_start_time = datestr3[0] + ":" + datestr3[1];
          element.ct_session_end_time = enddatestr3[0] + ":" + enddatestr3[1];
          element.ct_session_date =
            day + "/" + datestrdate[1] + "/" + datestrdate[0];
        });
        const openModel = false;
        this.setState({
          changeRequests: requests,
          changeRequestsloading: false,
        });
      })
      .catch(function (error) {
        console.log(error);
      });


    var  panes = [
        {
          menuItem: 'Change Requests sent',
          render: () => <Tab.Pane>
               <div style={{ width: "100%", textAlign: "center" }}>
               
{this.state.requests.length > 0 && (
  <div
    style={{
      color: "black",
      paddingBottom: "1%",
      paddingLeft: "1%",
      float: "right",
      width: "30%",
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
      <h3> Page is loading...</h3>
      <Icon size="huge" loading name="spinner" />
    </div>{" "}
  </Segment>
) : (
  <div>
    {this.state.requests.length > 0 ? (
      this.state.requests.map((person, index) => (
        <div style={{ paddingTop: "1%", paddingBottom: "1%" }}>
          {" "}
          <div style={{ width: "80%", margin: "auto" }}>
            <Card style={{ width: "100%" }}>
              <div>
                <List verticalAlign="left" floated="left">
                  <List.Item>
                    <List
                      horizontal
                      style={{
                        paddingLeft: "10px",
                        paddingBottom: "10px",
                      }}
                    >
                      <List.Item>
                        {person.request.TX_PICTURE ? (
                          <Image
                            width="100px"
                            bordered
                            src={person.request.TX_PICTURE}
                          />
                        ) : (
                          <Image
                            width="100px"
                            bordered
                            src={matthew}
                          />
                        )}
                      </List.Item>
                      <List.Item>
                        <List verticalAlign>
                          <List.Item as="a">
                            {" "}
                            <p>{person.request.TX_USER_NAME} </p>
                          </List.Item>
                          <List.Item>
                            <p style={{ color: "grey" }}>
                              Session requested date :{" "}
                              {person.request.ct_session_date}
                            </p>
                          </List.Item>
                          <List.Item>
                            {" "}
                            <p style={{ color: "grey" }}>
                              Session requested time :{" "}
                              {
                                person.request
                                  .ct_session_start_time
                              }{" "}
                              -{" "}
                              {person.request.ct_session_end_time}
                            </p>
                          </List.Item>
                        </List>
                      </List.Item>
                    </List>
                  </List.Item>
                </List>

                <List
                  horizontal
                  verticalAlign="right"
                  floated="right"
                  style={{
                    paddingTop: "1%",
                    paddingRight: "2%",
                  }}
                >
                  <List.Item>
                    <Button
                      onClick={() => this.setValue(true, person)}
                    >
                      <Icon name="check" /> View requested change
                      session{" "}
                    </Button>
                  </List.Item>
                  <List.Item>
                    <Button
                      color="red"
                      onClick={() =>
                        this.acceptRequest(person.request.id, 0)
                      }
                    >
                      <Icon name="trash" /> Decline{" "}
                    </Button>
                  </List.Item>
                </List>
              </div>
            </Card>
          </div>{" "}
        </div>
      ))
    ) : (
      <div style={{ width: "100%", textAlign: "center" }}>
        <p style={{ padding: "3%" }}> No requests found.</p>
      </div>
    )}
  </div>
)}
</div>

          </Tab.Pane>,
        },
        { menuItem: 'Change request response from counsellee', render: () => <Tab.Pane>
            
               <div style={{ width: "100%", textAlign: "center" }}>
           
{this.state.changeRequests.length > 0 && (
  <div
    style={{
      color: "black",
      paddingBottom: "1%",
      paddingLeft: "1%",
      float: "right",
      width: "30%",
    }}
  >
    Sort By {"  "}
    <Dropdown
      inline
      options={this.state.changeRequestsSortOptions}
      value={this.state.changeRequestsSort}
      onChange={this.changeRequestsSortbydate}
    />
  </div>
)}
{this.state.changeRequestsloading ? (
  <Segment>
    <div textAlign="center">
      <h3> Page is loading...</h3>
      <Icon size="huge" loading name="spinner" />
    </div>{" "}
  </Segment>
) : (
  <div>
    {this.state.changeRequests.length > 0 ? (
      this.state.changeRequests.map((person, index) => (
        <div style={{ paddingTop: "1%", paddingBottom: "1%" }}>
          {" "}
          <div style={{ width: "80%", margin: "auto" }}>
            <Card style={{ width: "100%" }}>
              <div>
                <List verticalAlign="left" floated="left">
                  <List.Item>
                    <List
                      horizontal
                      style={{
                        paddingLeft: "10px",
                        paddingBottom: "10px",
                      }}
                    >
                      <List.Item>
                        {person.TX_PICTURE ? (
                          <Image
                            width="100px"
                            bordered
                            src={person.TX_PICTURE}
                          />
                        ) : (
                          <Image
                            width="100px"
                            bordered
                            src={matthew}
                          />
                        )}
                      </List.Item>
                      <List.Item>
                        <List verticalAlign>
                          <List.Item as="a">
                            {" "}
                            <p>{person.TX_USER_NAME} </p>
                          </List.Item>
                          <List.Item>
                            <p style={{ color: "grey" }}>
                              Session requested date :{" "}
                              {person.ct_session_date}
                            </p>
                          </List.Item>
                          <List.Item>
                            {" "}
                            <p style={{ color: "grey" }}>
                              Session requested time :{" "}
                              {person.ct_session_start_time} -{" "}
                              {person.ct_session_end_time}
                            </p>
                          </List.Item>
                        </List>
                      </List.Item>
                    </List>
                  </List.Item>
                </List>

                <List
                  horizontal
                  verticalAlign="right"
                  floated="right"
                  style={{
                    paddingTop: "1%",
                    paddingRight: "2%",
                  }}
                >
                  <List.Item>
                    <Button
                      color="green"
                      onClick={() =>
                        this.acceptRequest(person.id, 1)
                      }
                    >
                      <Icon name="check" /> Accept{" "}
                    </Button>
                  </List.Item>
                  <List.Item>
                    <Button
                      color="red"
                      onClick={() =>
                        this.acceptRequest(person.id, 0)
                      }
                    >
                      <Icon name="trash" /> Decline{" "}
                    </Button>
                  </List.Item>
                </List>
              </div>
            </Card>
          </div>{" "}
        </div>
      ))
    ) : (
      <div style={{ width: "100%", textAlign: "center" }}>
        <p style={{ padding: "3%" }}> No requests found.</p>
      </div>
    )}
  </div>
)}</div>
        </Tab.Pane> }, 
      ]
      this.setState({panes      });
  };

  componentDidMount() {
    this.setTable();
  }
  setValue = (openModel, value) => {
    this.setState({ openModel: openModel, modelObject: value });
  };
  acceptRequest = (requestID, response) => {
    var data = {
      requestID: requestID,
      response: response,
      counsellorID: localStorage.userID,
    };

    var options = {
      headers: {
        jwtToken: localStorage.jwtToken,
      },
    };
    axios
      .get(baseURLAPI + "/request/google/get", {
        params: {
          requestID: requestID,
          response: response,
          counsellorID: localStorage.userID,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          if (response == 1) {
            toast.success("Request accepted successfully!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: "",
            });
          } else {
            toast.success("Request declined successfully!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: "",
            });
          }

          this.setTable();
        } else {
          toast.error(res.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: "",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  sortbydate = (e, data) => {
    var dropdownValue = data.value;
    if (dropdownValue) {
      this.setState({ sort: dropdownValue });
    }
    var sortdata = dropdownValue.split("-");
    var arr1 = this.state.requests;

    var points2 = arr1;
    for (var i = 0; i < arr1.length; ++i) {
      arr1[i].request.ct_sort_date1 = new Date(
        arr1[i].request.ct_session_date.substring(3, 5) +
          "/" +
          arr1[i].request.ct_session_date.substring(0, 2) +
          "/" +
          arr1[i].request.ct_session_date.substring(6, 10)
      );
    }

    if (sortdata[0] == "Date") {
      if (sortdata[1] == "up") {
        points2.sort(function (w, q) {
          var c = new Date(w.request.ct_sort_date1);
          var d = new Date(q.request.ct_sort_date1);
          return d - c;
        });
      } else {
        points2.sort(function (w, q) {
          var c = new Date(w.request.ct_sort_date1);

          var d = new Date(q.request.ct_sort_date1);
          return c - d;
        });
      }
    }

    if (sortdata[0] == "Counsellee") {
      points2.sort(compare);

      function compare(a, b) {
        // Use toUpperCase() to ignore character casing
        const bandA = a.request.TX_USER_NAME.toLowerCase();
        const bandB = b.request.TX_USER_NAME.toLowerCase();

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
    this.setState({ requests: points2 });
  };

  changeRequestsSortbydate = (e, data) => {
    var dropdownValue = data.value;
    if (dropdownValue) {
      this.setState({ changeRequestsSort: dropdownValue });
    }
    var sortdata = dropdownValue.split("-");
    var arr1 = this.state.changeRequests;

    var points2 = arr1;
    for (var i = 0; i < arr1.length; ++i) {
      arr1[i].ct_sort_date1 = new Date(
        arr1[i].ct_session_date.substring(3, 5) +
          "/" +
          arr1[i].ct_session_date.substring(0, 2) +
          "/" +
          arr1[i].ct_session_date.substring(6, 10)
      );
    }

    if (sortdata[0] == "Date") {
      if (sortdata[1] == "up") {
        points2.sort(function (w, q) {
          var c = new Date(w.ct_sort_date1);
          var d = new Date(q.ct_sort_date1);
          return d - c;
        });
      } else {
        points2.sort(function (w, q) {
          var c = new Date(w.ct_sort_date1);

          var d = new Date(q.ct_sort_date1);
          return c - d;
        });
      }
    }

    if (sortdata[0] == "Counsellee") {
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
    this.setState({ changeRequests: points2 });
  };
  render() {
    return (
      <Grid columns="equal" divided>
        <Grid.Row textAlign="center">
          <Grid.Column>
            <Container>
              {/* <h1>Requests for change sessions</h1>

              {this.state.requests.length > 0 && (
                <div
                  style={{
                    color: "black",
                    paddingBottom: "1%",
                    paddingLeft: "1%",
                    float: "right",
                    width: "30%",
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
                    <h3> Page is loading...</h3>
                    <Icon size="huge" loading name="spinner" />
                  </div>{" "}
                </Segment>
              ) : (
                <div>
                  {this.state.requests.length > 0 ? (
                    this.state.requests.map((person, index) => (
                      <div style={{ paddingTop: "1%", paddingBottom: "1%" }}>
                        {" "}
                        <div style={{ width: "80%", margin: "auto" }}>
                          <Card style={{ width: "100%" }}>
                            <div>
                              <List verticalAlign="left" floated="left">
                                <List.Item>
                                  <List
                                    horizontal
                                    style={{
                                      paddingLeft: "10px",
                                      paddingBottom: "10px",
                                    }}
                                  >
                                    <List.Item>
                                      {person.request.TX_PICTURE ? (
                                        <Image
                                          width="100px"
                                          bordered
                                          src={person.request.TX_PICTURE}
                                        />
                                      ) : (
                                        <Image
                                          width="100px"
                                          bordered
                                          src={matthew}
                                        />
                                      )}
                                    </List.Item>
                                    <List.Item>
                                      <List verticalAlign>
                                        <List.Item as="a">
                                          {" "}
                                          <p>{person.request.TX_USER_NAME} </p>
                                        </List.Item>
                                        <List.Item>
                                          <p style={{ color: "grey" }}>
                                            Session requested date :{" "}
                                            {person.request.ct_session_date}
                                          </p>
                                        </List.Item>
                                        <List.Item>
                                          {" "}
                                          <p style={{ color: "grey" }}>
                                            Session requested time :{" "}
                                            {
                                              person.request
                                                .ct_session_start_time
                                            }{" "}
                                            -{" "}
                                            {person.request.ct_session_end_time}
                                          </p>
                                        </List.Item>
                                      </List>
                                    </List.Item>
                                  </List>
                                </List.Item>
                              </List>

                              <List
                                horizontal
                                verticalAlign="right"
                                floated="right"
                                style={{
                                  paddingTop: "1%",
                                  paddingRight: "2%",
                                }}
                              >
                                <List.Item>
                                  <Button
                                    onClick={() => this.setValue(true, person)}
                                  >
                                    <Icon name="check" /> View requested change
                                    session{" "}
                                  </Button>
                                </List.Item>
                                <List.Item>
                                  <Button
                                    color="red"
                                    onClick={() =>
                                      this.acceptRequest(person.request.id, 0)
                                    }
                                  >
                                    <Icon name="trash" /> Decline{" "}
                                  </Button>
                                </List.Item>
                              </List>
                            </div>
                          </Card>
                        </div>{" "}
                      </div>
                    ))
                  ) : (
                    <div style={{ width: "100%", textAlign: "center" }}>
                      <p style={{ padding: "3%" }}> No requests found.</p>
                    </div>
                  )}
                </div>
              )} */}

              {/* <h1>Reply for change sessions</h1>

              {this.state.changeRequests.length > 0 && (
                <div
                  style={{
                    color: "black",
                    paddingBottom: "1%",
                    paddingLeft: "1%",
                    float: "right",
                    width: "30%",
                  }}
                >
                  Sort By {"  "}
                  <Dropdown
                    inline
                    options={this.state.changeRequestsSortOptions}
                    value={this.state.changeRequestsSort}
                    onChange={this.changeRequestsSortbydate}
                  />
                </div>
              )}
              {this.state.changeRequestsloading ? (
                <Segment>
                  <div textAlign="center">
                    <h3> Page is loading...</h3>
                    <Icon size="huge" loading name="spinner" />
                  </div>{" "}
                </Segment>
              ) : (
                <div>
                  {this.state.changeRequests.length > 0 ? (
                    this.state.changeRequests.map((person, index) => (
                      <div style={{ paddingTop: "1%", paddingBottom: "1%" }}>
                        {" "}
                        <div style={{ width: "80%", margin: "auto" }}>
                          <Card style={{ width: "100%" }}>
                            <div>
                              <List verticalAlign="left" floated="left">
                                <List.Item>
                                  <List
                                    horizontal
                                    style={{
                                      paddingLeft: "10px",
                                      paddingBottom: "10px",
                                    }}
                                  >
                                    <List.Item>
                                      {person.TX_PICTURE ? (
                                        <Image
                                          width="100px"
                                          bordered
                                          src={person.TX_PICTURE}
                                        />
                                      ) : (
                                        <Image
                                          width="100px"
                                          bordered
                                          src={matthew}
                                        />
                                      )}
                                    </List.Item>
                                    <List.Item>
                                      <List verticalAlign>
                                        <List.Item as="a">
                                          {" "}
                                          <p>{person.TX_USER_NAME} </p>
                                        </List.Item>
                                        <List.Item>
                                          <p style={{ color: "grey" }}>
                                            Session requested date :{" "}
                                            {person.ct_session_date}
                                          </p>
                                        </List.Item>
                                        <List.Item>
                                          {" "}
                                          <p style={{ color: "grey" }}>
                                            Session requested time :{" "}
                                            {person.ct_session_start_time} -{" "}
                                            {person.ct_session_end_time}
                                          </p>
                                        </List.Item>
                                      </List>
                                    </List.Item>
                                  </List>
                                </List.Item>
                              </List>

                              <List
                                horizontal
                                verticalAlign="right"
                                floated="right"
                                style={{
                                  paddingTop: "1%",
                                  paddingRight: "2%",
                                }}
                              >
                                <List.Item>
                                  <Button
                                    color="green"
                                    onClick={() =>
                                      this.acceptRequest(person.id, 1)
                                    }
                                  >
                                    <Icon name="check" /> Accept{" "}
                                  </Button>
                                </List.Item>
                                <List.Item>
                                  <Button
                                    color="red"
                                    onClick={() =>
                                      this.acceptRequest(person.id, 0)
                                    }
                                  >
                                    <Icon name="trash" /> Decline{" "}
                                  </Button>
                                </List.Item>
                              </List>
                            </div>
                          </Card>
                        </div>{" "}
                      </div>
                    ))
                  ) : (
                    <div style={{ width: "100%", textAlign: "center" }}>
                      <p style={{ padding: "3%" }}> No requests found.</p>
                    </div>
                  )}
                </div>
              )} */}
 
            </Container>
          </Grid.Column>
          
        </Grid.Row>

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
 
 {this.state.modelObject && (
                <Modal
                  onClose={() => this.setValue(false, null)}
                  onClick={() => this.setValue(false, null)}
                  onOpen={() => this.setValue(true, null)}
                  open={this.state.openModel}
                >
                  <Modal.Header> Session Change Date</Modal.Header>
                  <Modal.Content>
                    <p>
                      {" "}
                      <strong>Counsellee Name : </strong>
                      {this.state.modelObject.request.TX_USER_NAME}
                    </p>
                    <p>
                      {" "}
                      <strong>Counsellee Email : </strong>
                      {this.state.modelObject.request.TX_USER_EMAIL}
                    </p>

                    <Table basic="very" celled collapsing>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Num </Table.HeaderCell>
                          <Table.HeaderCell>Session Date </Table.HeaderCell>
                          <Table.HeaderCell>
                            Session Start Time{" "}
                          </Table.HeaderCell>
                          <Table.HeaderCell>Session End Time </Table.HeaderCell>
                          <Table.HeaderCell>
                            Session Time Zone{" "}
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {this.state.modelObject.changeRequests.length > 0 ? (
                          this.state.modelObject.changeRequests.map(
                            (detailsCR, index) => (
                              <Table.Row>
                                <Table.Cell>{index + 1}</Table.Cell>
                                <Table.Cell>
                                  {detailsCR.ct_session_date}
                                </Table.Cell>
                                <Table.Cell>
                                  {detailsCR.ct_session_start_time}
                                </Table.Cell>
                                <Table.Cell>
                                  {detailsCR.ct_session_end_time}
                                </Table.Cell>
                                <Table.Cell>
                                  {
                                    this.state.modelObject.request
                                      .ct_counsellor_timezone_code
                                  }
                                </Table.Cell>
                              </Table.Row>
                            )
                          )
                        ) : (
                          <Table.Row>
                            <Table.Cell>
                              no session change was recorded
                            </Table.Cell>
                          </Table.Row>
                        )}
                      </Table.Body>
                    </Table>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button
                      color="black"
                      onClick={() => this.setValue(false, null)}
                    >
                      Close
                    </Button>
                  </Modal.Actions>
                </Modal>
              )}
          </Grid.Column>
        </Grid.Row>



      </Grid>
    );
  }
}

export default ViewCounsellorChangeRequest;
