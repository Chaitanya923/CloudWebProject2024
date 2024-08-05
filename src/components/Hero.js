import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import './css/Hero.css'; 

function Hero() {
  return (
    <section id="hero" className="hero section light-background">
      <Container>
        <Row className="gy-4">
          <Col lg="6" className="order-2 order-lg-1 d-flex flex-column justify-content-center">
            <h1>
              Welcome to <span>BizLand</span>
            </h1>
            <p>We are a team of talented designers making websites with Bootstrap</p>
            <div className="d-flex">
              <Button color="primary" href="#about" className="btn-get-started me-3">
                Get Started
              </Button>
              <Button
                color="secondary"
                href="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                className="btn-watch-video d-flex align-items-center"
              >
                <i className="bi bi-play-circle me-2"></i>
                Watch Video
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Hero;
