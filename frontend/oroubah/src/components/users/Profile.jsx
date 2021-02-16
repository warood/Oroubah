import API_URL from '../../apiConfig'
import React, { useEffect, useState } from "react";
import { Nav, Button, Form, FormControl, InputGroup, Col, Container, Image, Row, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import CardOfApointment from "../pages/CardOfApointment"
import '../../App.css'



export default function Profile(props) {


    const { name, email, password, image, _id } = props.auth.currentUser;
    //upload image state
    const [changeImage, setChangeImage] = useState("")

    const [userInformation, setUserInformation] = useState({});

    const [show, setShow] = useState(false);
    const [profile, setProfile] = useState({});
    const [apointments, setApointments] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const uploadImageHundler = (e) => {
        var format = new FormData()
        format.append("image", e.target.files[0])
        axios.post("https://api.imgur.com/3/image/", format, { headers: { "Authorization": "Client-ID 8e90d3bf7f85d65" } })
            .then((data) => {
                // console.log(data.data.data.link)
                const image1 = data.data.data.link
                setChangeImage(data.data.data.link)
                console.log('....................................', image1)

                setProfile((previousProfile) => ({ ...previousProfile, image: 'data.data.data.link' }))

                console.log('I changed the image to ', data.data.data.link)
                console.log('Changed image stored is', changeImage)
            })
            .catch(err => console.log(err))
    }
    //console.log(props.name)


    //upload image function

    useEffect(() => {
        axios.get(`${API_URL}/api/users/${_id}/profile`)

            .then((res) => {
                setApointments(res.data.userAppointments)
                setUserInformation(res.data.user)
                setProfile(res.data.user)
                // setChangeImage(image1)
                console.log('&&&&&&&&&&&&&&&&&', changeImage)
            })
        // console.log('profile',profile)
    }, [])


    const onChangeInput = (e) => {
        e.preventDefault();
        // console.log('the image is............', changeImage)


        setProfile((previousProfile) => ({ ...previousProfile, [e.target.name]: e.target.value, image: changeImage }))

    };

    const onSubmit = () => {
        // setProfile({image : changeImage })
        // console.log('image on sumit is',image)
        console.log("profile on submit", profile)

        axios.put(`${API_URL}/api/users/${_id}/profile/edit`, profile)
            .then(res => console.log('from backend i recieved ', res))
        setShow(false)


    }



    //console.log(apointments[3].class.category)
    // console.log("change image " , changeImage)
    const allApointment = apointments.map((apointment, index) => {
        return <CardOfApointment
            apointmentsName={apointment.class ? apointment.class.category : 'm'}
            apointmentsDate={apointment.date}
            numberOfPeople={apointment.numOfPeople}
            period={apointment.period}
            status={apointment.status}
            apointmentsId={apointment._id}
        />
    })

    //console.log(apointments)
    // console.log(profile)

    return (
        <>
            <Container className="pt-5"  >
                <Row>
                    <Col xs={4} xl={3} md={4}>
                        <Image src={userInformation.image} width="100%" />
                    </Col>
                    <Col xs={4} xl={6} md={4}>
                        <h2> Name: {userInformation.name} </h2>
                        <h3> Email: {userInformation.email} </h3>
                    </Col>
                    <Col className="pt-5" >

                        <Button style={{ width: "150px" }} variant="dark" onClick={handleShow} type="submit" >
                            Edit
                        </Button>

                    </Col>
                </Row>
                <hr />
                <Row className="justify-content-md-center">
                    <h1> Apointments ({apointments.length})</h1>
                </Row>
                <Row>
                    {allApointment}

                </Row>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile </Modal.Title>
                </Modal.Header>
                <Modal.Body><InputGroup className="mb-3 mt-5">
                    <InputGroup.Prepend >
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        defaultValue={userInformation.name}
                        name="name"
                        onChange={(e, value) => onChangeInput(e)}
                    />
                </InputGroup>

                    <InputGroup className="mb-4">
                        <FormControl
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            defaultValue={userInformation.email}
                            name="email"

                            onChange={(e) => onChangeInput(e)}
                        />
                        <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>

                    <InputGroup className="mb-4">
                        <FormControl
                            type="password"
                            placeholder="Recipient's Password"
                            aria-label="New Password"
                            aria-describedby="basic-addon2"
                            name="password"

                            onChange={(e) => onChangeInput(e)}
                        />
                        <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2">change paswword</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>

                    <InputGroup className="mb-3 mt-5">
                        <Form.File
                            type="file"
                            className="custom-file-label"
                            id="image"
                            name="image"
                            label="Upload image "
                            custom
                            onChange={uploadImageHundler}
                        />

                    </InputGroup>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleClose}>
                        Close
          </Button>
                    <Button variant="dark" onClick={(e) => onSubmit(e)}>
                        Save Changes
          </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}