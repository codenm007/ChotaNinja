import React,{useEffect,useState} from "react";
import axios from "axios";
import {Container} from "react-bootstrap";
import loader from "../assets/loader.gif";
import {Button,InputGroup,FormControl } from 'react-bootstrap';
import cogoToast from "cogo-toast";

const SecureRedirect = () => {
    //taking the pathname which need  to be forwaded 
    
    function stripTrailingSlash(str) {
      if(str.substr(-1) === '/') {
          return str.substr(0, str.length - 1);
      }
      return str;
  }
  const pathname = stripTrailingSlash(window.location.pathname.slice(8));
    const [loading,setloading] = useState(false);
    const [password,setPass] = useState("");

    const VerifyUrl = (code , password) => {

      if(password.length === 0){
        return cogoToast.error("Please enter your password !");
      }
      
      const body = {
        code:code,
        password:password
      }
      
      axios({
        method: 'post',
        url: "urls/anonymous/verifyPass",
        data: body,
      }).then(response => {
        cogoToast.success(response.data.message);
        
        window.location.href = response.data.data.redirectUrl;

        setloading(true);
    
      }).catch(err => {

        cogoToast.error(err.response.data.message);
      })
    }


      
    return (
        <>
        {loading?(
          <Container>
          <img src = {loader} style = {{display: 'flex', justifyContent: 'center',marginTop:"30vh",marginLeft:"40vw"}}/>
          </Container>
        ):(
          <Container>
                
                <div style={{display: 'flex', justifyContent: 'center',marginTop:"200px" }}>
                  <div className ="card">
                  <InputGroup className="mb-3">
                      <FormControl
                        placeholder="Enter url password "
                        aria-label="Enter url password "
                        aria-describedby="basic-addon2"
                        type="Password"
                        onChange={(event) => setPass(event.target.value)}
                      />
  
                    </InputGroup>
                    <Button variant="success" onClick = {()=> VerifyUrl(pathname,password)}>Let me in</Button>
                    </div>
                   
                </div>
                </Container>
        )}
              
        </>
    );
  };
  
  export default SecureRedirect;
  