import {Nav,Navbar,Container,Button} from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="/">Chota Ninja</Navbar.Brand>
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
