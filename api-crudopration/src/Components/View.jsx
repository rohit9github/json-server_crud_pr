import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';

function View() {

    let [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/data", {
            method: "GET"
        }).then(async (res) => {
            let arr = await res.json();
            console.log(arr);
            setUsers(arr);
        })
    }, [])

    return (
        <>
            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>UserName</th>
                            <th>Email</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((v, i) => {
                            return (
                                <tr>
                                    <td>{++i}</td>
                                    <td>{v.userName}</td>
                                    <td>{v.mail}</td>
                                    <td>{v.pass}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default View;