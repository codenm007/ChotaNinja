import {Button,Modal,Alert } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import cogoToast from "cogo-toast";
import { useSelector, useDispatch } from "react-redux";
import { urls_actions } from "../store/urls";




const DeleteUrl = ({id}) =>{
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const DeleteUrlAction = (id) => {
      
      const body = {
        url_id: id,
      }
     
      axios({
        method: 'delete',
        url: "urls/deleteUrl",
        data: body,
        headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`
          }
      }).then(response => {
        cogoToast.success(response.data.message);
        
        //changing url name
        dispatch(urls_actions.delete_url({ id: id}));
        //closing the modal
        setShow(false);
    
      }).catch(err => {

        cogoToast.error(err.response.data.message);
        // console.log(err,999);
      })
    }
  
    return (
      <>
        <Button variant="outline-danger" onClick={handleShow}>
          Delete Link <FontAwesomeIcon icon={faTrash} />
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete short link </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Alert variant="warning">
  <div style={{fontSize:"0.9rem",fontWeight:"bold"}}>
   <p>Once you click the Yes button , the link will be deleted permanently. 
   This might make your shortlink unavailable to all your users.</p> <p>
   Are you sure you want to do that ?</p>
 </div>
</Alert>
          </Modal.Body>
          <Modal.Footer>
         
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick = {()=>DeleteUrlAction(id)}>Yes</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default DeleteUrl;