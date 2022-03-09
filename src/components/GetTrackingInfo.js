import {Button,Modal,Table,Badge } from 'react-bootstrap';
import { useState, useEffect } from "react";
import isLoggedIn from "../functions/isLoggedIn";
import axios from "axios";
import cogoToast from 'cogo-toast';

const GetTrackingInfo = ({id,totalClicks,shortUrl}) =>{

  const [Trackingdisabled , setTrackingdisabled] = useState(true);
    const [show, setShow] = useState(false);
    const [tableData , settableData] = useState([]);

    const handleClose = () => setShow(false);
   
   
  useEffect(()=>{
    if(isLoggedIn()){
      setTrackingdisabled(false);
    }
  },[])



  const GetTrackingInfofun =(id) =>{
    
    setShow(true);
    const body = {
      id: id
    }
    axios({
      method: 'post',
      url: "urls/link_analytics",
      data: body,
      headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`
      }
    }).then((linkdata) => {
      
      settableData(linkdata.data.data);

    }).catch(err => {
      
      cogoToast.error("Error in fetching link analytics");
    })
    
  }

    return (
      <>
      <Button 
      variant="primary" 
      onClick = {()=>GetTrackingInfofun(id)}
       disabled = {Trackingdisabled}
      className="float-end">
        Clicks <Badge bg="secondary">{totalClicks}</Badge>
        <span className="visually-hidden">Clicks</span>
      </Button>
<Modal
show={show}
onHide={handleClose}
dialogClassName="tracking_info_modal"
keyboard={false}
width="fit-content"
>
<Modal.Header closeButton>
  <Modal.Title>
      Url Analytics
    </Modal.Title>
</Modal.Header>
<Modal.Body>
<div style={{wordBreak:"break-all"}}>
    Tracking info for
    <p>
     <a href ={shortUrl}>{shortUrl}</a>
     </p>
    </div>
<Table responsive striped bordered hover >
  <thead>
    <tr>
      <th>User IP</th>
      <th>Browser</th>
      <th>OS</th>
      <th>Last Checked</th>
      <th>Country</th>
      <th>City</th>
      <th>Timezone</th>
    </tr>
  </thead>
  <tbody>
    {tableData.map(user =>{
      return(
      <tr>
      <td>{user.user_ip}</td>
      <td>{user.user_browser}</td>
      <td>{user.user_os}</td>
      <td>{`${new Date(user.createdAt)}`}</td>
      <td>{user.country}</td>
      <td>{user.city}</td>
      <td>{user.timezone}</td>
    </tr>)
    })}
  </tbody>
</Table>

</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={handleClose}>
    Close
  </Button>
  
</Modal.Footer>
</Modal>
</>
    )
}

export default GetTrackingInfo;