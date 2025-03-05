import React, { useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/authentication/PasswordResetRequest.css'; 
import Footer from '../../components/footer_component/Footer'; 

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:8000/api/password-reset/', { email });
      setMessage('Password reset email sent. Please check your inbox.');
      setError(null);
      setTimeout(() => {
        navigate('/'); 
      }, 2000); 
    } catch (err) {
      setError('Failed to send password reset email.');
      setMessage(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container className="password-reset-container my-5">
        <div className="password-reset-wrapper"> 
          <h2 className='Forgetheading'>Forgot Password</h2>
          <div className="password-reset-heading-border"></div>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail" className="mb-4">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </Form.Group>
            <Button 
              type="submit" 
              className="mt-3 password-reset-button"
              disabled={loading} 
            >
              {loading ? <Spinner animation="border" size="sm" /> : 'Send Password Reset Email'}
            </Button>
          </Form>
          <div className="login-link mt-3">
            <p>
              Remember your password? <Link to="/login">Go back to Login</Link>
            </p>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default PasswordResetRequest;
