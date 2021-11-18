import {Button,Modal,InputGroup,FormControl } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import cogoToast from "cogo-toast";
import { useSelector, useDispatch } from "react-redux";
import { urls_actions } from "../store/urls";
import Switch from "react-switch";



const PassWordedLinks = ({id}) =>{
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [NewPass,setNewPass] = useState("");

    console.log("getting the id from rename ",id)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const CusTomizeUrl = (id,code) => {

      if(code.length === 0){
        return cogoToast.error("Custom name cannot be empty !");
      }
      
      const body = {
        url_id: id,
        password:code
      }
      if(show){
        console.log("disable password");
      }else{

      axios({
        method: 'post',
        url: "urls/urlAddPassword",
        data: body,
        headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`
          }
      }).then(response => {
        cogoToast.success(response.data.message);
        
        //changing url name
        dispatch(urls_actions.passworded({ id: id}));
        //closing the modal
        setShow(true);
    
      }).catch(err => {

        cogoToast.error(err.response.data.message);
        console.log(err,999);
      })
    }
    }
  
    return (
      <>
        <label>
        <span className ="px-3" style={{fontWeight:"bold"}}>Protect your link  <FontAwesomeIcon icon={faKey} style={{paddingLeft:"3px"}} /></span>
        <Switch
          onChange={handleShow}
          checked={show}
          className="react-switch"
        />
      </label>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Secure your link</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <InputGroup className="mb-3">
                    <FormControl
                      placeholder="Type your password here"
                      aria-label="Type your password here"
                      type="Password"
                      aria-describedby="basic-addon2"
                      onChange={(event) => setNewPass(event.target.value)}
                    />

                  </InputGroup>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="primary" onClick = {()=>CusTomizeUrl(id,NewPass)}>Add Password</Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default PassWordedLinks;