import GetWidthOfComponent from './GetWidthOfComponent'
import React, { useState, useEffect } from 'react'
import _NavigationItems from '../SecondaryComponents/Desktop/_NavigationItems'
import _Promos from '../SecondaryComponents/Desktop/_Promos'
import axios from 'axios'
import { Responsive } from 'semantic-ui-react'
import UserDashboard from '../SecondaryComponents/Desktop/UserDashboard/UserDashboard';

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
      const res = await fetch("http://localhost:5000/auth/verify/", {
        method: "GET",
        headers: { jwtToken: localStorage.jwtToken }
      });

      const parseRes = await res.json();
      console.log(parseRes);
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  },[]);

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