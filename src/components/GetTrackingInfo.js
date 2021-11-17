import {Button,Modal,InputGroup,FormControl } from 'react-bootstrap';
import { useState, useEffect } from "react";
const GetTrackingInfo = ({state}) =>{

    const [show, setShow] = useState(state);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
<Modal
show={show}
onHide={handleClose}
backdrop="static"
keyboard={false}
>
<Modal.Header closeButton>
  <Modal.Title>Modal title</Modal.Title>
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
    )
}

export default GetTrackingInfo;