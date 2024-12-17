// src/Components/Navbar.js
import React from "react";
import { Navbar, Container } from "react-bootstrap";

const AppNavbar = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand className="mx-auto" style={{ textAlign: "center" }}>
          MentaEase
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
