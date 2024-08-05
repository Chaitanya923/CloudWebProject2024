import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Container, Row, Col } from 'reactstrap';
import './css/SignUp.css';

const SignUP = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  return (
    <Container id="SignUP-container" className={`SignUP-container ${isRightPanelActive ? 'right-panel-active' : ''}`}>
      <Row className="form-container sign-up-container">
        <Col>
          <Form>
            <h1>Sign Up</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook"></i></a>
              <a href="#" className="social"><i className="fab fa-google"></i></a>
              <a href="#" className="social"><i className="fab fa-instagram"></i></a>
            </div>
            <span>or use your email for registration</span>
            <FormGroup>
              <Input type="text" name="Name" placeholder="Name" />
            </FormGroup>
            <FormGroup>
              <Input type="email" name="email" placeholder="Email" />
            </FormGroup>
            <FormGroup>
              <Input type="password" name="password" placeholder="Password" />
            </FormGroup>
            <Button type="submit">Sign Up</Button>
          </Form>
        </Col>
      </Row>
      <Row className="form-container sign-in-container">
        <Col>
          <Form>
            <h1>Sign In</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook"></i></a>
              <a href="#" className="social"><i className="fab fa-google"></i></a>
              <a href="#" className="social"><i className="fab fa-instagram"></i></a>
            </div>
            <span>or use your account</span>
            <FormGroup>
              <Input type="email" name="email" placeholder="Email" />
            </FormGroup>
            <FormGroup>
              <Input type="password" name="password" placeholder="Password" />
            </FormGroup>
            <a href="#">Forgot your password?</a>
            <Button type="submit">Sign In</Button>
          </Form>
        </Col>
      </Row>
      <Row className="overlay-container">
        <Col>
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>Please login with your personal info</p>
              <Button className="ghost" id="signIn" onClick={handleSignInClick}>Sign In</Button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <Button className="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUP;
