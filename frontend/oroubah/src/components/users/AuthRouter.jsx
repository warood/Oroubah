import React from 'react'
import { Route, Redirect } from "react-router-dom";
import Profile from '../users/Profile';
import Home from "../pages/Home";
// import Dashboard from "../pages/Dashboard";

import { useHistory } from 'react-router-dom'


export default function AuthRouter(props) {
    const {role} = props.auth.currentUser;
  const history = useHistory();
    // if loged in 
    if (props.auth.isLoggedIn) {
        if (role === 'admin')
            {
                console.log('I am Admin ')
            history.push("/dashboard");

            return (
              <Route>
                {/* <Dashoard /> */}
              </Route>
            );
    } else 
    {
        console.log('I am User ')

        history.push("/profile");
        return (
            <Route>
            </Route> 
          );   
    }
    }
    else 
    {
        return (
            <Route>
                <Home />
            </Route>
          );  
    }




}
