import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import '../../styles/authentication/PasswordResetConfirm.css'; 
import Footer from '../../components/footer_component/Footer'; 

const PasswordResetConfirm = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setMessage(null);
      return;
    }

    setLoading(true); 
    try {
      await axios.post(`http://localhost:8000/api/password-reset-confirm/${token}/`, {
        uid: new URLSearchParams(window.location.search).get('uid'),
        password,
        confirm_password: confirmPassword,
      });
      setMessage('Password has been reset successfully.');
      setError(null);
      navigate('/password-reset-success');
    } catch (err) {
      setError('Failed to reset password.');
      setMessage(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container className="password-reset-confirm-container my-5">
        <div className="password-reset-confirm-wrapper">
          <h2 className='password-reset-confirm-heading'>Reset Password</h2>
          <div className="password-reset-confirm-heading-border"></div>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formPassword" className="mb-4">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword" className="mb-4">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </Form.Group>
            <Button 
              type="submit" 
              className="mt-3 password-reset-confirm-button"
              disabled={loading} 
            >
              {loading ? <Spinner animation="border" size="sm" /> : 'Reset Password'}
            </Button>
          </Form>
        </div> 
      </Container>

      <Footer />
    </div>
  );
};

export default PasswordResetConfirm;
