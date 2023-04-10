import React from "react";
import { Container, NavbarBrand } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";

function BasicNav(){
    return(
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">RAWG API</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Landing</Nav.Link>
                    <Nav.Link href="/compare">Compare</Nav.Link>
                    <Nav.Link href="/time">Timeline</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default BasicNav;