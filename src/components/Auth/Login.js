import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/apiService";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "../../style/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    if (!validateEmail(email)) {
      setMessage("Invalid email format. Please provide a valid email.");
      return;
    }

    if (!validatePassword(password)) {
      setMessage(
        "Password must be at least 8 characters, include 1 uppercase, 1 lowercase, 1 number, and 1 special character."
      );
      return;
    }

    try {
      const tokens = await login({ email, password }); // Call login API
      console.log("Login Successful, Tokens:", tokens); // token
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("idToken", tokens.idToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      setMessage("Login successful. Redirecting...");
      setTimeout(() => {
        navigate("/user", { state: { tokens } }); // Pass tokens to User Page
      }, 2000);
    } catch (error) {
      console.error("Error during login:", error);
      setMessage(error.message)
    }
  };

  return (
    <Container fluid className="login-page">
      <Row className="vh-100">
        {/* Left Section */}
        <Col md={6} className="left-section text-white d-flex flex-column align-items-center pt-5">
          <div className="home-icon">
            <a href="/" className="text-white">
              <i className="fas fa-home"></i>
            </a>
          </div>
          <div className="text-center">
            <div className="logo mb-3">
              <img src="./images/sport_signin.png" alt="Logo" className="logo-img" />
            </div>
            <h1>Sport Shop</h1>
            <p className="mt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam nonummy nibh euismod tincidunt.
            </p>
            <Button variant="outline-light" className="mt-3 learn-more-btn">
              Learn More
            </Button>
          </div>
        </Col>

        {/* Right Section */}
        <Col md={6} className="right-section d-flex flex-column justify-content-center">
          <div className="login-form text-center">
            <h2>Welcome Back!</h2>
            <p className="mb-4">Sign in to continue</p>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 d-flex justify-content-between align-items-center">
                <Form.Check type="checkbox" label="Remember me" />
                <a href="/forgot-password" className="forgot-password-link">
                  Forgot Password?
                </a>
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>
            <p className="mt-3">
              Don’t have an account? <a href="/register" className="register-link">Register</a>
            </p>
            <p className="mt-3 text-danger">{message}</p>
            <p className="admin-login-link mt-3">
              Admin Login?{" "}
              <Button variant="link" onClick={() => navigate("/admin-login")}>
                Login as Admin
              </Button>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
