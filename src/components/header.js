import {Nav,Navbar,Container,Button} from 'react-bootstrap';

const Header = () => {
  return (
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
  );
};

export default Header;
