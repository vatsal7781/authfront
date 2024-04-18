import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import PortsForm from './PortsForm';
import '../styles/styles.css'

const NodesForm = ({ currentUser, setCurrentUser }) => {

  const [formSubmitted, setFormSubmitted] = useState();
  const [remotePort, setRemotePort] = useState('');
  const [localPort, setLocalPort] = useState('');
  const [direction, setDirection] = useState('');
  const [socketPath, setSocketPath] = useState('');
  const [portsStatus, setPortsStatus] = useState('');
  const [portsComment, setPortsComment] = useState('');

  const client = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true,
  });

  // const handleSubmitNodes = (event) => {
  //   event.preventDefault();

  //   const formData = new FormData(event.target);
  //   console.log('FormData:', formData);

  //   //NODES TABLE
  //   // Extract data from the form
  //   const ip = formData.get('Ip');
  //   const username = formData.get('Username');
  //   const password = formData.get('Password');
  //   const os = formData.get('OS');
  //   const nodeType = formData.get('Node_type');
  //   const fakeIp = formData.get('Fake_ip');
  //   const operator = formData.get('Operator');
  //   const hostName = formData.get('HostName');
  //   const circle = formData.get('Circle');
  //   const timeSync = formData.get('Time_Sync');

  //   //PORTS TABLE
  //   // Extract data from the form
  //   const remotePort = formData.get('RemotePort');
  //   const localPort = formData.get('LocalPort');
  //   const direction = formData.get('Direction');
  //   const socketPath = formData.get('SocketPath');
  //   const portsStatus = formData.get('Status');
  //   const portsComment = formData.get('Comment');

  //   // Send data to the server
  //   client.post('/api/nodesForm', {
  //     Ip: ip,
  //     Username: username,
  //     Password: password,
  //     OS: os,
  //     Node_type: nodeType,
  //     Fake_ip: fakeIp,
  //     Operator: operator,
  //     HostName: hostName,
  //     Circle: circle,
  //     Time_Sync: timeSync,
  //   })
  //     .then(nodeResponse => {
  //       console.log("Nodes added: ", nodeResponse.data); // Handle success, if needed
  //       const nodeId = nodeResponse.data.node.Id;

  //       console.log(nodeId) // undefined

  //       return client.get(`/api/nodes/${nodeId}`);

  //       // return client.post('/api/portsForm', {
  //       //   NodeId: nodeId,//current node id,  
  //       //   RemotePort: remotePort,
  //       //   LocalPort: localPort,
  //       //   Direction: direction,
  //       //   SocketPath: socketPath,
  //       //   Status: portsStatus,
  //       //   Comment: portsComment,
  //       // })
  //     })
  //     .then(nodeInstanceResponse => {
  //       const nodeInstance = nodeInstanceResponse.data;
  //       console.log(nodeInstanceResponse);
  //       console.log(nodeInstanceResponse.data);

  //       return client.post('/api/portsForm', {
  //         NodeId: nodeInstance, // Pass the Nodes instance
  //         RemotePort: remotePort,
  //         LocalPort: localPort,
  //         Direction: direction,
  //         SocketPath: socketPath,
  //         Status: portsStatus,
  //         Comment: portsComment,
  //       });
  //     })
  //     .then(portResponse => {
  //       console.log('Ports added:', portResponse.data); // Handle success, if needed
  //     })
  //     .catch(error => {
  //       console.error('Error adding nodes:', error);
  //     });


  //   // client.post('/api/portsForm', {
  //   //   NodeId: nodeId,//current node id,  
  //   //   RemotePort: remotePort,
  //   //   LocalPort: localPort,
  //   //   Direction: direction,
  //   //   SocketPath: socketPath,
  //   //   Status: portsStatus,
  //   //   Comment: portsComment,
  //   // })
  //   // .then(portResponse => {
  //   //   console.log('Ports added:', portResponse.data); // Handle success, if needed
  //   // })
  //   // .catch(error => {
  //   //   console.error('Error adding nodes or ports:', error);

  //   // });

  //   setFormSubmitted(true)
  // };

  const handleSubmitNodes = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.target);

      // Extract data from the form
      const ip = formData.get('Ip');
      const username = formData.get('Username');
      const password = formData.get('Password');
      const os = formData.get('OS');
      const nodeType = formData.get('Node_type');
      // const fakeIp = formData.get('Fake_ip');
      const operator = formData.get('Operator');
      const hostName = formData.get('HostName');
      const circle = formData.get('Circle');
      const timeSync = formData.get('Time_Sync');

      // Send data to create node
      const nodeResponse = await client.post('/api/nodesForm', {
        Ip: ip,
        Username: username,
        Password: password,
        OS: os,
        Node_type: nodeType,
        // Fake_ip: fakeIp,
        Operator: operator,
        HostName: hostName,
        Circle: circle,
        Time_Sync: timeSync,
      });

      // Access the node ID from the response
      const nodeId = nodeResponse.data.node.Id;
      console.log(nodeId);

      // Fetch node instance
      const nodeInstanceResponse = await client.get(`/api/nodes/${nodeId}/`);
      // const nodeInstance = nodeInstanceResponse.data.Id;
      // console.log(nodeInstance);


      // Extract data for ports
      const remotePort = formData.get('RemotePort');
      const localPort = formData.get('LocalPort');
      const direction = formData.get('Direction');
      const socketPath = formData.get('SocketPath');
      const portsStatus = formData.get('Status');
      const portsComment = formData.get('Comment');

      // Send data to create ports
      const portResponse = await client.post('/api/portsForm', {
        NodeId: nodeId, // Pass the Node ID
        RemotePort: remotePort,
        LocalPort: localPort,
        Direction: direction,
        SocketPath: socketPath,
        Status: portsStatus,
        Comment: portsComment,
      });

      console.log('Ports added:', portResponse.data);
      setFormSubmitted(true);
    } catch (error) {
      console.error('Error adding nodes or ports:', error);
    }
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


  return (
    <>
      {
        formSubmitted ? (
          <>
            {/* <Navbar bg="dark" variant="dark">
              <Container>
                <Navbar.Brand>Paytm</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                    <form onSubmit={e => submitLogout(e)}>
                      <Button type="submit" variant="light"><Link to="/">Log out</Link></Button>
                    </form>
                  </Navbar.Text>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <PortsForm currentUser={currentUser} setCurrentUser={setCurrentUser} /> */}
            <div>Form filled successfully!</div>
          </>
        ) : (
          <>
            <Navbar className='Nav'>
              <Container>
                <Navbar.Brand><img src='../media/logo.png' height='10px' width='10px' alt='Logo'></img></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                    <form onSubmit={e => submitLogout(e)}>
                      <Button type="submit" variant="light"><Link to="/">Log out</Link></Button>
                    </form>
                  </Navbar.Text>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <div className="centre">
              <form className='centre row-g-3' onSubmit={handleSubmitNodes}>
                <div className="form-group col-md-6">
                  <label htmlFor="Ip">IP:</label>
                  <input type="text" className="form-control" id="Ip" name="Ip" required />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="Username">Username:</label>
                  <input type="text" className="form-control" id="Username" name="Username" required />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="Password">Password:</label>
                  <input type="password" className="form-control" id="Password" name="Password" required />
                </div>

                {/* OS TEXT INPUT
                  */}

                <div class="form-group col-md-6">
                  <label htmlFor="OS">OS:</label>
                  <select class="form-control" id="OS" name="OS" required >
                    <option selected>Open this select menu</option>
                    <option value="Test1">Test1</option>
                    <option value="Test2">Test2</option>

                  </select>
                </div>


                {/* <div className="form-group">
                  <label htmlFor="SysoId">SysoId:</label>
                  <input type="text" className="form-control" id="SysoId" name="SysoId" required />
                </div> */}

                <div className="form-group col-md-6">
                  <label htmlFor="Node_type">Node Type:</label>
                  <input type="text" className="form-control" id="Node_type" name="Node_type" required />
                </div>

                {/* FAKE IP  */}
                {/* <div className="form-group">
                  <label htmlFor="Fake_ip">Fake IP:</label>
                  <input type="text" className="form-control" id="Fake_ip" name="Fake_ip" required />
                </div> */}

                <div className="form-group col-md-6">
                  <label htmlFor="Operator">Operator:</label>

                  <select class="form-control" id="Operator" name="Operator" required >

                    <option selected>Open this select menu</option>
                    <option value="Precall">Precall</option>
                    <option value="International">International</option>
                    <option value="Enterprise/DWH">Enterprise/DWH</option>
                    <option value="Vodafone">Vodafone</option>
                    <option value="Idea/WAP">Idea/WAP</option>
                    <option value="Airtel">Airtel</option>
                  </select>
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="HostName">Host Name:</label>
                  <input type="text" className="form-control" id="HostName" name="HostName" required />
                </div>

                <div class="form-group col-md-6">
                  <label htmlFor="Circle">Circle:</label>
                  <select class="form-control" id="Circle" name="Circle" required >
                    <option selected>Open this select menu</option>
                    <option value="Test1">Test1</option>
                    <option value="Test2">Test2</option>

                  </select>
                </div>

                {/* <div className="form-group">
                  <label htmlFor="Circle">Circle:</label>
                  <input type="text" className="form-control" id="Circle" name="Circle" required />
                </div> */}

                <div class="form-group col-md-6">
                  <label htmlFor="Time_Sync">Time Sync:</label>
                  <select class="form-control" id="Time_Sync" name="Time_Sync" required >
                    <option selected>Open this select menu</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                  </select>
                </div>

                {/* <div className="form-group">
                  <label htmlFor="Time_Sync">Time Sync:</label>
                  <input type="number" className="form-control" id="Time_Sync" name="Time_Sync" required />
                </div> */}
                <br></br>
                <div>
                  PORTS DETAILS
                </div>
                <br></br>


                <div className="form-group col-md-6">
                  <label htmlFor="RemotePort">Remote Port:</label>
                  <input type="number" className="form-control" id="RemotePort" name="RemotePort" value={remotePort} onChange={(e) => setRemotePort(e.target.value)} required />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="LocalPort">Local Port:</label>
                  <input type="number" className="form-control" id="LocalPort" name="LocalPort" value={localPort} onChange={(e) => setLocalPort(e.target.value)} required />
                </div>
                <div class="form-group col-md-6">
                  <label htmlFor="Direction">Direction:</label>
                  <select class="form-control" id="Direction" name="Direction" value={direction} onChange={(e) => setDirection(e.target.value)} required >
                    <option selected>Open this select menu</option>
                    <option value="Forward">Forward</option>
                    <option value="Reverse">Reverse</option>

                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="SocketPath">Socket Path:</label>
                  <input type="text" className="form-control" id="SocketPath" name="SocketPath" value={socketPath} onChange={(e) => setSocketPath(e.target.value)} required />
                </div>
                <div className="form-group col-md-6" >
                  <label htmlFor="Status">Status:</label>
                  <input type="text" className="form-control" id="Status" name="Status" value={portsStatus} onChange={(e) => setPortsStatus(e.target.value)} required />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="Comment">Comment:</label>
                  <textarea className="form-control" id="Comment" name="Comment" rows="3" value={portsComment} onChange={(e) => setPortsComment(e.target.value)} required></textarea>
                </div>




                <button type='submit' className="btn btn-primary">Submit</button>


                {/* DISCARDED NODE FORM INPUTS

                <div className="form-group">
                  <label htmlFor="OS">OS:</label>
                  <input type="text" className="form-control" id="OS" name="OS" required />
                </div>                
                <div className="form-group">
                  <label htmlFor="Live">Live:</label>
                  <input type="number" className="form-control" id="Live" name="Live" required />
                </div>
                <div className="form-group">
                  <label htmlFor="ParentId">Parent ID:</label>
                  <input type="number" className="form-control" id="ParentId" name="ParentId" required />
                </div>
                <div className="form-group">
                  <label htmlFor="is_Intermediate">Is Intermediate:</label>
                  <input type="number" className="form-control" id="is_Intermediate" name="is_Intermediate" required />
                </div>
                <div className="form-group">
                  <label htmlFor="is_Banned">Is Banned:</label>
                  <input type="number" className="form-control" id="is_Banned" name="is_Banned" required />
                </div> 
                <div className="form-group">
                  <label htmlFor="ServerName">Server Name:</label>
                  <input type="text" className="form-control" id="ServerName" name="ServerName" required />
                </div>
                <div className="form-group">
                  <label htmlFor="Status">Status:</label>
                  <input type="text" className="form-control" id="Status" name="Status" required />
                </div>
                <div className="form-group">
                  <label htmlFor="Comment">Comment:</label>
                  <textarea className="form-control" id="Comment" name="Comment" rows="3" required></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="Cygwin_Version">Cygwin Version:</label>
                  <input type="text" className="form-control" id="Cygwin_Version" name="Cygwin_Version" required />
                </div>
                <div className="form-group">
                  <label htmlFor="Transfer_Status">Transfer Status:</label>
                  <textarea className="form-control" id="Transfer_Status" name="Transfer_Status" rows="3" required></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="Installation_Status">Installation Status:</label>
                  <textarea className="form-control" id="Installation_Status" name="Installation_Status" rows="3" required></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="Key_Enabled">Key Enabled:</label>
                  <input type="number" className="form-control" id="Key_Enabled" name="Key_Enabled" required />
                </div>
                
                */}

              </form>
            </div>
          </>
        )
      }
    </>
  )
}



export default NodesForm;