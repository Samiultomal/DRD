import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Footer from '../../../components/footer_component/Footer'; 

const ProfileVerification = () => {
  return (
    <div>
      <Container className="check-email-verification-container my-5">
        <div className="check-email-wrapper">
          <Row className="justify-content-center">
            <Col xs={12} md={8} className="text-center">
              <h2 className='Checkheading'>Profile Verification Pending</h2>
              <div className="check-email-heading-border"></div>
              <p className='message'>
                Your profile is currently under verification. Please allow up to 24 hours for the verification process to complete. We will notify you once it's done.
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

export default ProfileVerification;
