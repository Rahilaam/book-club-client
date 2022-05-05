import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../../store/user/selectors";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import { Container } from "react-bootstrap";

export default function Navigation() {
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={NavLink} to="/">
        📚bookClub
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Nav className="me-auto">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{ width: "100%" }} fill>
            <NavbarItem path="/" linkText="AllClubs" />
          </Nav>
          {token ? <NavbarItem path="/userProfile" linkText="MyReads" /> : ""}
          {token ? <NavbarItem path="/newClub" linkText="newClub" /> : ""}
          {/* {loginLogoutControls} */}
        </Navbar.Collapse>
      </Nav>
      {user.name ? (
        <Nav.Item style={{ padding: ".5rem 1rem", color: "teal" }}>
          {user.name}
        </Nav.Item>
      ) : (
        ""
      )}
      {loginLogoutControls}
    </Navbar>
  );
}
