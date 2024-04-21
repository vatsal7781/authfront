import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import App from '../App.js'
import NodesForm from '../components/NodesForm.js';
import '../'


const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});


const Main = ({ currentUser, setCurrentUser }) => {


  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get('Username');
    const fname = formData.get('Fname');

    client.post('/api/add_user', { Username: username, Fname: fname })
      .then(response => {
        console.log(response.data); // Handle success, if needed
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });
  };

  const handleSubmitNodes = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    // Extract data from the form
    const ip = formData.get('Ip');
    const username = formData.get('Username');
    const password = formData.get('Password');
    const os = formData.get('OS');
    const sysoId = formData.get('SysoId');
    const nodeType = formData.get('Node_type');
    const fakeIp = formData.get('Fake_ip');
    const live = formData.get('Live');
    const parentId = formData.get('ParentId');
    const isIntermediate = formData.get('is_Intermediate');
    const isBanned = formData.get('is_Banned');
    const operator = formData.get('Operator');
    const serverName = formData.get('ServerName');
    const hostName = formData.get('HostName');
    const circle = formData.get('Circle');
    const status = formData.get('Status');
    const comment = formData.get('Comment');
    const cygwinVersion = formData.get('Cygwin_Version');
    const transferStatus = formData.get('Transfer_Status');
    const installationStatus = formData.get('Installation_Status');
    const timeSync = formData.get('Time_Sync');
    const keyEnabled = formData.get('Key_Enabled');

    // Send data to the server
    client.post('/api/nodesForm', {
      Ip: ip,
      Username: username,
      Password: password,
      OS: os,
      SysoId: sysoId,
      Node_type: nodeType,
      Fake_ip: fakeIp,
      Live: live,
      ParentId: parentId,
      is_Intermediate: isIntermediate,
      is_Banned: isBanned,
      Operator: operator,
      ServerName: serverName,
      HostName: hostName,
      Circle: circle,
      Status: status,
      Comment: comment,
      Cygwin_Version: cygwinVersion,
      Transfer_Status: transferStatus,
      Installation_Status: installationStatus,
      Time_Sync: timeSync,
      Key_Enabled: keyEnabled,
    })
      .then(response => {
        console.log(response.data); // Handle success, if needed
      })
      .catch(error => {
        console.error('Error adding nodes:', error);
      });
  };


  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/api/logout",
      { withCredentials: true }
    ).then(function (res) {
      setCurrentUser(false);
    });
  }

  if (!currentUser) {

    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Paytm</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <form onSubmit={e => submitLogout(e)}>
                  <Button type="submit" variant="light"><Link to="/">Log In</Link></Button>
                </form>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="center">
          <h2>You're not logged in! Login Again</h2>
        </div>
      </div>)

  } else {
    return (

      <NodesForm currentUser={currentUser} setCurrentUser={setCurrentUser} />
    )
  };
};

export default Main;