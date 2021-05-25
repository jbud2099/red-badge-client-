import React from 'react';
import { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import  UserContext  from "../../Contexts/UserContext";
//import "../site/Site.css";
import Auth from "../Auth/Auth"

function SiteNavbar() {
    let userContext = useContext(UserContext);

    return(
        <>
        <Navbar className="sticky-top" bg="dark" variant="dark">
            <LinkContainer to="/">
        <Navbar.Brand className="mr-auto" id="title">
            PowerCoin
          </Navbar.Brand> 
            </LinkContainer>
            <Nav>
          <LinkContainer to="/">
            <Nav.Link id="home">Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/auth">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            {/* <LinkContainer to="/register">
              <Nav.Link>Register</Nav.Link>
            </LinkContainer> */}
            <LinkContainer to="/review">
              <Nav.Link>Post A Review!</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/reviewedit">
              <Nav.Link>Edit</Nav.Link>
            </LinkContainer>
            </Nav>
        </Navbar>
        </>
    )
}

export default SiteNavbar;