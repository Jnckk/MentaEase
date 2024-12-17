// src/Components/Sidebar.js
import React from "react";
import { Nav, NavItem, Navbar, Col } from "react-bootstrap";

const AppSidebar = () => {
  return (
    <Col
      xs={2}
      style={{
        backgroundColor: "#f8f9fa",
        height: "100vh",
        paddingTop: "20px",
      }}
    >
      <Navbar bg="light" variant="light" className="flex-column">
        <Nav defaultActiveKey="/" className="flex-column">
          <NavItem>
            <h5>Histori</h5>
          </NavItem>
        </Nav>
      </Navbar>
    </Col>
  );
};

export default AppSidebar;
