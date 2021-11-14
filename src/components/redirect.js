import React,{useEffect,useState} from "react";
import axios from "axios";
import {Container} from "react-bootstrap";
import loader from "../assets/loader.gif";

const Redirect = () => {
    //taking the pathname which need  to be forwaded 
    const pathname = window.location.pathname.slice(1);
    const [loading,setloading] = useState(true);

    useEffect(() => {
        console.log(pathname,1223);
        const body = {
            code:pathname
        }
        axios({
            method: 'get',
            url: pathname,
            data: body,
          }).then(response =>{
            console.log(response,888)
            // const url = response.data.redirectSite;
            // //taking user to redirected url
            // window.location.href = url;
          }).catch(err =>{
              console.log(err);
          })

      }, []);
      
    return (
        <>
              <Container>
              <div style={{display: 'flex', justifyContent: 'center',marginTop:"200px"}}>
                 <img src = {loader} style = {{justifyContent:"center"}}/>
              </div>
              </Container>
        </>
    );
  };
  
  export default Redirect;
  