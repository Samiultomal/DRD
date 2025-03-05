import React from 'react'
import Header from '../../components/header_component/Header'
import { Container } from 'react-bootstrap';



function StaffDashboard() {
  return (
    <>
      <Header />
      <Container className="mt-5 pt-5">
        <h2>Staff Dashboard</h2>
        <p>Welcome to the staff dashboard!</p>
      </Container>
    </>
  );
}

export default StaffDashboard;