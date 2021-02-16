import API_URL from '../../apiConfig'
import axios from "axios";
import React from 'react'
import { useEffect, useState } from "react";
import { useHistory , Link } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Login(props) {
    const history = useHistory();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
  
    const onChangeInput = (event) => {
      const { name, value } = event.target;
      setCredentials({
        ...credentials,
        [name]: value,
      });
    };
  
    const onSubmit = (event) => {
      event.preventDefault();
      axios
        .post(`${API_URL}/api/auth/login`, credentials)
        .then((res) => {
          console.log("Express backend /login response", res);
  
          const token = res.data.token;
          const msg = res.data.msg;
  
          if (token) {
            localStorage.setItem("jwtToken", token);
            props.loginCallback();
            console.log('props.loginCallback();',props.loginCallback())
            console.log('before navigating to the profile')
            history.push("/auth");
          } else {
            console.log("Login error: ", msg);
          }
        });
    };


    return (
        <>
        <Form className="mt-5">
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <Form.Row>
          <Col md={12}>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={(e) => onChangeInput(e)}
              />
              
            </Form.Group>
            </Col>
            <Col md={12}>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => onChangeInput(e)}
              />
            </Form.Group>
            </Col>
            <Form.Group>
            <Col md={12}>
          <p> You don't have an account? Please <Link eventKey={2} as={Link} to="/signup">
            Register
          </Link> </p>
          <Button className="mt-2" variant="dark" type="submit" onClick={(e) => onSubmit(e)}>
            Submit
          </Button>
          </Col>
            </Form.Group>
         
          </Form.Row>
         
        </Col>
      </Row>
      

    </Form>
    
    </>
    )
}
