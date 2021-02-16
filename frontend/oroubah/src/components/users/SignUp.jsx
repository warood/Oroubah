import API_URL from '../../apiConfig'
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Form, Col, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validtionSchima = Yup.object({
  name: Yup.string().required("This Field is Reqiured"),
  email: Yup.string().required(" This Field is Reqiured!!").email("example@example.com"),
  password: Yup.string().required("This Field is Reqiured!!").min(8, "must be more than 8 ").max(20, "whatEver")
})


export default function Singup(props) {
  const history = useHistory();

  const [user, setUser] = useState(false ? "" : { name: "", email: "", password: "" }); // user info
  const [register, setRegister] = useState(true); // to show aleart



  // to add the user info to database
  const onSubmit = (values) => {
    console.log("test")
    // values.preventDefault();
    axios
      .post(`${API_URL}/api/auth/register`, values)
      .then((res) => {
        const user = res.data.user;
        if (user) {
          history.push("/login");
        } else {

          setTimeout(() => {
            setRegister(true);
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {!register && (
        <Alert variant={"danger"}>
          The email is already in use. Please change the email
        </Alert>
      )}
      <Formik
        initialValues={user}
        validationSchema={validtionSchima}
        onSubmit={values => onSubmit(values)}

      >
        <FormikForm className="mt-5">
          <Row className="justify-content-center mt-5">
            <Col md={8}>
              <Form.Row>
                <Col md={12}>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      as={Field}
                      type="email"
                      placeholder="Enter email"
                      name="email"
                    />
                  </Form.Group>

                  <ErrorMessage name="email" render={(msg) => <Alert variant={"danger"}>
                    {msg}
                  </Alert>} />
                </Col>
                <Col md={12}>
                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      as={Field}
                      type="password"
                      placeholder="Password"
                      name="password"

                    />
                  </Form.Group>
                  <ErrorMessage name="password" render={(msg) => <Alert variant={"danger"}>
                    {msg}
                  </Alert>} />
                </Col>
                <Col md={12}>
                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      as={Field}
                      placeholder="First name"
                      name="name"

                    />

                    <ErrorMessage name="name" render={(msg) => <Alert variant={"danger"}>
                      {msg}
                    </Alert>} />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Col md={12}>
                <Button className="mt-2" variant="dark" type="submit">Submit</Button>
              </Col>
            </Col>
          </Row>
        </FormikForm>
      </Formik>
    </>
  );
}