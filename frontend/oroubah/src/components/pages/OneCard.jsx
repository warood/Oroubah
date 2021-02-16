import API_URL from '../../apiConfig'
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Col, Card, Row, Modal, Form, Dropdown, DropdownButton } from 'react-bootstrap'

import Axios from 'axios'
import axios from "axios";
import { Link, useHistory } from 'react-router-dom'
import ShowInformation from "../pages/ShowInformation";

export default function OneCard(props) {

    const today = new Date();
    const year = today.getFullYear()
    var month = '', day = ''
    if ((today.getMonth() + 1) < 10)
        month = '0' + (today.getMonth() + 1)
    else
        month = today.getMonth() + 1

    if (today.getDate() < 10)
        day = '0' + today.getDate()
    else
        day = today.getDate()

    const todayDate = year + "-" + month + "-" + day;
    const [classId, setClassId] = useState('');
    const [show, setShow] = useState(false);
    const [cardId, setCardId] = useState()
    const [appDate, setAppDate] = useState()
    const handleClose = () => setShow(false);
    const [period, setPeriod] = useState('morning')
    const [numOfPeople, setNumOfPeople] = useState(1)
    const [newAppointment, setNewAppointment] = useState({})
    const history = useHistory();

    const handleShow = (id) => {
        if (!props.auth.currentUser) {
            console.log('plese register')
            alert('Please register')
        }
        else {
            setShow(true);
            setCardId(id)
        setNewAppointment({period:period , numOfPeople:numOfPeople , date:appDate, class:cardId})
    }

    }

    const handleSelectPeriod = (e) => {
        setPeriod(e);
        setNewAppointment({period:period , numOfPeople:numOfPeople , date:appDate, class:cardId})
    }

    const handleSelectPeople = (e) => {
        setNumOfPeople(e)
        setNewAppointment({period:period , numOfPeople:numOfPeople , date:appDate, class:cardId})
        
    }

    const onChangeInput = (e) => {
        setAppDate(e.target.value)
        setNewAppointment({period:period , numOfPeople:numOfPeople , date:e.target.value, class:cardId})
    };

    const showInfo = (id) => {
        history.push(`/show/${id}`)
        console.log(id)
        setClassId(id)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('Book')
        console.log('newAppointment',newAppointment)

        axios.post(`${API_URL}/api/users/${props.auth.currentUser._id}/appointments/new`, newAppointment)
          .then((res) => {
              console.log(res)
          })
          .catch((err) => console.log(err));
          setShow(false);
      };


      props.classes.filter = (ele) => {


console.log(ele._id)    }
  

    return (  <>


           


                <Card className="mt-5 ml-5 m-0" style={{ width: "800px", height: "100%", backgroundColor: "#303030" }}>
                    <Row>
                        <Col style={{ width: "200px" }}>

                            <Card.Img style={{ height: "245px"}} variant="top" src={props.classes.image} />

                        </Col>
                        <Col>
                            <Card.Body className="">
                                <Col style={{ width: "200px" }}>
                                    <Card.Text className="text-white">
                                     <h3>{props.classes.category}</h3>   

                                        <Button style={{ width: "150px" }} variant="dark" onClick={(id) => handleShow(props.classes._id)} >Book This Class  </Button>
                                    <Button style={{ width: "150px" }} className="mt-2" variant="dark" onClick={(id) => showInfo(props.classes._id)}> Information </Button>
                                
                                    </Card.Text>
                                </Col >
                   
                            </Card.Body>
                        </Col>
                    </Row>
                    <Modal show={show} onHide={handleClose}>
                    <Form>
                        <Modal.Header closeButton>
                            <Modal.Title>Book An Appointment</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Label>Period</Form.Label>
                                    <DropdownButton
                                    variant="secondary"
                                        alignRight
                                        title="Select period"
                                        id="dropdown-menu-align-right"
                                        name="period"
                                        onSelect={(e) => handleSelectPeriod(e)}
                                    >
                                        <Dropdown.Item eventKey="morning">morning</Dropdown.Item>
                                        <Dropdown.Item eventKey="afternoon">afternoon</Dropdown.Item>
                                        <Dropdown.Item eventKey="evening">evening</Dropdown.Item>
                                        {/* <Dropdown.Divider /> */}
                                        {/* <Dropdown.Item eventKey="some link">some link</Dropdown.Item> */}
                                    </DropdownButton>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Label>Number of visitors</Form.Label>
                                    <DropdownButton
                                    variant="secondary"
                                        alignRight
                                        title="Select number of people"
                                        id="dropdown-menu-align-right"
                                        name="numOfPeople"
                                        onSelect={(e) => handleSelectPeople(e)}
                                    >
                                        <Dropdown.Item eventKey="1">only me</Dropdown.Item>
                                        <Dropdown.Item eventKey="2">my and someone else</Dropdown.Item>
                                        <Dropdown.Item eventKey="3">group of people</Dropdown.Item>
                                    </DropdownButton>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        placeholder="choose date"
                                        name="date"
                                        min={todayDate}
                                        onChange={(e) => onChangeInput(e)} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                         type="hidden"
                                         placeholder="choose date"
                                         name="classID"
                                         value={cardId} />
                                </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="secondary" onClick={(e) => onSubmit(e)}>Book</Button>
                        </Modal.Footer>
                    </Form>
                    </Modal>
                </Card>
      
                </>

    )
}