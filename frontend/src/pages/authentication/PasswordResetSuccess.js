import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../../styles/authentication/PasswordResetSuccess.css'; 
import Footer from '../../components/footer_component/Footer'; 

const PasswordResetSuccess = () => {
  return (
    <div>
      <Container className="password-reset-success-container my-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} className="text-center">
            <h2 className='heading'>Reset Successful</h2>
            <div className="password-reset-heading-border"></div>
            <p className='message'>
              Your password has been successfully reset. You can now log in with your new password.
            </p>
            <Button variant="primary" className="go-login-button" as={Link} to="/login">
              Login Here
            </Button>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default PasswordResetSuccess;
