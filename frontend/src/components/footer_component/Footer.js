import React from 'react';
import { Container } from 'react-bootstrap';
import '../../styles/footer/Footer.css';

const Footer = () => {
  return (
    <footer className="footer py-3">
      <Container className="text-center">
        <p className="mb-0">Copyright &copy; 2025 Project Management All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
