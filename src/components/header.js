import {Nav,Navbar,Container,Button} from 'react-bootstrap';
import ninjapic from "../ninja.png";
const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="/"><img src = {ninjapic} width="40px" height="40px" className = "mx-2"/><span style ={{fontSize:"20px",fontWeight:"bold"}}>Chota.ninja </span> <span className="px-2" style={{fontSize:"12px"}}> v1.0</span></Navbar.Brand>
    <Nav className="ml-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="/login">
          <Button>Sign In/Log In</Button>
      </Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  );
};

export default Header;
