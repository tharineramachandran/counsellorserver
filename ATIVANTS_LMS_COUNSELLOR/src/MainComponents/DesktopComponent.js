import GetWidthOfComponent from './GetWidthOfComponent'
import React, { useState, useEffect } from 'react'
import _NavigationItems from '../SecondaryComponents/Desktop/_NavigationItems'
import _Promos from '../SecondaryComponents/Desktop/_Promos'
import axios from 'axios'
import { Responsive } from 'semantic-ui-react'
import UserDashboard from '../SecondaryComponents/Desktop/UserDashboard/UserDashboard';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const Authorize = React.createContext();

const DesktopComponent = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  const checkAuthenticated = async () => {
    try {
      if (localStorage.jwtToken) {
        console.log("statusssssss&&&&&&&&&&&&&&&&&&&&&&&& ==", localStorage.jwtToken)
        const res = await fetch("http://localhost:5000/auth/verify/", {
          method: "GET",
          headers: { jwtToken: localStorage.jwtToken }
        });
        const parseRes = await res.json();
        parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      }
      else {
        fetch("http://localhost:5000/socialauth/login/success", {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": false,
          }
        })
          .then(response => {
            if (response.status === 200) return response.json();
            throw new Error("failed to authenticate user");
          })
          .then(responseJson => {
            console.log("responseJson is -====", responseJson);
            localStorage.setItem("jwtToken", responseJson.jwtToken)
            setIsAuthenticated(true);
          })
          .catch(error => {
            console.log("error is -====", error);
          });
        }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  return (
    <Responsive getWidth={GetWidthOfComponent} minWidth={Responsive.onlyTablet.minWidth}>
      <Router>
        <div className="container">
          <Authorize.Provider value={setAuth}>
            <Switch>
              <Route exact path="/dashboard" render=
                {
                  props => isAuthenticated ?
                    (
                      <UserDashboard {...props} />
                    ) :
                    (
                      <Redirect to="/" />
                    )
                }>
              </Route>
              <Route exact path="/" render=
                {
                  props => !isAuthenticated ?
                    (
                      <_NavigationItems {...props} />
                    ) :
                    (
                      <Redirect to="/dashboard/" />
                    )
                }>
              </Route>
            </Switch>
          </Authorize.Provider>
        </div>
      </Router>
    </Responsive>
  )

}

export default DesktopComponent;

export {
  Authorize
}