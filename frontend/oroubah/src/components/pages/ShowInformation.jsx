import API_URL from '../../apiConfig'
import axios from 'axios'
import React, { useState,useEffect } from 'react'
import {  Button, Col, Card, Row, Modal, Form, Dropdown, DropdownButton  } from 'react-bootstrap'
import {useParams , Link} from 'react-router-dom';



export default function ShowInformation(props) {

    const [selectClass, setSelectClass] = useState("")
    const {category , target , description , image } = selectClass
    const {id} = useParams()


        useEffect(() => {
            if (!category) {
                axios.get(`${API_URL}/api/dashboard/classes`)
                .then(res =>{     
                    let classOne = res.data.classes.find(ele => ele._id == id)
                    console.log(classOne)
                    setSelectClass(classOne)
                })
            }
    
    }, [])



    
    return (
        <>



                    <Row>
                        <Col className="pl-5 mt-3" style={{ width: "200px" }}>
                            <Card.Img variant="top" src={image}
 />
                        </Col>
                        <Col className="mt-5">
                            <Card.Body>
                                <Col style={{ width: "400px" }}>
                                    <Card.Text  >
                                    <h1>{category} </h1>
                                    </Card.Text>
                                </Col >
                             
                                <Col className="mt-3" style={{ width: "500px" }}>
                                    <Card.Text  >
                                   <h4> {description} </h4> 
                                    </Card.Text>
                                </Col >
                        

                            </Card.Body>

                        </Col>
                    </Row>

        </>
    )
}

  




