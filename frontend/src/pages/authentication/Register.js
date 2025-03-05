import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { registerUser } from '../../api/AuthApi.js';
import { useNavigate } from 'react-router-dom';
import '../../styles/authentication/Register.css';
import Footer from '../../components/footer_component/Footer.js';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'employee',
    contactNumber: '',
    isActive: true,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    try {
      await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword,
        user_type: formData.userType,
        contact_number: formData.contactNumber,
        is_active: formData.isActive,
      });
      setSuccessMessage('Registration successful! Please check your email to verify your account.');
      setTimeout(() => {
        navigate('/check-email');
      }, 3000);
    } catch (error) {
      setErrors(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container className="register-container my-5">
        <div className="register-wrapper">
          <h2 className="register-logo">Project Management</h2>
          <h2 className="RegisterHeading">Register Here</h2>
          <div className="register-heading-border"></div>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errors.non_field_errors && <Alert variant="danger">{errors.non_field_errors}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} md={12} className="mb-3">
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                    placeholder="Enter username"
                  />
                  <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} md={12} className="mb-3">
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="Enter email"
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={12} className="mb-3">
                <Form.Group controlId="formUserType">
                  <Form.Label>User Type</Form.Label>
                  <Form.Control as="select" name="userType" value={formData.userType} onChange={handleChange}>
                    <option value="staff">Staff</option>
                    <option value="employee">Employee</option>
                    <option value="client">Client</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={12} className="mb-3">
                <Form.Group controlId="formContactNumber">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    isInvalid={!!errors.contact_number}
                    placeholder="Enter contact number"
                  />
                  <Form.Control.Feedback type="invalid">{errors.contact_number}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg={6} md={6} sm={12} className="mb-3">
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    placeholder="Enter password"
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12} className="mb-3">
                <Form.Group controlId="formConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    isInvalid={!!errors.confirm_password}
                    placeholder="Confirm your password"
                  />
                  <Form.Control.Feedback type="invalid">{errors.confirm_password}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={12} className="mb-3">
                <Form.Group controlId="formIsActive">
                  <Form.Check
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    label={
                      <>
                        I agree to the{' '}
                        <Link to="/terms-of-use" target="_blank" className="terms-link">
                          terms of Use
                        </Link>
                      </>
                    }
                    isInvalid={!!errors.is_active}
                  />
                  <Form.Control.Feedback type="invalid">{errors.is_active}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Button
              className="mt-3 register-button"
              type="submit"
              disabled={loading || !formData.isActive}
            >
              {loading ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                'Register'
              )}
            </Button>

            <div className="mt-3 register-text">
              <Link to="/login" className="auth-link">Already have an account? Login</Link>
            </div>
          </Form>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Register;
