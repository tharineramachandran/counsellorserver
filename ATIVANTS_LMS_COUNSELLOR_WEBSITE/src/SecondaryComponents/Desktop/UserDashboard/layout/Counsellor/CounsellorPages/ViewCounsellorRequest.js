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
  Card,
  Img,
  Icon,
  Table,
  Label,
  Container,
  List,
  Popup,
} from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import ChangeSession from "../../SharedComponents/ChangeSessionModel";
import { baseURLAPI, baseURL } from "../../../../../../Global";
import matthew from "../../../../../../Static/Images/matthew.png";
const axios = require("axios");

class ViewRequest extends React.Component {
  state = {
    loading: true,
    requests: [],
    openModel: false,
    totalRequests: 0,changeRequest:{} ,
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
      } ,
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

  componentDidMount() {
    this.setTable(); 
    setInterval(this.checkValue, 5000);
  }

  checkValue = () => {
    if (Number.isInteger(parseInt(localStorage.userID))) {
      axios
        .get(
          baseURLAPI +
            "/request/getTotalCounsellorRequests/" +
            localStorage.userID,
          {
            headers: {
              jwtToken: localStorage.jwtToken,
            },
            data: {
              userID: localStorage.userID,
            },
          }
        )
        .then((res) => {
          const totalRequests = res.data;

          if (!this.state.openModel) {
            const openModel = false;
            if (totalRequests != this.state.totalRequests) {
              this.setTable();
              this.setState({ totalRequests, openModel });
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  setTable = () => {
    if (Number.isInteger(parseInt(localStorage.userID))) {
      axios
        .get(
          baseURLAPI + "/request/getCounsellorRequests/" + localStorage.userID,
          {
            headers: {
              jwtToken: localStorage.jwtToken,
            },
            data: {
              userID: localStorage.userID,
            },
          }
        )
        .then((res) => {
          const requests = res.data;
          console.log(requests);
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
          const loading = false;
          this.setState({ requests, openModel, loading });
        });
    }
  };

  acceptRequest = (requestID, response) => {
    console.log(requestID);
    console.log(response);
    if (Number.isInteger(parseInt(localStorage.userID))) {
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
            redirect:0,
          },
        })
        .then((res) => {
          if (res.status == 200) {

            if(response == 0 ){
              toast.success("Request deleted successfully!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: "",
            });  } else{toast.success("Request accepted successfully!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: "",
            });} 

          
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
          toast.error("please sign-in to your google calendar", {
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
      toast.error("session expired.Please relogin", {
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
 
    var points2 = arr1;
    for (var i = 0; i < arr1.length; ++i) {
        arr1[i].ct_sort_date1    = new Date(
          arr1[i].ct_session_date.substring(3,5) +
          "/" +
          arr1[i].ct_session_date.substring(0,2) +
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
    console.log(points2);
    this.setState({ requests: points2 });
  };

  render() {
    return (
      <Grid columns="equal" divided>
        <Grid.Row textAlign="center">
          <Grid.Column>
            <Container>
              <h1>Requests for sessions</h1>
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
                                    <Icon name="close" /> Decline{" "}
                                  </Button>
                                </List.Item>
                                <List.Item floated="right">
                                  <Button
                                    color="yellow"
                                    onClick={() => {
                                      this.setState({
                                        openModel: true,
                                        changeRequest: person,
                                      });
                                    }}
                                  >
                                    <Icon name="edit " />
                                    Reschedule{" "}
                                  </Button>
                                </List.Item>
                              </List>
                            </div>
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
                      <p style={{ padding: "3%" }}> No requests found.</p>
                    </div>
                  )}
                </div>
              )}
              <Modal
                onClose={() => this.setState({ openModel: false })}
                onOpen={() => this.setState({ openModel: true })}
                open={this.state.openModel}
              >
                <Modal.Header>Request Session Change</Modal.Header>
                <Modal.Content>
                  <ChangeSession
                    CounsellorID={localStorage.userID}
                    RequestID={this.state.changeRequest.id}
                    UserID={this.state.changeRequest.ct_user_id}
                  />
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    color="black"
                    onClick={() =>
                      this.setState({
                        openModel: false,
                      })
                    }
                  >
                    Close
                  </Button>
                </Modal.Actions>
              </Modal>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default ViewRequest;
