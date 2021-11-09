import axios from "axios";
import { useState, useEffect } from "react";
import { InputGroup , FormControl,Button, Container,Nav,Navbar ,Row,Col,Card,Badge} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Particles from 'react-particles-js';
import {particle_js_config} from '../config/particle';
import cogoToast from "cogo-toast";
import { useSelector, useDispatch } from "react-redux";
import { Options } from "tsparticles/Options/Classes/Options";

const Home = () => {

  const [startDate, setStartDate] = useState(new Date());
  const [EndDate, setEndDate] = useState(new Date(+new Date() + 1*365*24*60*60*1000));
  const [Link, setLink] = useState("https://google.co.in");

  const dispatch = useDispatch();
  const day = useSelector((state) => state.day.start_date);

  const shortenLink = () =>{
    console.log("hi", startDate,"44",EndDate,"55",Link);
    const body = {
      redirects_to:Link,
      will_open_at:startDate,
      will_expire_at:EndDate
    }
    axios({
      method: 'post',
      url: "urls/anonymous/shortner",
      data: body,
    }).then(response =>{
      console.log(response,888)
      // const url = response.data.redirectSite;
      // //taking user to redirected url
      // window.location.href = url;
    }).catch(err =>{
        console.log(err.response.data.message,999);
        cogoToast.error(err.response.data.message,{position:'top-right',hideAfter:4});
    })
  }


  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };
  console.log(new Date(startDate).toISOString(),77788,new Date(EndDate).toISOString(),232323)
    return (
     <>
 <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#home">Chota Ninja</Navbar.Brand>
    <Nav className="ml-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">
          <Button>Sign In/Log In</Button>
      </Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  <Particles params={particle_js_config} />
      {
        <Container>

        <div style = {{marginTop:"380px",
       position: "absolute",
       top: 0,
       width: "100%",
       height: "100%"
      }}>
        <div >
            <Row>
                <Col sm = {12} md = {10} >
                <InputGroup className="mb-3">
    <FormControl
      placeholder="Paste your url here like https://google.co.in!"
      aria-label="Paste your url here like https://google.co.in!!"
      aria-describedby="basic-addon2"
      onChange = {(event)=>setLink(event.target.value)}
    />
   
    <DatePicker
      showTimeSelect
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      timeClassName={handleColor}
    />
    
    <DatePicker
      showTimeSelect
      selected={EndDate}
      onChange={(date) => setEndDate(date)}
      timeClassName={handleColor}
    />

    
  </InputGroup>
                </Col>
                <Col sm = {12} md = {2} >
                <Button onClick={() => {
                              console.log("hi")
                                shortenLink();
                              }} >
      Shorten it
  </Button>
                </Col>
            </Row>
            
        </div>
        <div className ="my-3">
        <Card style={{ width: '92.3%' }}>
  <Card.Body>
  
    <Card.Title>Credi$ol</Card.Title>
    <p>World’s First Cypto Merchandise Platform</p> 
    <div style = {{float:"right"}}>
      <h6>Opens on :   {`${new Date("2021-11-08T14:59:06.928Z")}`}</h6>
      <h6>Expires on : {`${new Date("2022-11-08T14:59:24.325Z")}`}</h6>
    </div>
    <br/>
    <Card.Text>
      <h6 style ={{color:"grey"}}><a href = "https://www.credisol.store/" style = {{textDecoration:"none",color:"grey"}}>https://www.credisol.store/</a></h6>
      <hr/>
      <h5 style ={{color:"red"}}><a href = "http://chotaninja.herokuapp.com/047a976" style = {{textDecoration:"none",color:"red"}}>http://chotaninja.herokuapp.com/047a976</a></h5>
    </Card.Text>
    <Button variant="primary" className = "float-end">
  Clicks <Badge bg="secondary">9</Badge>
  <span className="visually-hidden">Clicks</span>
</Button>
  </Card.Body>
</Card>
        </div>
        </div>
        </Container>
}
        </>
    );
  };
  
  export default Home;
  