import React from "react";
import {Container, Col, Row} from "react-bootstrap";


let logo = require("static/img/logo.jpeg")

class Header extends React.Component {
    render() {
        return (
            <header>
                <Container>
                    <Row>
                        <Col xs={4}>
                            <img src={logo} alt="logo" />
                        </Col>
                        <Col xs={8}>
                            <h1>API Testing Environment</h1>
                        </Col>
                    </Row>
                </Container>
            </header>
        );
    }
}

export default Header;