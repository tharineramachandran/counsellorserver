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
  Tab,
} from "semantic-ui-react";

import { ToastContainer, toast } from "react-toastify";

import { baseURLAPI, baseURL } from "../../../../Global";
import UserChangeSession from "./UserChangeSessionModel";

import matthew from "../../../../Static/Images/matthew.png";
const axios = require("axios");
class ViewChangeRequest extends React.Component {
  state = {
    requests: [],
    openModel: false,
    panes: [],
    modeldata:{},
    loading: true,
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

      panes : [
        {
          menuItem: "All",
          render: () => (
            <Tab.Pane>
              
{this.state.requests.length > 0 && (
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

              {this.state.requests.length > 0 ? (
                this.state.requests.map((person, index) => (
                  <div style={{ paddingTop: "1%", paddingBottom: "1%" }}>
                    <div style={{ width: "100%", margin: "auto" }}>
                      <Card style={{ width: "100%" }}>
                        <List divided verticalAlign="middle">
                          <List.Item>
                            <List.Content floated="right"> <div style={{ padding: "10px" }}>
                              {parseInt(
                                person.request.ct_counsellor_response
                              ) == 2 ? (
                                
                                  <Button
                                    color="blue"
                                    onClick={() =>
                                      this.setState({ openModel: true , modeldata :person})
                                    }
                                  >
                                    Respond
                                  </Button>
                                 
                              ) : (
                                
                                  <p style={{ color: "#db2828   " }}>
                                    {" "}
                                    Session was declined{" "}
                                  </p>
                                
                              )}</div>
                            </List.Content>
                            <List horizontal  style={{ paddingLeft: "10px"  ,paddingBottom    : "10px" }}> 
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
                              </List.Item>{" "}
                              <List.Item>
                                {" "}
                                <List verticalAlign>
                                  <List.Item as="a">
                                    {person.request.TX_USER_NAME}
                                  </List.Item>
                                  <List.Item>
                                    <p style={{ color: "grey" }}>
                                      Session requested date :{" "}
                                      {person.request.ct_session_date}
                                    </p>
                                  </List.Item>
                                  <List.Item>
                                    <p style={{ color: "grey" }}>
                                      Session requested time :{" "}
                                      {person.request.ct_session_start_time} -{" "}
                                      {person.request.ct_session_end_time}
                                    </p>
                                  </List.Item>
                                </List>
                              </List.Item>  
                            </List> 
                          </List.Item> 
                        
                        </List>

                        <Modal
                          onClose={() =>
                            this.setState({
                              openModel: false,
                            })
                          }
                          onOpen={() =>
                            this.setState({
                              openModel: true,
                            })
                          }
                          open={this.state.openModel}
                        >
                          <Modal.Header>Send Change Session Response</Modal.Header>
                          <Modal.Content>
                            <UserChangeSession openModelFunc ={this.openModelFunc}Request={this.state.modeldata} />
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
                      </Card>
                    </div>
                  </div>
                ))
              ) : this.state.loading ? (
                <div style={{ width: "100%", textAlign: "center" }}>
                  <h3> Page is loading.. </h3>
                  <Icon size="huge" loading name="spinner" />
                </div>
              ) :  (
                  <div style={{ width: "100%", textAlign: "center" }}>
                    <p style={{ padding: "3%" }}>
                      {" "}
                      No requests found.
                    </p>
                  </div>
                )}
            </Tab.Pane>
          ),
        }, 
        {
          menuItem: "Change Requests",
          render: () => <Tab.Pane>

            
{this.state.requests.length > 0 && (
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
              
          {this.state.requests.length > 0 ? (
            this.state.requests.map((person, index) => (
                <div>
            
              
              {   parseInt(
                    person.request.ct_counsellor_response
                  ) == 2 && ( <div style={{ width: "100%", margin: "auto" }}>
                        <div style={{ paddingTop: "1%", paddingBottom: "1%" }}> 
                  <Card style={{ width: "100%" }}>
                    <List divided verticalAlign="middle">
                      <List.Item>
                        <List.Content floated="right"> <div style={{ padding: "10px" }}>
                          {parseInt(
                            person.request.ct_counsellor_response
                          ) == 2 ? (
                            
                              <Button
                                color="blue"
                                onClick={() =>
                                  this.setState({ openModel: true , modeldata :person})
                                }
                              >
                                Respond
                              </Button>
                             
                          ) : (
                            
                              <p style={{ color: "#db2828   " }}>
                                {" "}
                                Session was declined{" "}
                              </p>
                            
                          )}</div>
                        </List.Content>
                        <List horizontal  style={{ paddingLeft: "10px"  ,paddingBottom    : "10px" }}> 
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
                          </List.Item>{" "}
                          <List.Item>
                            {" "}
                            <List verticalAlign>
                              <List.Item as="a">
                                {person.request.TX_USER_NAME}
                              </List.Item>
                              <List.Item>
                                <p style={{ color: "grey" }}>
                                  Session requested date :{" "}
                                  {person.request.ct_session_date}
                                </p>
                              </List.Item>
                              <List.Item>
                                <p style={{ color: "grey" }}>
                                  Session requested time :{" "}
                                  {person.request.ct_session_start_time} -{" "}
                                  {person.request.ct_session_end_time}
                                </p>
                              </List.Item>
                            </List>
                          </List.Item>  
                        </List> 
                      </List.Item> 
                    
                    </List>

                    <Modal
                      onClose={() =>
                        this.setState({
                          openModel: false,
                        })
                      }
                      onOpen={() =>
                        this.setState({
                          openModel: true,
                        })
                      }
                      open={this.state.openModel}
                    >
                       <Modal.Header>Send Change Session Response</Modal.Header>
                          <Modal.Content>
                            <UserChangeSession openModelFunc ={this.openModelFunc}Request={this.state.modeldata} />
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
                  </Card> </div>   </div>)}
               
               
              </div>
            ))
          ) : this.state.loading ? (
            <div style={{ width: "100%", textAlign: "center" }}>
              <h3> Page is loading.. </h3>
              <Icon size="huge" loading name="spinner" />
            </div>
          ) :  (
              <div style={{ width: "100%", textAlign: "center" }}>
                <p style={{ padding: "3%" }}>
                  {" "}
                  No requests found.
                </p>
              </div>
            )}
      </Tab.Pane>,
        },{
            menuItem: "Declined Requests",
            render: () => <Tab.Pane>

{this.state.requests.length > 0 && (
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

              
            {this.state.requests.length > 0 ? (
              this.state.requests.map((person, index) => (
                 
                <div>
                
                {   parseInt(
                      person.request.ct_counsellor_response
                    ) == 5 && (   <div style={{ paddingTop: "1%", paddingBottom: "1%" }}> <div style={{ width: "100%", margin: "auto" }}>
                    <Card style={{ width: "100%" }}>
                      <List divided verticalAlign="middle">
                        <List.Item>
                          <List.Content floated="right"> <div style={{ padding: "10px" }}>
                            {parseInt(
                              person.request.ct_counsellor_response
                            ) == 2 ? (
                              
                                <Button
                                  color="blue"
                                  onClick={() =>
                                    this.setState({ openModel: true , modeldata :person})
                                  }
                                >
                                  Respond
                                </Button>
                               
                            ) : (
                              
                                <p style={{ color: "#db2828   " }}>
                                  {" "}
                                  Session was declined{" "}
                                </p>
                              
                            )}</div>
                          </List.Content>
                          <List horizontal  style={{ paddingLeft: "10px"  ,paddingBottom    : "10px" }}> 
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
                            </List.Item>{" "}
                            <List.Item>
                              {" "}
                              <List verticalAlign>
                                <List.Item as="a">
                                  {person.request.TX_USER_NAME}
                                </List.Item>
                                <List.Item>
                                  <p style={{ color: "grey" }}>
                                    Session requested date :{" "}
                                    {person.request.ct_session_date}
                                  </p>
                                </List.Item>
                                <List.Item>
                                  <p style={{ color: "grey" }}>
                                    Session requested time :{" "}
                                    {person.request.ct_session_start_time} -{" "}
                                    {person.request.ct_session_end_time}
                                  </p>
                                </List.Item>
                              </List>
                            </List.Item>  
                          </List> 
                        </List.Item> 
                      
                      </List>
  
                      <Modal
                        onClose={() =>
                          this.setState({
                            openModel: false,
                          })
                        }
                        onOpen={() =>
                          this.setState({
                            openModel: true,
                          })
                        }
                        open={this.state.openModel}
                      >
                        <Modal.Header>Send Change Session Response</Modal.Header>
                          <Modal.Content>
                            <UserChangeSession openModelFunc ={this.openModelFunc}Request={this.state.modeldata} />
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
                    </Card> </div>   </div>)}
                 
                 
                 </div>
              ))
            ) : this.state.loading ? (
              <div style={{ width: "100%", textAlign: "center" }}>
                <h3> Page is loading.. </h3>
                <Icon size="huge" loading name="spinner" />
              </div>
            ) :  (
                <div style={{ width: "100%", textAlign: "center" }}>
                  <p style={{ padding: "3%" }}>
                    {" "}
                    No requests found 
                  </p>
                </div>
              )}
        </Tab.Pane>,
          }
      ],
  };
  componentDidMount() {
       this.setTable();
  }
  openModelFunc=(value)=>{
this.setState({openModel:value});
this.setTable();
  }
  setTable =()=>{
    axios
      .get(
        baseURLAPI + "/session/getUserChangeRequests/" + localStorage.userID,
        {
          headers: {
            jwtToken: localStorage.jwtToken,
          },
        }
      )
      .then((res) => {
        console.log(res);
        const requests = res.data.sessionList;
        console.log(requests);

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
        console.log(requests);
       

        const openModel = false;
        var loading = false;
        this.setState({
          requests: requests,
          openModel: openModel,
          loading: loading,
         
        });
      })
      .catch(function (error) {
        console.log(error);

        var loading = false;
        this.setState({ loading });
      });}




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
              arr1[i].request.ct_session_date.substring(3,5) +
              "/" +
              arr1[i].request.ct_session_date.substring(0,2) +
              "/" +
              arr1[i].request.ct_session_date.substring(6, 10)  
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
         
        if (sortdata[0] == "Counsellor") {
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
        console.log(points2);
        this.setState({ requests: points2 });
      };















  render() {
    return (
      <Grid columns="equal" divided>
        <Grid.Row textAlign="center">
          <Grid.Column textAlign="center">
            {" "}
            <h1>Change session requests</h1>{" "}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column> 

            <Tab
              fluid
              menu={{
                widths: 3,
                color: "teal",
                attached: false,
                tabular: false,
              }}
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

export default ViewChangeRequest;
