import axios from "axios";
import { useState, useEffect } from "react";
import { InputGroup , FormControl,Button, Container,Nav,Navbar ,Row,Col,Card,Badge} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Particles from 'react-particles-js';
import {particle_js_config} from '../config/particle';

const Home = () => {

  const [startDate, setStartDate] = useState(new Date());
  const [EndDate, setEndDate] = useState(new Date());


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
      placeholder="Paste your url here !"
      aria-label="Paste your url here !"
      aria-describedby="basic-addon2"
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
                <Button>
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
  