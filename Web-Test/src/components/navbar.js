// src/Components/Navbar.js
import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

const AppNavbar = ({ language, setLanguage }) => {
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const languageTitle = language === "id" ? "Bahasa Indonesia" : "English";

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand className="mx-auto" style={{ textAlign: "center" }}>
          MentaEase
        </Navbar.Brand>
        <Nav>
          <NavDropdown title={languageTitle} id="language-dropdown" align="end">
            <NavDropdown.Item onClick={() => handleLanguageChange("id")}>
              Bahasa Indonesia
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleLanguageChange("en")}>
              English
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
