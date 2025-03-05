import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/AuthApi"; 
import "../../styles/authentication/Login.css";
import Footer from "../../components/footer_component/Footer";

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const data = await loginUser({
        identifier: formData.identifier,
        password: formData.password,
      });

      if (data.error) {
        setError(data.error);
        setTimeout(() => {
          window.location.reload(); // Reload after 5 seconds if error occurs
        }, 5000);
        return;
      }

      const { refresh, access, username, email, user_type, contact_number, user_id } = data;
      const userData = {
        accessToken: access,
        refreshToken: refresh,
        userId: user_id,
        username: username,
        email: email,
        userType: user_type,
        contactNumber: contact_number,
      };

      localStorage.setItem("userData", JSON.stringify(userData));

      setSuccess("Login successful!");
      setTimeout(() => {
        switch (user_type) {
          case "staff":
            navigate("/dashboard/staff");
            break;
          case "employee":
            navigate("/dashboard/employee");
            break;
          case "client":
            navigate("/dashboard/client");
            break;
          default:
            navigate("/");
            break;
        }
      }, 1000);
    } catch (error) {
      setError(error.message || "Login failed. Please try again.");
      setTimeout(() => {
        window.location.reload(); // Reload after 5 seconds if error occurs
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container className="login-container my-5">
        <div className="login-wrapper">
          <h2 className="login-logo">Project Management</h2>
          <h2 className="LoginHeading">Login</h2>
          <div className="login-heading-border"></div>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12}>
                <Form.Group controlId="formIdentifier" className="mb-4">
                  <Form.Label>Username or Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="identifier"
                    value={formData.identifier}
                    onChange={handleChange}
                    required
                    autoComplete="username"
                    placeholder="Enter your username or email"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <Form.Group controlId="formPassword" className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button type="submit" className="mt-3 login-button" disabled={loading}>
              {loading ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                "Login"
              )}
            </Button>
          </Form>
          <div className="no-account-yet mt-3">
            <p>
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
            <p>
              <Link to="/password-reset">Forgot Password?</Link>
            </p>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Login;
