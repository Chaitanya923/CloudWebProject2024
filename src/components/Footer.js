import React from 'react';
import { Container, Row, Col, Input, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <Container>
                <Row>
                    <Col className="footer-links">
                        <a href="#home">Home</a>
                        <a href="#features">Features</a>
                        <a href="#how-it-works">How It Works</a>
                        <a href="#resources">Resources</a>
                        <a href="#contact">Contact</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </Col>
                </Row>
                <Row>
                    <Col className="footer-social">
                        <a href="#"><ion-icon name="logo-facebook" className="icon" alt="Facebook"></ion-icon></a>
                        <a href="#"><ion-icon name="logo-twitter" className="icon" alt="Twitter"></ion-icon></a>
                        <a href="#"><ion-icon name="logo-linkedin" className="icon" alt="LinkedIn"></ion-icon></a>
                    </Col>
                </Row>
                <Row>
                    <Col className="footer-contact">
                        <p>Email: info@educationalplatform.com</p>
                        <p>Phone: +1 234 567 890</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Footer;