import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import {
  getCurrentUser,
  onAuthStateChange,
  signInWithGoogle,
  signOut,
} from "../utils/Auth"; // Import fungsi auth

const AppNavbar = ({ language, setLanguage, toggleSidebar }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };

    fetchUser();

    // Pantau perubahan autentikasi
    const { data: authListener } = onAuthStateChange(setUser);

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const languageTitle = language === "id" ? "Bahasa Indonesia" : "English";
  const loginTitle = user ? user.user_metadata.full_name : "Login";

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Button
          variant="outline-light"
          onClick={toggleSidebar}
          style={{ marginRight: "1rem" }}
        >
          &#9776;
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
          <NavDropdown
            title={loginTitle}
            id="login-dropdown"
            align="end"
            style={{ marginLeft: "1rem" }}
          >
            {!user ? (
              <NavDropdown.Item onClick={signInWithGoogle}>
                Login with Google
              </NavDropdown.Item>
            ) : (
              <NavDropdown.Item onClick={signOut}>Logout</NavDropdown.Item>
            )}
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
