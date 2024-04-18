import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';



const PortsForm = ({ currentUser, setCurrentUser }) => {


  const [formSubmitted, setFormSubmitted] = useState(false);
  const [nodeIds, setNodeIds] = useState([]);
  const [selectedNodeId, setSelectedNodeId] = useState('');
  const [remotePort, setRemotePort] = useState('');
  const [localPort, setLocalPort] = useState('');
  const [direction, setDirection] = useState('');
  const [socketPath, setSocketPath] = useState('');
  const [portsStatus, setPortsStatus] = useState('');
  const [portsComment, setPortsComment] = useState('');

  const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000',  // Update the URL accordingly
    withCredentials: true,
  });

  useEffect(() => {
    apiClient.get('/api/getNodeIds')
      .then(response => {
        setNodeIds(response.data.node_ids);
      })
      .catch(error => {
        console.error('Error fetching NodeIds:', error);
      });
  }, []);

  const fetchNode = async (nodeId) => {
    try {
      const response = await apiClient.get(`/api/getNodeIds`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Node:', error);
      throw error;
    }
  };

  const handleSubmitPorts = async (event) => {
    event.preventDefault();


    const formData = new FormData(event.target);
    console.log('FormData:', formData);
    // const nodeInstance = await fetchNode(selectedNodeId);

    const nodeInstance = formData.get('NodeId');
    // if (isNaN(nodeInstance) || nodeInstance === '') {
    //   console.error('Invalid NodeId format');
    //   return;
    // }

    const parsedNodeId = parseInt(nodeInstance, 10);

    // Extract data from the form
    const remotePort = formData.get('RemotePort');
    const localPort = formData.get('LocalPort');
    const direction = formData.get('Direction');
    const socketPath = formData.get('SocketPath');
    const portsStatus = formData.get('Status');
    const portsComment = formData.get('Comment');

    // Send data to the server for Ports
    apiClient.post('/api/portsForm', {
      NodeId: parsedNodeId,  // Replace with the actual NodeId from your Nodes table
      RemotePort: remotePort,
      LocalPort: localPort,
      Direction: direction,
      SocketPath: socketPath,
      Status: portsStatus,
      Comment: portsComment,
    })
      .then(response => {
        console.log(response.data); // Handle success, if needed
      })
      .catch(error => {
        console.error('Error adding ports:', error);

      });

    setFormSubmitted(true)
  };

  function submitLogout(e) {
    e.preventDefault();
    apiClient.post(
      "/api/logout",
      { withCredentials: true }
    ).then(function (res) {
      setCurrentUser(false);
    });


  }


  return (
    <>
      {
        formSubmitted ?
          (
            <div>Form filled successfully!</div>

          ) : (

            <div>
              <div className="centre">
                <form onSubmit={handleSubmitPorts}>
                  {/* <div className="form-group">
                    <label htmlFor="NodeId">Node ID:</label>
                    <select
                      className="form-control"
                      id="NodeId"
                      name="NodeId"
                      onChange={(e) => setSelectedNodeId(e.target.value)}
                      value={selectedNodeId}
                      required
                    >
                      <option value="" disabled>Select Node ID</option>
                      {nodeIds.map(id => (
                        <option key={id} value={id}>{id}</option>
                      ))}
                    </select>
                  </div> */}
                  <div className="form-group">
                    <label htmlFor="RemotePort">Remote Port:</label>
                    <input type="number" className="form-control" id="RemotePort" name="RemotePort" value={remotePort} onChange={(e) => setRemotePort(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="LocalPort">Local Port:</label>
                    <input type="number" className="form-control" id="LocalPort" name="LocalPort" value={localPort} onChange={(e) => setLocalPort(e.target.value)} required />
                  </div>
                  <div class="form-group">
                    <label htmlFor="Direction">Direction:</label>
                    <select class="form-control" id="Direction" name="Direction" value={direction} onChange={(e) => setDirection(e.target.value)} required >
                      <option selected>Open this select menu</option>
                      <option value="Forward">Forward</option>
                      <option value="Reverse">Reverse</option>

                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="SocketPath">Socket Path:</label>
                    <input type="text" className="form-control" id="SocketPath" name="SocketPath" value={socketPath} onChange={(e) => setSocketPath(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Status">Status:</label>
                    <input type="text" className="form-control" id="Status" name="Status" value={portsStatus} onChange={(e) => setPortsStatus(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Comment">Comment:</label>
                    <textarea className="form-control" id="Comment" name="Comment" rows="3" value={portsComment} onChange={(e) => setPortsComment(e.target.value)} required></textarea>
                  </div>
                  <button type='submit' className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          )
      }

    </>
  )
}

export default PortsForm;