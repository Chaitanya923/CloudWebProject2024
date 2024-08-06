import React, { useState } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
} from "reactstrap";
import "./css/ContactUs.css";
import { post } from "./ApiServices";

function About() {

    const [formData, setFormData] = useState({
      username: "",
        email: "",
        phone: "",
        message: "",
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const SendformData = async () => {
          try {
            const data = await post("/contact",formData); // Call the API utility
            setFormData({ username: '', email: '', phone: '', message: '' });
            alert('Message sent successfully!');
          } catch (error) {
            console.error('Error:', error);
            alert('Failed to send message. Please try again.');
          }
        };
    
        SendformData();
      };
    
    return (
        <Container className="contact-us-page mt-5">
            <Row>
                <Col md="6" className="contact-info">
                    <h3 className="title">Let's get in touch</h3>
                    <p className="text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
                        dolorum adipisci recusandae praesentium dicta!
                    </p>

                    <div className="info">
                        <div className="information">
                            <i className="fa fa-map-marker"></i> &nbsp; &nbsp;
                            <p style={{
                              margin: '0px',
                              }}>92 Cherry Drive Uniondale, NY 11553</p>
                        </div>
                        <div className="information">
                            <i className="fa fa-envelope"></i> &nbsp; &nbsp;
                            <p style={{
                              margin: '0px',
                              }}>lorem@ipsum.com</p>
                        </div>
                        <div className="information">
                            <i className="fa fa-phone"></i>&nbsp; &nbsp;
                            <p>123-456-789</p>
                        </div>
                    </div>

                    <div className="social-media">
                        <p>Connect with us :</p>
                        <div className="social-icons">
                            <a href="#">
                                <i className="fa fa-facebook-f"></i>
                            </a>
                            <a href="#">
                                <i className="fa fa-twitter"></i>
                            </a>
                            <a href="#">
                                <i className="fa fa-instagram"></i>
                            </a>
                            <a href="#">
                                <i className="fa fa-linkedin"></i>
                            </a>
                        </div>
                    </div>
                </Col>

                <Col md="6" className="contact-form">
          <h3 className="title">Contact us</h3>
          <Form onSubmit={handleSubmit} autocomplete="off">
            <FormGroup className="input-container">
              <Input
                type="text"
                name="username"
                id="username"
                placeholder=" "
                value={formData.username}
                onChange={handleChange}
                className="input"
                required
              />
              <Label for="username">Username</Label>
              {/* <span>Username</span> */}
            </FormGroup>
            <FormGroup className="input-container">
              <Input
                type="email"
                name="email"
                id="email"
                placeholder=" "
                value={formData.email}
                onChange={handleChange}
                className="input"
                required
              />
              <Label for="email" className="className={formData.email ? 'active' : ''}">Email</Label>
              {/* <span>Email</span> */}
            </FormGroup>
            <FormGroup className="input-container">
              <Input
                type="tel"
                name="phone"
                id="phone"
                placeholder=" "
                value={formData.phone}
                onChange={handleChange}
                className="input"
                required
              />
              <Label for="phone">Phone</Label>
              {/* <span>Phone</span> */}
            </FormGroup>
            <FormGroup className="input-container textarea">
              <Input
                type="textarea"
                name="message"
                id="message"
                placeholder=" "
                value={formData.message}
                onChange={handleChange}
                className="input"
                rows="5"
                required
              />
              <Label for="message" className="className={formData.message ? 'active' : ''}">Message</Label>
              {/* <span>Message</span> */}
            </FormGroup>
            <Button color="primary" type="submit" className="btn" block>
              Send
            </Button>
          </Form>
        </Col>
            </Row>
        </Container>
    );
}

export default About;