import React, { useState, useContext, useEffect, useRef } from "react";
import { Authorize } from "../../../MainComponents/DesktopComponent";
import { toast } from "react-toastify";
import TopMenu from "./layout/TopMenu";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";

import {
  Button,
  Form,
  Card,
  Header,
  Icon,
  Input,
  Dropdown,
  Grid,
  Modal,
  Message,
  Menu,
  Segment,
  Table,
  Label,
  Container,
  List,
  Popup,
} from "semantic-ui-react";
import ViewRequest from "./layout/ViewCounsellorRequest";
import ViewCounsellorProfile from "./layout/ViewCounsellorProfile";

import ViewMessages from "./layout/ViewMessages";
import ViewAccepted from "./layout/ViewCounsellorAccepted";
import ViewDeclined from "./layout/ViewCounsellorDeclined";

import ViewNoti from "./layout/ViewNoti";
import ViewCounsellorChangeRequest from "./layout/ViewCounsellorChangeRequest";

import ViewCounsellorEdit from "./layout/ViewCounsellorEdit";

import Search from "./layout/Search";

import { baseURLAPI, baseURL } from "../../../Global";
const axios = require("axios");
toast.configure();

const CounsellorDashboard = (props) => {
  const [OpenMessageSelected, setOpenMessageSelected] = useState(false);

  const contextRefNoti = useRef();
  const [totalmessages, settotalmessages] = useState(0);
  const [newNoti, setnewNoti] = useState(false);
  const contextRef = useRef();
  const setAuth = useContext(Authorize);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    isCounsellor: "",
    isDetailsProvided: true,
  });
  const [isProfileSelected, setIsProfileSelected] = useState(false);
  const [isRequestSelected, setisRequestSelected] = useState(false);
  const [isViewDeclineSelected, setViewDeclineSelected] = useState(false);
  const [isViewChangeSelected, setViewChangeSelected] = useState(false);
  const [isMessagesSelected, setIsMessagesSelected] = useState(false);
  const [isViewAcceptSelected, setViewAcceptSelected] = useState(false);
  const { name, email, isCounsellor, isDetailsProvided } = userDetails;

  const [activeItem, setactiveItem] = useState(false);
  const [OpenNotiSelected, setOpenNotiSelected] = useState(false);

  const [totalnoti, settotalnoti] = useState(0);
  var user = [];
  const [open, setOpen] = useState(false);

  async function getName() {
    try {
      axios
        .get(
          baseURLAPI +
            "/Counsellor/GetSingleCounsellorDetails/" +
            localStorage.userID,

          {
            headers: {
              jwtToken: localStorage.jwtToken,
            },
          }
        )
        .then(function (response) {
          user = response.data.counsellor;
          var value = undefined;

          if (user.counsellor_details.length > 0) {
            value = true;
          } else {
            value = false;
          }

          setUserDetails({
            name: response.data.counsellor.user_details[0].TX_USER_NAME,
            email: response.data.counsellor.user_details[0].TX_USER_EMAIL,
            isCounsellor:
              response.data.counsellor.user_details[0].IS_COUNSELLOR,
            isDetailsProvided: value,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getName();
    getData();
  }, []);

  async function getData() {
    try {
      axios
        .get(baseURLAPI + "/messages/TotalUnread/" + localStorage.userID, {
          headers: {
            jwtToken: localStorage.jwtToken,
          },
          data: {
            userID: localStorage.userID,
          },
        })
        .then((res) => {
          if (parseInt(res.data) != totalmessages) {
            settotalmessages(parseInt(res.data));
            setnewNoti(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    }
    try {
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
          if (parseInt(res.data) != totalnoti) {
            settotalnoti(parseInt(res.data));
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    setInterval(() => {
      try {
        axios
          .get(baseURLAPI + "/messages/TotalUnread/" + localStorage.userID, {
            headers: {
              jwtToken: localStorage.jwtToken,
            },
            data: {
              userID: localStorage.userID,
            },
          })
          .then((res) => {
            if (parseInt(res.data) != totalmessages) {
              settotalmessages(parseInt(res.data));
              setnewNoti(false);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (error) {
        console.log(error.message);
      }

      try {
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
            if (parseInt(res.data) != totalnoti) {
              settotalnoti(parseInt(res.data));
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (error) {
        console.log(error.message);
      }
    }, 5000);
  });
  const logout = async () => {
    window.open(baseURLAPI + "/socialauth/logout", "_self");
    setAuth(false);
    localStorage.removeItem("isCounsellor");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("email");
    localStorage.removeItem("image");
    localStorage.removeItem("name");
    localStorage.removeItem("userID");
    localStorage.removeItem("isCompleted");
    localStorage.removeItem("verificationStatus");
  };

  const style = {
    borderRadius: 10,
    padding: "1em",
    width: "10rem",
  };

  var users = `This is just an amazing website. Isn't it...?? `;

  return (
    <>
      <Grid.Row>
        <Grid.Column width={16}>
          <Container
            clearing
            style={{
              backgroundColor: "transparent",
              width: "100%",
              padding: "30px 3rem 0px 3rem",
            }}
          >
            <div>
              <Menu secondary>
                <Menu.Item>
                  <Label color="blue" horizontal>
                    Hello {name}
                  </Label>
                </Menu.Item>
                <Menu.Menu position="right">
                  <Menu.Item
                     active={activeItem === 'Home'}
                
                     onClick={() => {
                       setactiveItem(  "Home"  ) 
                      setIsMessagesSelected(false);
                      setisRequestSelected(false);
                      setViewChangeSelected(false);
                      setIsProfileSelected(!isProfileSelected);
                      setViewAcceptSelected(false);
                    }}
                  >
                    Home
                  </Menu.Item>

                  <Menu.Item
                   active={activeItem === 'Profile'}
                
                   onClick={() => {
                     setactiveItem(  "Profile"  ) 
                      setIsProfileSelected(!isProfileSelected);
                      setisRequestSelected(false);
                      setViewDeclineSelected(false);
                      setIsMessagesSelected(false);
                      setViewDeclineSelected(false);
                      setViewAcceptSelected(false);
                      setViewChangeSelected(false);
                    }}
                  >
                    View Profile
                  </Menu.Item>

                  <Menu.Item
                active={activeItem === 'Request'}
                
                onClick={() => {
                  setactiveItem(  "Request"  ) 
                      setIsMessagesSelected(false);
                      setisRequestSelected(!isRequestSelected);
                      setViewAcceptSelected(false);
                      setIsProfileSelected(false);
                      setViewChangeSelected(false);
                      setViewDeclineSelected(false);
                    }}
                  >
                    View Request
                  </Menu.Item>

                  <Menu.Item
                    active={activeItem === 'Declined'}
                
                    onClick={() => {
                      setactiveItem(  "Declined"  ) 
                      setIsMessagesSelected(false);
                      setViewDeclineSelected(!isViewDeclineSelected);
                      setViewAcceptSelected(false);
                      setIsProfileSelected(false);
                      setViewChangeSelected(false);
                      setisRequestSelected(false);
                    }}
                  >
                    View Declined Request
                  </Menu.Item>
                  <Menu.Item
                    active={activeItem === 'Accepted'}
                
                    onClick={() => {
                      setactiveItem(  "Accepted"  ) 
                      setIsMessagesSelected(false);
                      setViewAcceptSelected(!isViewAcceptSelected);
                      setViewDeclineSelected(false);
                      setViewChangeSelected(false);
                      setIsProfileSelected(false);
                      setisRequestSelected(false);
                    }}
                  >
                    View Accepted Request
                  </Menu.Item>

                  <Menu.Item
                   active={activeItem === 'Change'}
                
                   onClick={() => {
                     setactiveItem(  "Change"  ) 
                      setIsMessagesSelected(false);
                      setViewChangeSelected(!isViewChangeSelected);
                      setViewAcceptSelected(false);
                      setViewDeclineSelected(false);
                      setisRequestSelected(false);
                      setIsProfileSelected(false);
                    }}
                  >
                    View Change Request
                  </Menu.Item>
                  <Menu.Item>
                    <Menu text>
                      <Menu.Item
                        onClick={() => {
                          setOpenNotiSelected(false);
                          setOpenMessageSelected(!OpenMessageSelected);
                        }}
                      >
                        <p>
                          <Icon name="mail" style={{ margin: "0px" }} />
                          {totalmessages > 0 ? (
                            <Label color="red" floating>
                              {totalmessages}
                            </Label>
                          ) : (
                            <p></p>
                          )}
                        </p>
                      </Menu.Item>
                    </Menu>

                    <strong ref={contextRef}> </strong>
                    <Popup
                      flowing
                      hoverable
                      popper={{ id: "popper-container" }}
                      position="top right"
                      open={OpenMessageSelected}
                      context={contextRef}
                      content={
                        <Grid
                          style={{
                            width: "500px",
                            height: "400px",
                            overflowY: "scroll",
                            marginBottom: "15px",
                          }}
                        >
                          <Grid.Column>
                            <ViewMessages />
                          </Grid.Column>
                        </Grid>
                      }
                    />
                  </Menu.Item>
                  <Menu.Item>
                    <Menu text>
                      <Menu.Item
                        onClick={() => {
                          setOpenNotiSelected(!OpenNotiSelected);
                          setOpenMessageSelected(false);
                        }}
                      >
                        <Icon name="alarm" style={{ margin: "0px" }} />
                        {totalnoti > 0 ? (
                          <Label color="red" floating>
                            {totalnoti}
                          </Label>
                        ) : (
                          <p></p>
                        )}
                      </Menu.Item>
                    </Menu>

                    <strong ref={contextRefNoti}> </strong>
                    <Popup
                      flowing
                      hoverable
                      popper={{ id: "popper-container" }}
                      position="top right"
                      open={OpenNotiSelected}
                      context={contextRefNoti}
                      content={
                        <Grid
                          style={{
                            width: "500px",
                            height: "400px",
                            overflowY: "scroll",
                            marginBottom: "15px",
                          }}
                        >
                          <Grid.Column>
                            <ViewNoti />
                          </Grid.Column>
                        </Grid>
                      }
                    />
                  </Menu.Item>
                  <Menu.Item
                    as="a"
                    onClick={(e) => logout()}
                    style={{ marginRight: "10px" }}
                  >
                    <Icon name="sign out" />
                    Log out
                  </Menu.Item>
                </Menu.Menu>
              </Menu>{" "}
            </div>
          </Container> 
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <div>
                
            {parseInt(localStorage.isCompleted) == 0 && (
              <div
                onClick={() => {
                  setIsProfileSelected(!isProfileSelected);
                  setisRequestSelected(false);
                  setViewDeclineSelected(false);
                  setIsMessagesSelected(false);
                  setViewDeclineSelected(false);
                  setViewAcceptSelected(false);
                  setViewChangeSelected(false);
                }}
                class="ui message"
                style={{ backgroundColor: "#EA3C53", color: "white" }}
              >
                Click here to complete profile set up
              </div>
            )}
            <br />
          </div>
        </Grid.Column>
      </Grid.Row>
      {isProfileSelected && parseInt(localStorage.isCompleted) == 1 && (
        <ViewCounsellorEdit />
      )}
      {isProfileSelected && parseInt(localStorage.isCompleted) == 0 && (
        <ViewCounsellorProfile />
      )}
      {isViewDeclineSelected && <ViewDeclined />}
      {isViewAcceptSelected && <ViewAccepted />}
      {isRequestSelected && <ViewRequest />}
      {isViewChangeSelected && <ViewCounsellorChangeRequest />}
      {isMessagesSelected && <ViewMessages />}
    </>
  );
};

export default CounsellorDashboard;
