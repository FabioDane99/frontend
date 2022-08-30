import React from 'react'
import {
    Navbar,
    Container
} from 'react-bootstrap';

const Header = ({ appName }) => {
    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand href="/"> {appName} </Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Header