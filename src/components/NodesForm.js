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


  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  //dropdown menu
  const [osOptions, setOsOptions] = useState([]);
  const [circleOptions, setCircleOptions] = useState([]);
  const [operatorOptions, setOperatorOptions] = useState([]);

  const client = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true,
  });

  // Fetch dropdown options from backend on component mount
  useEffect(() => {
    fetchDropdownOptions();
  }, []);

  const fetchDropdownOptions = async () => {
    try {
      const response = await axios.get('/api/get_dropdown_options/');
      setOsOptions(response.data.os_options);
      setCircleOptions(response.data.circle_options);
      setOperatorOptions(response.data.operator_options);
    } catch (error) {
      console.error('Error fetching dropdown options:', error);
    }
  };


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
      const OS = formData.get('OS');
      const nodeType = formData.get('NodeType');
      // const fakeIp = formData.get('Fake_ip');
      const operator = formData.get('Operator');
      const hostName = formData.get('HostName');
      const circle = formData.get('Circle');
      const timeSync = formData.get('TimeSync');

      // Send data to create node
      const nodeResponse = await client.post('/api/nodesForm', {
        Ip: ip,
        Username: username,
        Password: password,
        OS: OS,
        Node_type: nodeType,
        // Fake_ip: fakeIp,
        Operator: operator,
        HostName: hostName,
        Circle: circle,
        Time_Sync: timeSync,
      });

      const requiredFields = ['Ip', 'Username', 'OS', 'RemotePort', 'LocalPort', 'Direction', 'SocketPath', 'Status', 'Comment'];

      const isValid = requiredFields.every(field => formData[field].trim() !== '');

      if (!isValid) {
        setErrorMessage('Please fill in all required fields.');
        setSuccessMessage('');
      } else {
        setSuccessMessage('Form submitted successfully!');
        setErrorMessage('');
      }

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
          <div>
            <nav className="h-16 bg-sky-600 flex items-center">
              <div className="w-10/12 m-auto flex justify-between">
                <img src="logo1.png" alt="Logo" className="h-8 w-20" />
                <form onSubmit={e => submitLogout(e)}>
                  <button type="submit" className="px-3 rounded-full text-white hover:bg-sky-900 shadow-inner shadow-white"><Link to="/">Log out</Link></button>
                </form>
              </div>
            </nav>

            <form onSubmit={handleSubmitNodes}>
              <main className="flex flex-col justify-center w-[28vw] m-auto">
                <div className="form-group flex justify-between mt-4">
                  <label htmlFor="Ip" className="w-60 border-2 flex justify-between items-center pl-4">IP</label>
                  <input type="text" id="Ip" name="Ip" placeholder="IP" className="border-2 p-3 rounded-r-full form-control" required />
                </div>
                <div className="flex justify-between mt-4 form-group">
                  <label htmlFor="Username" className="w-60 border-2 flex justify-between items-center pl-4">Username</label>
                  <input id="Username" type="text" name="Username" placeholder="Username" className="border-2 p-3 rounded-r-full form-control" required />
                </div>
                <div className="flex justify-between mt-4 form-group">
                  <label htmlFor="Password" className="w-60 border-2 flex justify-between items-center pl-4">Password:</label>
                  <input type="password" className="border-2 p-3 rounded-r-full form-control" id="Password" name="Password" required />
                </div>

                <div className="flex justify-between mt-4 form-group">
                  <label htmlFor="OS" className="w-60 border-2 flex justify-between items-center pl-4">OS</label>
                  <select list="OS" id="OS" name="OS" className="border-2 p-3 rounded-r-full form-control" placeholder="Open this select menu" required >
                    <option selected>Open this select menu</option>
                    <option value="Windows" >Windows</option>
                    <option value="Mac" >Mac</option>
                    <option value="Linux" >Linux</option>
                  </select>
                </div>

                <div className="flex justify-between mt-4 form-group">
                  <label htmlFor="NodeType" className="w-60 border-2 flex justify-between items-center pl-4">
                    Node type
                  </label>
                  <select id="NodeType" list="NodeType" name="NodeType" className="border-2 p-3 rounded-r-full" placeholder="Open this select menu" required >
                    <option selected>Open this select menu</option>
                    <option value="dummy1" >dummy1</option>
                    <option value="dummy2" >dummy2</option>
                    <option value="dummy3" >dummy3</option>
                  </select>
                </div>

                <div className="flex justify-between mt-4 form-group">
                  <label htmlFor="Operator" className="w-60 border-2 flex justify-between items-center pl-4">
                    Operator
                  </label>
                  <select id="Operator" list="Operator" name="Operator" className="border-2 p-3 rounded-r-full" placeholder="Open this select menu" >
                    <option selected>Open this select menu</option>
                    <option value="Precall">Precall</option>
                    <option value="International">International</option>
                    <option value="Enterprise/DWH">Enterprise/DWH</option>
                    <option value="Vodafone">Vodafone</option>
                    <option value="Idea/WAP">Idea/WAP</option>
                    <option value="Airtel">Airtel</option>
                  </select>
                </div>
                <div className="flex justify-between mt-4 form-group">
                  <label htmlFor="HostName" className="w-60 border-2 flex justify-between items-center pl-4">
                    Host Name
                  </label>
                  <select id="HostName" list="HostName" name="HostName" className="border-2 p-3 rounded-r-full" placeholder="Open this select menu" required >
                    <option selected>Open this select menu</option>
                    <option value="dummy1" >dummy1</option>
                    <option value="dummy2" >dummy2</option>
                    <option value="dummy3" >dummy3</option></select>
                </div>
                <div className="flex justify-between mt-4 form-group">
                  <label htmlFor="Circle" className="w-60 border-2 flex justify-between items-center pl-4">
                    Circle
                  </label>
                  <select id="Circle" list="Circle" name="Circle" className="border-2 p-3 rounded-r-full" placeholder="Open this select menu" required >
                    <option selected>Open this select menu</option>
                    <option value="Central">Central</option>
                    <option value="North">North</option>
                    <option value="East">East</option>
                    <option value="South">South</option>
                    <option value="West">West</option>
                  </select>
                </div>
                <div className="flex justify-between mt-4 form-group">
                  <label htmlFor="TimeSync" className="w-60 border-2 flex justify-between items-center pl-4">
                    Time Sync
                  </label>
                  <select id="TimeSync" list="TimeSync" name="TimeSync" className="border-2 p-3 rounded-r-full" placeholder="Open this select menu" >
                    <option selected>Open this select menu</option>

                    <option value="0" >0</option>
                    <option value="1" >1</option>
                  </select>
                </div>
              </main >
              <section>
                <p className="text-center mt-8 text-xl">Port details</p>
                <div className="flex flex-col justify-center w-[28vw] m-auto">

                  <div className="flex justify-between mt-4 form-group">
                    <label htmlFor="RemotePort" className="w-60 border-2 flex justify-between items-center pl-4">Remote Port</label>
                    <input type="number" id="RemotePort" name="RemotePort" value={remotePort} onChange={(e) => setRemotePort(e.target.value)} required className="border-2 p-3 rounded-r-full form-control" />
                  </div>

                  <div className="flex justify-between mt-4 form-group">
                    <label htmlFor="LocalPort" className="w-60 border-2 flex justify-between items-center pl-4">Local Port</label>
                    <input type="number" id="LocalPort" name="LocalPort" value={localPort} onChange={(e) => setLocalPort(e.target.value)} required className="border-2 p-3 rounded-r-full form-control" />
                  </div>

                  <div className="flex justify-between mt-4 form-group">
                    <label htmlFor="Direction" className="w-60 border-2 flex justify-between items-center pl-4">Direction</label>

                    <select id="Direction" name="Direction" value={direction} onChange={(e) => setDirection(e.target.value)} list="Direction" className="border-2 p-3 rounded-r-full form-control" placeholder="Open this select menu" required>
                      <option selected>Open this select menu</option>
                      <option value="Forward" >Forward</option>
                      <option value="Reverse" >Reverse</option>
                    </select>
                  </div>

                  <div className="flex justify-between mt-4 form-group">
                    <label htmlFor="SocketPath" className="w-60 border-2 flex justify-between items-center pl-4">Socket Path</label>
                    <input type="text" id="SocketPath" name="SocketPath" value={socketPath} onChange={(e) => setSocketPath(e.target.value)} required className=" form-control border-2 p-3 rounded-r-full" />
                  </div>

                  <div className="flex justify-between mt-4 form-group">
                    <label htmlFor="Status" className="w-60 border-2 flex justify-between items-center pl-4">Status</label>
                    <input type="text" id="Status" name="Status" value={portsStatus} onChange={(e) => setPortsStatus(e.target.value)} required className="border-2 p-3 rounded-r-full form-control" />
                  </div>

                  <div className="flex justify-between mt-4 form-group">
                    <label htmlFor="Comment" className="w-60 border-2 flex justify-between items-center pl-4">Comment</label>
                    <textarea className="form-control border-2 p-3 rounded-r-full" id="Comment" name="Comment" rows="3" value={portsComment} onChange={(e) => setPortsComment(e.target.value)} required />
                  </div>

                  <p className="text-center mt-4 text-red-500" id="failed">{errorMessage}</p>
                  <p className="text-center mt-4 text-green-500" id="Success">{successMessage}</p>

                  <div className="flex justify-center">
                    <div className="flex justify-center bg-sky-600 w-28 rounded-full p-2 shadow-inner shadow-white border-2 border-sky-200 text-white cursor-pointer hover:bg-sky-800">
                      <button type="submit" >Submit</button>
                    </div>
                  </div>

                </div>
              </section>
            </form>
            {/* <div className="h-16"></div> */}

          </div >
        )
      }
    </>
  )
}



export default NodesForm;