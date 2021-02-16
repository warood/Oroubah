import React from 'react'
import { Button, Nav, Navbar } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import '../../App.css';
import { Link, useHistory } from 'react-router-dom'

export default function NavBar(props) {
  const history = useHistory();
  if(props.isLoggedIn)
  {
    console.log('You are in the navbar and logged in')
    return (

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='nav-back-color'>
        <Navbar.Brand href="/home" style={{fontSize:"45px"}} className='rakkah'>عروبة</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto ">
            <Nav.Link className="pl-5" href="/home">Home</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/about">About us</Nav.Link>
          </Nav>
             <Nav>
      <Nav.Link
            onClick={() => {
              console.log("Logging Out!");
              localStorage.removeItem("jwtToken");
              props.loginCallback() 
              history.push(`/home`)
              ;
            }}
          >
            Logout
          </Nav.Link>
      </Nav>
          
        </Navbar.Collapse>
      </Navbar>
    
    )
  }
  else 
  {
    console.log('You are in the navbar and not logged in')
    return (

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='nav-back-color'>
        <Navbar.Brand href="/home" style={{fontSize:"45px"}} className='rakkah'>عروبة</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="pl-5" href="/home">Home</Nav.Link>
            <Nav.Link href="/about">About us</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/login">Login </Nav.Link>
            <Nav.Link href="/signup">Register </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    
    )

  }



}
