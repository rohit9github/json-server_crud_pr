import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


function Home() {

    let [data, setData] = useState({});

    let getValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setData({ ...data, [name]: value });
    }
    let submitData = (e) => {
        e.preventDefault()
        fetch("http://localhost:3000/data", {
            method: "POST",
            body: JSON.stringify(data)
        }).then(() => {
            alert("data added")
            setData({})
        })
            .catch(() => {
                alert("something wrong")
            })
    }

    return (
        <>
            <Container>
                <Row className="justify-content-md-center">

                    <Col md="5">
                        <Form method="post" onSubmit={(e) => submitData(e)}>
                            <Form.Group className="mb-3" controlId="formGroupName">
                                <Form.Label>UserName</Form.Label>
                                <Form.Control type="text" name="userName" value={data.userName?data.userName:""} placeholder="Enter UserName" onChange={(e) => getValue(e)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name="mail" value={data.mail?data.mail:""} placeholder="Enter email" onChange={(e) => getValue(e)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="pass" value={data.pass?data.pass:""} placeholder="Password" onChange={(e) => getValue(e)} />
                            </Form.Group>
                            <Button variant="primary" type="submit">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default Home;