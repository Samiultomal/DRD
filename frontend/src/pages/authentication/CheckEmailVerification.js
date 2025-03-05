import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../../styles/authentication/CheckEmailVerification.css'; 
import Footer from '../../components/footer_component/Footer'; 

const CheckEmailVerification = () => {
  return (
    <div>
      <Container className="check-email-verification-container my-5">
        <div className="check-email-wrapper">
          <Row className="justify-content-center">
            <Col xs={12} md={8} className="text-center">
              <h2 className='Checkheading'>Check Your Email</h2>
              <div className="check-email-heading-border"></div>
              <p className='message'>
                We have sent a verification link to your email address. Please check your inbox and verify your account to complete registration.
              </p>
              <Button variant="primary" className='check-mail-button' as={Link} to="/">
                Go to HomePage
              </Button>
            </Col>
          </Row>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default CheckEmailVerification;
