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
  Tab,
  Menu,
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
import { baseURLAPI, baseURL } from "../../../../../Global";
const axios = require("axios");

class ViewNoti extends React.Component {
  state = {
    requests: [],
    openModel: false,
    messages: "",
    chatID: "",
    receiverID: 0,
    message: "",
    receiverName: "",
    receiverEmail: "",
    viewNotiMessage: false,
    totalChats: 0,
    receiverImage: "",
    panes: [],
    read: [],
    unread: [],
    activeIndex: 0,
    date: "",
    loadingChats: "Loading notifications",
  };

  componentDidMount() {
    this.setTable();
    this.getData();
    this.intervalID = setInterval(this.getData, 5000);
    console.log("is here    ");
  }
  componentWillUnmount() {
    console.log("asdfasdfasdf here    ");
    clearInterval(this.intervalID);
  }

  getData = () => {
    axios
      .get(baseURLAPI + "/notification/TotalNoti/" + localStorage.userID, {
        headers: {
          jwtToken: localStorage.jwtToken,
        },
        data: {
          userID: localStorage.userID,
        },
      })
      .then((res) => {
        console.log("res.data");
        console.log(res.data);
        if (parseInt(res.data) == 0) {
          this.setState({ loadingChats: "No notifications for you " });
        }
        if (parseInt(res.data) != this.state.totalChats) {
          this.setTable();
          this.setState({ totalChats: parseInt(res.data) });
        }
      })
      .catch(function (error) {
        console.log(error);
        this.setState({ loadingChats: "No notifications for you " });
      });
  };

  setTable = () => {
    axios
      .get(baseURLAPI + "/notification/getNoti/" + localStorage.userID, {
        headers: {
          jwtToken: localStorage.jwtToken,
        },
        data: {
          userID: localStorage.userID,
        },
      })
      .then((res) => {
        const requests = res.data[0].ct_notification.value;
        const openModel = false;
        var unread = [];
        var readlist = [];
        var read = [];
        for (var i = 0; i < requests.length; i++) {
          var item = requests[i];

          if (item.unread == 1) {
            unread.push(item);
          } else {
            readlist.push(item);
          }
          var read = unread.concat(readlist);
          var loadingChats = "No notifications for you";
          this.setState({ read, unread, loadingChats });
        }
        this.setState({ requests, openModel });
      })
      .catch(function (error) {
        console.log(error);
      });
    if (this.state.read.length < 1) {
      var unread = [];
      var read = [];
      var loadingChats = "No notifications for you";
      this.setState({ read, unread, loadingChats });
    }
    var panes = [
      {
        menuItem: "All",
        render: () => (
          <Tab.Pane>
            {this.state.read.length > 0 ? (
              this.state.read.map((details, index) => (
                <Card style={{ width: "100%", padding: "2%" }}>
                  <Card.Content style={{ float: "left", width: "80%" }}>
                    {details.unread == 1 ? (
                      <Card.Description>
                        <strong style={{ color: "black", textAlign: "left" }}>
                          {" "}
                          {details.notification}
                        </strong>
                        <p style={{ color: "grey", textAlign: "left" }}>
                          {details.date} at {details.time}
                        </p>
                      </Card.Description>
                    ) : (
                      <Card.Description>
                        <strong style={{ color: "grey", textAlign: "left" }}>
                          {" "}
                          {details.notification}
                        </strong>
                        <p style={{ color: "grey", textAlign: "left" }}>
                          {details.date} at {details.time}
                        </p>
                      </Card.Description>
                    )}
                  </Card.Content>
                </Card>
              ))
            ) : (
              <Card style={{ width: "100%" }}>
                <Card.Content>
                  <Card.Header>{this.state.loadingChats} </Card.Header>
                </Card.Content>
              </Card>
            )}
          </Tab.Pane>
        ),
      },
      {
        menuItem: "clear inbox",
        render: () => (
          <Tab.Pane>
            <Card style={{ width: "100%" }}>
              <Card.Content>
                <Card.Header>No notifications for you </Card.Header>
              </Card.Content>
            </Card>
          </Tab.Pane>
        ),
      },
      {
        menuItem: (
          <Menu.Item>
            {" "}
            <p> mark as read </p>
          </Menu.Item>
        ),
      },
    ];
    this.setState({ panes });
  };

  markasread = () => {
    axios
      .post(
        baseURLAPI + "/notification/read/" + localStorage.userID,
        {
          userID: localStorage.userID,
        },
        {
          headers: {
            jwtToken: localStorage.jwtToken,
          },
        }
      )
      .then((res) => {
        console.log("success to unread");
      })
      .catch(function (error) {
        console.log(error);
      });

    this.setState({ activeIndex: 0 });
  };
  deleteall = () => {
    axios
      .post(
        baseURLAPI + "/notification/deleteNoti/" + localStorage.userID,
        {
          userID: localStorage.userID,
        },
        {
          headers: {
            jwtToken: localStorage.jwtToken,
          },
        }
      )
      .then((res) => {
        this.setState({ read: [], unread: [], activeIndex: 0 });
        console.log("done..");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  handleChange = (e, data) => {
    if (data.activeIndex == 1) {
      this.deleteall();
      console.log("success deleteall");
    }
    if (data.activeIndex == 2) {
      this.markasread();
      console.log("success markasread");
    }
  };
  render() {
    return (
      <Grid style={{ height: "400px" }} columns="equal" divided>
        <Grid.Row>
          <Grid.Column>
            <Tab
              menu={{ color: "teal", attached: false, tabular: false }}
              renderActiveOnly={true}
              onTabChange={this.handleChange}
              defaultActiveIndex={0}
              activeIndex={this.state.activeIndex}
              panes={this.state.panes}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default ViewNoti;
