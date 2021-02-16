import React from 'react'
import { Container, Row, Col, Carousel, Button, Image, Card } from "react-bootstrap";




export default function About() {

    return (
        <>
            <Container className="mt-5" >
                <Carousel >
                    <Carousel.Item style={{ height: "500px", width: "1300px" }}>
                        <img

                            className="d-block w-100"
                            width="100%"
                            height="100%"
                            background-size="contain"
                            src="https://hobe.cc/wp-content/uploads/2019/09/326.jpg"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                       
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item style={{ height: "500px", width: "1300px" }} >
                        <img
                            //className="d-block w-100"
                            width="100%"
                            height="100%"
                            background-size="contain"
                            src="https://www.alassalah.com/wp-content/uploads/2013/02/SSS_3048.jpg"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item style={{ height: "500px", width: "1300px" }}>
                        <img
                            className="d-block w-100"
                            width="100%"
                            height="100%"
                            background-size="contain"
                            src="https://img.soutalomma.com/Large/201711181121192119.jpg"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                        
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

                <Row >

                    <Col md="4" sm="4" className="mt-3">
                        <Card style={{ height: "550px" }} className="card-movie">
                            <Card.Img variant="top" src="https://i.pinimg.com/564x/3b/59/5b/3b595b5a0fe57dd7954e6c9e6b26938e.jpg" height="300px" style={{ margin: "auto", objectFit: "cover" }} />
                            <Card.Body>
                                <Card.Title>About Arabian Horse</Card.Title>
                                <Card.Text>
                                    The purebred Arabian horse is striking. An Arabian's most identifiable characteristics are its finely chiseled head, dished face, long arching neck and high tail carriage.
                     </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>


                    <Col md="4" sm="4" className="mt-3">
                        <Card style={{ height: "550px" }} className="card-movie">
                            <Card.Img variant="top" src="https://i.pinimg.com/564x/b5/b3/43/b5b34380c7e35ba7e4170fb36366597d.jpg" height="300px" style={{ margin: "auto", objectFit: "cover" }} />
                            <Card.Body>
                                <Card.Title>About Arabian Horse</Card.Title>
                                <Card.Text>
                                    Its entire appearance exudes energy, intelligence, courage and nobility. Every time an Arabian moves in its famous "floating trot," he announces to the world his proud, graceful nature.                     </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md="4" sm="4" className="mt-3">
                        <Card style={{ height: "550px" }} className="card-movie">
                            <Card.Img variant="top" src="https://i.pinimg.com/564x/ce/c2/93/cec293be759a034cc42a8018ba921dbb.jpg" height="300px" style={{ margin: "auto", objectFit: "cover" }} />
                            <Card.Body>
                                <Card.Title>About Arabian Horse</Card.Title>
                                <Card.Text>
                                For thousands of years, Arabians lived among the desert tribes of the Arabian Peninsula, bred by the Bedouins as war mounts for long treks and quick forays into enemy camps. In these harsh desert conditions evolved the Arabian with its large lung capacity and incredible endurance.
                     </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </>
    )
}


