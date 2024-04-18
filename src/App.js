import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// import pages 
// import { Nav } from "components/Nav.js";
import Main from "./pages/Main";
import Home from "./pages/Home"
import PortsForm from './components/PortsForm';



axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

function App() {

  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    client.get("/api/user")
      .then(function (res) {
        setCurrentUser(true);
      })
      .catch(function (error) {
        setCurrentUser(false);
      });
  }, []);


  return (
    // <div>
    //   <Navbar bg="dark" variant="dark">
    //     <Container>
    //       <Navbar.Brand>Authentication App</Navbar.Brand>
    //       <Navbar.Toggle />
    //       <Navbar.Collapse className="justify-content-end">
    //         <Navbar.Text>
    //           <Button id="form_btn" onClick={update_form_btn} variant="light">Register</Button>
    //         </Navbar.Text>
    //       </Navbar.Collapse>
    //     </Container>
    //   </Navbar>
    //   {
    //     registrationToggle ? (
    //       <div className="center">
    //         <Form onSubmit={e => submitRegistration(e)}>
    //           <Form.Group className="mb-3" controlId="formBasicEmail">
    //             <Form.Label>Email address</Form.Label>
    //             <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
    //             <Form.Text className="text-muted">
    //               We'll never share your email with anyone else.
    //             </Form.Text>
    //           </Form.Group>
    //           <Form.Group className="mb-3" controlId="formBasicUsername">
    //             <Form.Label>Username</Form.Label>
    //             <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
    //           </Form.Group>
    //           <Form.Group className="mb-3" controlId="formBasicPassword">
    //             <Form.Label>Password</Form.Label>
    //             <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
    //           </Form.Group>
    //           <Button variant="primary" type="submit">
    //             Submit
    //           </Button>
    //         </Form>
    //       </div>
    //     ) : (
    //       <div className="center">
    //         <Form onSubmit={e => submitLogin(e)}>
    //           <Form.Group className="mb-3" controlId="formBasicEmail">
    //             <Form.Label>Email address</Form.Label>
    //             <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
    //             <Form.Text className="text-muted">
    //               We'll never share your email with anyone else.
    //             </Form.Text>
    //           </Form.Group>
    //           <Form.Group className="mb-3" controlId="formBasicPassword">
    //             <Form.Label>Password</Form.Label>
    //             <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
    //           </Form.Group>
    //           <Button variant="primary" type="submit">
    //             Submit
    //           </Button>
    //         </Form>
    //       </div>
    //     )
    //   }
    // </div>
    <BrowserRouter>
      <div>

        <Routes>

          <Route exact path='/' element={<Home />} />
          <Route exact path='/logged' element={<Main />} />
          <Route exact path='/ports' element={<PortsForm />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;