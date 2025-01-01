import React from "react";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";

const AppNavbar = ({ language, setLanguage, toggleSidebar }) => {
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const languageTitle = language === "id" ? "Bahasa Indonesia" : "English";

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Button
          variant="outline-light"
          onClick={toggleSidebar}
          style={{ marginRight: "1rem" }}
        >
          &#9776; {/* Hamburger icon */}
        </Button>
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
