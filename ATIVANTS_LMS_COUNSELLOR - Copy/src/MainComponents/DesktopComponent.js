import { Segment, Grid, Message } from "semantic-ui-react";
import GetWidthOfComponent from "./GetWidthOfComponent";
import React, { useState, useEffect } from "react";
import _NavigationItems from "../SecondaryComponents/Desktop/_NavigationItems";
import _Promos from "../SecondaryComponents/Desktop/_Promos";
import axios from "axios";
import { Responsive } from "semantic-ui-react";
import UserDashboard from "../SecondaryComponents/Desktop/UserDashboard/layout/Counsellee/CounselleDashboard/UserDashboard";
import CounsellorDashboard from "../SecondaryComponents/Desktop/UserDashboard/layout/Counsellor/CounsellorDashboard/CounsellorDashboard";
import AdminDashboard from "../SecondaryComponents/Desktop/UserDashboard/layout/Admin/AdminDashboard/AdminDashboard";

 
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { baseURLAPI, baseURL } from "../Global";
const Authorize = React.createContext();

const DesktopComponent = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState({
    header: "",
    content: "",
    color: "",
  });
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const checkAuthenticated = async () => {
    try {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);

      const header = urlParams.get("header");
      const content = urlParams.get("content");
      const color = urlParams.get("color");
      console.log("color");
      if (content != null) {
        setMessage({ header, content, color });
      }

      if (localStorage.jwtToken) {
        const CalendarId = urlParams.get("id");

        if (CalendarId && localStorage.userID) {
          const response = await axios({
            url:
              baseURLAPI +
              "/request/userID?userID=" +
              localStorage.userID +
              "&requestID=" +
              CalendarId,
            method: "GET",
          });

          console.log(response);

          if (response.status == 200) {
            window.close();
          }
        }

        const res = await fetch(baseURLAPI + "/auth/verify/", {
          method: "GET",
          headers: { jwtToken: localStorage.jwtToken },
        });
        const parseRes = await res.json();
        console.log("parseRes");
        console.log(parseRes);

        if (parseRes.message) {
          setIsAuthenticated(true);
        } else {
          localStorage.clear();

          setIsAuthenticated(false);
       
        }

        fetch(baseURLAPI + "/user/" + localStorage.userID, {
          method: "GET",
        })
          .then((response) => {
            if (response.status === 200) return response.json();
            throw new Error("failed to authenticate user");
          })
          .then((parseResponse) => {
            localStorage.setItem("email", parseResponse.user.TX_USER_EMAIL);
            localStorage.setItem(
              "isCounsellor",
              parseResponse.user.IS_COUNSELLOR
            );
            localStorage.setItem("image", parseResponse.user.TX_PICTURE);
            localStorage.setItem("userID", parseResponse.user.ID_USER_UUID);
            localStorage.setItem("name", parseResponse.user.TX_USER_NAME);
            localStorage.setItem(
              "isCompleted",
              parseResponse.user.TX_IS_COMPLETED
            );

            localStorage.setItem(
              "verificationStatus",
              parseResponse.user.TX_VERIFICATION_STATUS
            );
          });
      } else {
        fetch(baseURLAPI + "/socialauth/login/success", {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": false,
          },
        })
          .then((response) => {
            if (response.status === 200) return response.json();
            throw new Error("failed to authenticate user");
          })
          .then((parseResponse) => {
            console.log("responseJson is -====", parseResponse);
            localStorage.setItem("jwtToken", parseResponse.jwtToken);

            localStorage.setItem("email", parseResponse.user.TX_USER_EMAIL);
            localStorage.setItem(
              "isCounsellor",
              parseResponse.user.IS_COUNSELLOR
            );
            localStorage.setItem("image", parseResponse.user.TX_PICTURE);
            localStorage.setItem("userID", parseResponse.user.ID_USER_UUID);
            localStorage.setItem("name", parseResponse.user.TX_USER_NAME);
            localStorage.setItem(
              "isCompleted",
              parseResponse.user.TX_IS_COMPLETED
            );

            localStorage.setItem(
              "verificationStatus",
              parseResponse.user.TX_VERIFICATION_STATUS
            );

            const res = fetch(baseURLAPI + "/auth/verify/", {
              method: "GET",
              headers: { jwtToken: localStorage.jwtToken },
            });
            setIsAuthenticated(true);
          })
          .catch((error) => {
            console.log("error is -====", error);
          });
      }
    } catch (err) {
      console.log(
        "---------------------------------------------------------------------",
        err
      );
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  return (
    <Responsive
      getWidth={GetWidthOfComponent}
      minWidth={Responsive.onlyTablet.minWidth}
    >
      <Router>
        <div className="container">
          {message.header.length > 0 ? (
            //       <Message    width="100%" height="100px"
            //   header={message.header}
            //   content={message.content}
            //   color={message.color}
            // />
            <div>
              <Grid
                textAlign="center"
                style={{ height: "100vh" }}
                verticalAlign="middle"
              >
                <Grid.Column style={{ maxWidth: 600 }}>
                  <Segment stacked>
                    <Message
                      size="large"
                      header={message.header}
                      content={message.content}
                      color={message.color}
                    />
                  </Segment>
                </Grid.Column>
              </Grid>
            </div>
          ) : (
            <Authorize.Provider value={setAuth}>
              <Switch>
                <Route
                  exact
                  path="/dashboard"
                  render={(props) =>
                    localStorage.isCounsellor ? (
                      parseInt(localStorage.isCounsellor) == 1 ? (
                        <div>
                          <CounsellorDashboard {...props} />
                        </div>
                      ) :     parseInt(localStorage.isCounsellor) == 4 ? 
                        (<div> 
                          <AdminDashboard {...props} />
                        </div>):(
                        <div> 
                          <UserDashboard {...props} />
                        </div>)



                     
                    ) : (
                      <Redirect to="/" />
                    )
                  }
                ></Route>
                <Route
                  exact
                  path="/"
                  render={(props) =>
                    !isAuthenticated ? (
                      <_NavigationItems {...props} />
                    ) : (
                      <Redirect to="/dashboard/" />
                    )
                  }
                ></Route>
              </Switch>
            </Authorize.Provider>
          )}
        </div>
      </Router>
    </Responsive>
  );
};

export default DesktopComponent;
export { Authorize };
