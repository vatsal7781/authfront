import '../App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// import pages 
import Main from "./Main";
import '../styles/styles.css'


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

function Home() {

  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // redirection
  const navigate = useNavigate()
  const handleClick = () => navigate('/logged');

  useEffect(() => {
    client.get("/api/user")
      .then(function (res) {
        setCurrentUser(true);
      })
      .catch(function (error) {
        setCurrentUser(false);
      });
  }, []);

  function update_form_btn() {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Register";
      setRegistrationToggle(false);
    } else {
      document.getElementById("form_btn").innerHTML = "Log in";
      setRegistrationToggle(true);
    }
  }

  function submitRegistration(e) {
    e.preventDefault();
    client.post(
      "/api/register",
      {
        email: email,
        username: username,
        password: password
      }
    ).then(function (res) {
      client.post(
        "/api/login",
        {
          email: email,
          password: password
        }
      ).then(function (res) {
        setCurrentUser(true);
      });
    });
  }

  function submitLogin(e) {
    e.preventDefault();
    client.post(
      "/api/login",
      {
        email: email,
        password: password
      }
    ).then(function (res) {
      setCurrentUser(true);
    });
  }

  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/api/logout",
      { withCredentials: true }
    ).then(function (res) {
      setCurrentUser(false);
    });
  }



  if (currentUser) {

    return (


      // <Button className='center' onClick={handleClick}>Click here to fill the Form</Button>

      <Main currentUser={currentUser} setCurrentUser={setCurrentUser} />


      //   <Routes>
      //     {/* <Route path='/' element={<Home name={name} />} /> */}
      //     <Route path='/' element={<App />} />
      //     {/* <Route path='/login' element={<Login />} />
      //     <Route path='/register' element={<Register />} /> */}
      //     <Route path='/logged' element={<Main />} />

      //   </Routes>
      // </BrowserRouter>
      // <div>


      /* <div className="center">
        <h2>You're logged in!</h2>
      </div>
    </div> */
    );
  } else {
    return (
      <div>
        <Navbar className='Nav'>
          <Container>
            <Navbar.Brand><img src='../media/logo.png' height='10px' width='10px' alt='Logo'></img></Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <Button id="form_btn" onClick={update_form_btn} variant="light">Register</Button>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {
          registrationToggle ? (
            <div className="center">
              <Form onSubmit={e => submitRegistration(e)}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>

              </Form>
            </div>
          ) : (

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-300 via-sky-400 to-sky-500 py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div>
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={e => submitLogin(e)}>
                  <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                      <label htmlFor="email-address" className="sr-only">Email address</label>
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                      />
                    </div>


                    <div>
                      <label htmlFor="password" className="sr-only">Password</label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                          Forgot your password?
                        </a>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Log in
                      </button>
                    </div>



                  </div>
                </form>
              </div></div>
          )
        }
      </div>
    );
  }
}

export default Home;