import {Nav,Navbar,Container,Button,NavDropdown} from 'react-bootstrap';
import ninjapic from "../ninja.png";
import isLoggedIn from "../functions/isLoggedIn";
import LogOut from '../functions/logout';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="/"><img src = {ninjapic} width="40px" height="40px" className = "mx-2"/><span style ={{fontSize:"20px",fontWeight:"bold"}}>Chota.ninja </span> <span className="px-2" style={{fontSize:"12px"}}> Beta v1.0</span></Navbar.Brand>
    <Nav className="ml-auto">
      <Nav.Link href="/login">
        {isLoggedIn() ?(
        <NavDropdown
        id="nav-dropdown-dark-example"
        title={
          <img src = {isLoggedIn().profilePic} width="40" height="40" style = {{borderRadius:"50%"}}/>
        }
        menuVariant="dark"
      >
        <NavDropdown.Item onClick = {()=>LogOut()}>Log out</NavDropdown.Item>
       
      </NavDropdown>
        ):(<Button>Sign In/Log In</Button>)}
          
      </Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  );
};

export default Header;
