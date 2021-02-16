import API_URL from '../../apiConfig'
import React, { useState, useEffect } from "react";
import Axios from 'axios'
import OneCard from './OneCard'
import { Col, Image, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';



export default function Home(props) {

    const [classes, setClasses] = useState([])
    const [period, setPeriod] = useState("")

    useEffect(() => {
        Axios.get(`${API_URL}/api/dashboard/classes`)
            .then((res) => {
                console.log("all classes", res.data.classes);
                setClasses(res.data.classes)

            })
            .catch(err => console.log(" No classes here"))

    }, [])


    console.log(classes)
    const allClasses = classes.map(classes => {
        return <OneCard classes={classes} auth={props.auth} />
    })


    return (
        <>
            <div className='image-header'></div>
            <section id="hero">
                <div className="hero-container">
                    <h1></h1>
                </div>
            </section>
            <Row className="justify-content-md-center ml-5" style={{}}  >
                {allClasses}
            </Row>
        </>


    )
}
