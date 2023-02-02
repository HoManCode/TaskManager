import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavigationBar() {
  return (
    <>
      <br />
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Task Management System</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="">Sign Up</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <br />
    </>
  );
}

export default NavigationBar;