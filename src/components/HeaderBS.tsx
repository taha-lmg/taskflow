import React from 'react';
import { Navbar, Container, Button, Nav } from 'react-bootstrap';

interface HeaderBSProps {
  title: string;
  onMenuClick: () => void;
  userName?: string;
  onLogout?: () => void;
}

export default function HeaderBS({
  title,
  onMenuClick,
  userName,
  onLogout,
}: HeaderBSProps) {
  return (
    <Navbar bg="success" expand="lg" sticky="top">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={onMenuClick} />
        <Navbar.Brand href="#" className="fw-bold">
          {title}
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {userName && (
              <Nav.Item className="me-3">
                <span className="navbar-text text-white">{userName}</span>
              </Nav.Item>
            )}
            {onLogout && (
              <Nav.Item>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={onLogout}
                  className="text-white"
                >
                  Déconnexion
                </Button>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
