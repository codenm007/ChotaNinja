import {Button,Modal,InputGroup,FormControl,Badge } from 'react-bootstrap';
import { useState, useEffect } from "react";
import isLoggedIn from "../functions/isLoggedIn";

const GetTrackingInfo = ({id,totalClicks}) =>{

  const [Trackingdisabled , setTrackingdisabled] = useState(true);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
   
  useEffect(()=>{
    if(isLoggedIn()){
      setTrackingdisabled(false);
    }
  },[])



  const GetTrackingInfofun =(id) =>{
    console.log(id,882);
    setShow(true);
    
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
backdrop="static"
keyboard={false}
>
<Modal.Header closeButton>
  <Modal.Title>Modal title{id}</Modal.Title>
</Modal.Header>
<Modal.Body>
  I will not close if you click outside me. Don't even try to press
  escape key.
</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={handleClose}>
    Close
  </Button>
  <Button variant="primary">Understood</Button>
</Modal.Footer>
</Modal>
</>
    )
}

export default GetTrackingInfo;