import React from 'react'
import Header from '../../components/header_component/Header'
import { Container } from 'react-bootstrap';



function EmployeeDashboard() {
  return (
    <>
      <Header />
      <Container className="mt-5 pt-5">
        <h2>Employee Dashboard</h2>
        <p>Welcome to the Employee Dashboard!</p>
      </Container>
    </>
  );
}

export default EmployeeDashboard;