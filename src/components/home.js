import { InputGroup , FormControl,Button} from 'react-bootstrap';

const Home = () => {
    return (
     <>
        <div>
          <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                Awesome Todo App
              </a>
            </div>
          </nav>
        </div>
        <div>
        <InputGroup className="mb-3">
    <FormControl
      placeholder="Recipient's username"
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
    />
    <Button variant="outline-secondary" id="button-addon2">
      Button
    </Button>
  </InputGroup>
        </div>
        </>
    );
  };
  
  export default Home;
  