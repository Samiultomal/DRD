import React from 'react'
import Header from '../../components/header_component/Header'
import { Container } from 'react-bootstrap';



function ClientDashboard() {
  return (
    <>
      <Header />
      <Container className="mt-5 pt-5">
        <h2>Client Dashboard</h2>
        <p>Welcome to the Client Dashboard!</p>
      </Container>
    </>
  );
}

export default ClientDashboard;