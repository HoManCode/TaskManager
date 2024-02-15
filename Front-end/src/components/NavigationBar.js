import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useUser } from '../services/UserProvider';

function NavigationBar() {
  const user = useUser();
  return (
    <>
      <br />
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Task Management System</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            { user ? 
                    <Nav.Link href="/logout">Logout</Nav.Link>
                   : <Nav.Link href="/login">Login</Nav.Link> }
            { !user &&
              <Nav.Link href="/signup">Sign Up</Nav.Link>} 
          </Nav>
        </Container>
      </Navbar>

      <br />
    </>
  );
}

export default NavigationBar;