import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useUser } from "../services/UserProvider";

function NavigationBar(props) {
  const user = useUser();
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          {user.jwt ?
            <Navbar.Brand href="/">Hello {props.username}</Navbar.Brand>
            :
            <Navbar.Brand href="/">Task Management System </Navbar.Brand>
          }
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {user.jwt ? 
                      <Nav.Link href="/logout">Logout</Nav.Link>
                      : 
                      <Nav.Link href="/login">Login</Nav.Link>
            }
            {!user.jwt && <Nav.Link href="/signup">Sign Up</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>

      
    </>
  );
}

export default NavigationBar;
