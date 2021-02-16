import React, { useState, useEffect } from "react";
import { Badge, Button, Col, Card, Row, Modal, Form, Dropdown } from 'react-bootstrap'
import Moment from 'react-moment';


export default function CardOfApointment(props) {
    const statusFunction = () => {
        if (props.status === "approved") {
            return <Badge variant="success">{props.status}</Badge>

        }
        else if (props.status == "pending") {
            return <Badge variant="warning">{props.status}</Badge>
        } else {
            return <Badge variant="danger">{props.status}</Badge>
        }
    }
    //console.log(props.apointmentsName)
    console.log(props.apointmentsId)


    return (
        <>

            <Col className="mt-5 m-0 " style={{ left: "80px", width: "1000px" }}  >
                <Card className="ml-5" style={{ width: "900px" }}>
                    <Row style={{ height: "100%" }} >
                        <Col xs={6} md={5}  >
                            <Card.Img style={{ width: "100%" }} variant="top" src="https://www.thesprucepets.com/thmb/ZLc9b-JnmKNJVUxwztz8_5KnSoU=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/man-training-horse-on-rein-672158405-58b4464b3df78cdcd8ce21e1.jpg" />

                        </Col>
                        <Col style={{ width: "300px", left: "150px" }} className="pl-5 mt-2" >
                            <Card.Body>
                                <Row style={{ height: "100%" }}>
                                    <Col className="pr-5" style={{ width: "200px", left: "-200px" }}>
                                        <Card.Text  >
                                            <h6>  Class Name :</h6>
                                            {props.apointmentsName}
                                        </Card.Text>
                                    </Col >
                                    <Col style={{ width: "500px", left: "-200px" }}>
                                        <Card.Text  >

                                            <h6>  Date :</h6>
                                          
                                            <Moment format="D MMM YYYY" withTitle>
                                            <time title={props.apointmentsId}>19 Apr 1976</time>
                                                </Moment>
                                        </Card.Text>
                                    </Col >
                                </Row>
                                <Row style={{ height: "100%" }}>
                                    <Col className="pr-5" style={{ width: "200px", left: "-200px" }}>
                                        <Card.Text  >
                                            <h6>  Number Of People :</h6> {props.numberOfPeople}
                                        </Card.Text>
                                    </Col >
                                    <Col style={{ width: "200px", left: "-200px" }}>
                                        <Card.Text  >
                                            <h6> Period:</h6>    {props.period}
                                        </Card.Text>
                                    </Col >
                                </Row>

                                <Row className="pt-3" style={{ height: "100%" }}>
                                    <Col className="pr-0" style={{ width: "200px", left: "-200px" }}>
                                        <Card.Text >
                                            <h6>Apointment ID:</h6>  {props.apointmentsId}
                                        </Card.Text>
                                    </Col >
                                    <Col className="pt-1" style={{ left: "-175px" }}>
                                        <Card.Text  >
                                            <h6>  status :  {statusFunction()}</h6>
                                        </Card.Text>
                                    </Col>
                                </Row>
                      



                            </Card.Body>

                        </Col>
                    </Row>

                </Card>
            </Col>


        </>
    )
}
