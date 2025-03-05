import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../../styles/authentication/EmailVerificationSuccess.css';
import Footer from '../../components/footer_component/Footer'; 

const EmailVerificationSuccess = () => {
  return (
    <div>
      <Container className="verification-success-container my-5">
        <div className="verification-success-wrapper">
          <h2>Email Verification Successful</h2>
          <p>Your email has been successfully verified. You can now log in to your account and enjoy all the features our platform offers.</p>
          <Row className="mt-4">
            <Col className="text-center">
              <Link to="/login" className="verify-button">
                <Button className="login-button">Go to Login</Button>
              </Link>
            </Col>
          </Row>
        </div>
      </Container>
      <Footer /> 
    </div>
  );
};

export default EmailVerificationSuccess;
