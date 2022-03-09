import {Button,Modal,InputGroup,FormControl } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faICursor } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import cogoToast from "cogo-toast";
import { useSelector, useDispatch } from "react-redux";
import { urls_actions } from "../store/urls";




const RenameUrl = ({id}) =>{
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [newName,setNewName] = useState("");

   

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const CusTomizeUrl = (id,code) => {

      if(code.length === 0){
        return cogoToast.error("Custom name cannot be empty !");
      }
      
      const body = {
        id: id,
        code:code
      }
      
      axios({
        method: 'post',
        url: "urls/anonymous/customizeurl",
        data: body,
      }).then(response => {
        cogoToast.success(response.data.message);
        
        //changing url name
        dispatch(urls_actions.change_url_name({ id: id, shortenedLink: response.data.data.shortenedLink }));
        //closing the modal
        setShow(false);
    
      }).catch(err => {

        cogoToast.error(err.response.data.message);
        // console.log(err,999);
      })
    }
  
    return (
      <>
        <Button variant="outline-primary" onClick={handleShow}>
          Rename <FontAwesomeIcon icon={faICursor} />
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Rename your url</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <InputGroup className="mb-3">
                    <FormControl
                      placeholder="Type your new name here"
                      aria-label="Type your new name here"
                      aria-describedby="basic-addon2"
                      onChange={(event) => setNewName(event.target.value)}
                    />

                  </InputGroup>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="primary" onClick = {()=>CusTomizeUrl(id,newName)}>Rename Url</Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default RenameUrl;