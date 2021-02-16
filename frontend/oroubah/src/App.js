import API_URL from './apiConfig'
import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import AllApointments from "./components/admin/AllAppointments";
import AllUsers from "./components/admin/AllUsers";
import Footer from "./components/pages/Footer";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Login from "./components/pages/Login";
import NavBar from "./components/pages/NavBar";
import OneCard from "./components/pages/OneCard";
import ShowInformation from "./components/pages/ShowInformation";
import Profile from "./components/users/Profile";
import AuthRouter from "./components/users/AuthRouter";
import SignUp from "./components/users/SignUp";

function App() {

  const [dataLoading, setDataloading] = useState(false)
  const [auth, setAuth] = useState({ currentUser: null, isLoggedIn: false });

  const userLogin = () => {
    if (localStorage.jwtToken) {
      const jwtToken = localStorage.jwtToken;
      const currentUser = jwt_decode(jwtToken, "SECRET").user;
      setAuth({ currentUser, isLoggedIn: true });
    } else {
      setAuth({ currentUser: null, isLoggedIn: false });
    }

    setDataloading(true)
  };
  console.log("The current User is: ", auth.currentUser, "data loading", dataLoading);

  useEffect(userLogin, []);


  return (
    <>
      {dataLoading &&
        <Router>

          <NavBar isLoggedIn={auth.isLoggedIn} loginCallback={userLogin} />

          <Route path="/login">
            <Login loginCallback={userLogin} auth={auth} />
          </Route>
          <Route path="/home" >
            <Home auth={auth} />
          </Route>

          <Route path="/about" >
            <About />
          </Route>

          <Route path="/signup">
            <SignUp loginCallback={userLogin} />
          </Route>
          <Route path="/profile">
            <Profile auth={auth} />
          </Route>
          <Route path="/auth">
            <AuthRouter auth={auth} />
          </Route>

          <Route path="/show/:id">
            <ShowInformation auth={auth} />
          </Route>
          <Route exact path="/">
            <Home auth={auth} />
          </Route>
          <Footer />
        </Router>
      }
    </>
  );
}

export default App;
