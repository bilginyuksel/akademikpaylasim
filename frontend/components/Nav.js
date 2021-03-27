import React from 'react'
import { Navbar,Nav,NavDropdown,Form,FormControl,Button   } from 'react-bootstrap';
function AkademikPaylasimNav() {
    return (

        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Akademik Paylaşım</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Anasayfa</Nav.Link>
                    <Nav.Link href="/alanlar">Doçentlik Puan Hesaplama</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default AkademikPaylasimNav
