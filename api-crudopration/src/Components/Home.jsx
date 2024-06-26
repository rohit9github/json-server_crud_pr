import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


function Home() {

    let [data, setData] = useState({});
    let [users, setUsers] = useState([]);
    let [id, setId] = useState(0);
    let [error, setError] = useState({});

    let getValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setData({ ...data, [name]: value });

        if (name == "userName") {
            if (value == "") {
                setError({ ...error, nameError: "UserName Is Required" });
            }
            else if (value.length < 2) {
                setError({ ...error, nameError: "UserName Is Required minimum 2 charcator" });
            }
            else {
                setError({ ...error, nameError: "" })
            }
        }
        else if (name == "mail") {
            if (value == "") {
                setError({ ...error, emailError: "Email Is Required" });
            }
            else {
                setError({ ...error, emailError: "" })
            }
        }
        else if (name == "pass") {  
            if (value == "") {
                setError({ ...error, passError: "Password Is Required" });
            }
            else if (value.length < 6) {
                setError({ ...error, passError: "Password Is Required minimum 6 charcator" });
            }
            else {
                setError({ ...error, passError: "" })
            }
        }
    }


    let submitData = (e) => {
        e.preventDefault()
        if (data.userName == undefined) {
            setError({ ...error, nameError: "UserName Is Required" })
        }
        else if (data.userName.length < 2) {
            setError({ ...error, nameError: "UserName Is Required minimum 2 charcator" });
        }
        else if (data.mail == undefined) {
            setError({ ...error, emailError: "Email Is Required" });
        }
        else if (data.pass == undefined) {
            setError({ ...error, passError: "Password Is Required" });
        }
        else if (data.pass.length < 6) {
            setError({ ...error, passError: "Password Is Required minimum 6 charcator" });
        }
        else {
            if (id === 0) {
                fetch("http://localhost:3000/data", {
                    method: "POST",
                    body: JSON.stringify(data)
                }).then(() => {
                    alert("data added")
                    setData({})
                    setError({})
                }).catch(() => {
                    alert("something wrong")
                })
            }
            else {
                fetch(`http://localhost:3000/data/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(data)
                }).then(() => {
                    alert("data updated")
                    setData({})
                    setId(0)
                }).catch(() => {
                    alert("something wrong")
                })
            }
            window.location.reload();
        }
    }

    useEffect(() => {
        getData()
    }, [setUsers]);

    let getData = () => {
        fetch("http://localhost:3000/data", {
            method: "GET"
        }).then(async (res) => {
            let arr = await res.json();
            console.log(arr);
            setUsers(arr);
        })
    }

    let deleteUser = (id) => {

        //    ( /// *** FIRST METHOD *** /// )   //

        // let pos = users.findIndex((v, i) => v.id == id);
        // console.log(pos)
        // if (pos != -1) {
        //     fetch(`http://localhost:3000/data/${id}`,{
        //         method:"DELETE"
        //     }).then((res)=>{
        //         return getData();
        //     })
        // }

        // ( /// *** SECOND METHOD *** ///) 

        fetch(`http://localhost:3000/data/${id}`, {
            method: "DELETE"
        }).then(async (res) => {
            return getData();
        })
    }


    let updateUser = (id) => {
        let editUser = users.find((v, i) => v.id === id);
        setData(editUser);
        setId(id);
    }

    return (
        <>
            <Container>
                <Row className="justify-content-md-center">

                    <Col md="5">
                        <Form method="post" onSubmit={(e) => submitData(e)}>
                            <Form.Group className="mb-3" controlId="formGroupName">
                                <Form.Label>UserName</Form.Label>
                                <Form.Control type="text" name="userName" value={data.userName ? data.userName : ""} placeholder="Enter UserName" onChange={(e) => getValue(e)} />
                                <span style={{ color: "red" }}>{error.nameError ? error.nameError : ""}</span>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name="mail" value={data.mail ? data.mail : ""} placeholder="Enter email" onChange={(e) => getValue(e)} />
                                <span style={{ color: "red" }}>{error.emailError? error.emailError : ""}</span>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="pass" value={data.pass ? data.pass : ""} placeholder="Password" onChange={(e) => getValue(e)} />
                                <span style={{ color: "red" }}>{error.passError? error.passError : ""}</span>
                            </Form.Group>
                            <Button variant="primary" type="submit">{id == 0 ? "submit" : "update"}</Button>
                        </Form>
                    </Col>
                </Row>

                <br /><br /><br /><br /><br />


                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>UserName</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((v, i) => {
                            return (
                                <tr key={i}>
                                    <td>{++i}</td>
                                    <td>{v.userName}</td>
                                    <td>{v.mail}</td>
                                    <td>{v.pass}</td>
                                    <td>
                                        <Button type='button' onClick={() => deleteUser(v.id)} variant="danger">Delete</Button>
                                    </td>
                                    <td>
                                        <Button variant="primary" type='button' onClick={() => updateUser(v.id)}>Update</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>

        </>
    )
}

export default Home;