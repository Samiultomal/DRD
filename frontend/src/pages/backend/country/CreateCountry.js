// src/components/CreateCountry.js
import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { createCountry } from '../../../api/ApiService';

const CreateCountry = () => {
  const [name, setName] = useState('');
  const [continent, setContinent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const countryData = { name, continent };
      const response = await createCountry(countryData);
      setSuccess(`Country "${response.name}" created successfully!`);
      setName('');
      setContinent('');
    } catch (err) {
      setError(err.detail || 'An error occurred while creating the country.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create a New Country</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Country Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="continent" className="mt-3">
          <Form.Label>Continent</Form.Label>
          <Form.Select
            value={continent}
            onChange={(e) => setContinent(e.target.value)}
            required
          >
            <option value="">Select a continent</option>
            <option value="NA">United States</option>
            <option value="LAC">America and Caribbean</option>
            <option value="CA">Canada</option>
            <option value="EU">Europe</option>
            <option value="AS">Asia and Middle East</option>
            <option value="AUO">Oceania</option>
            <option value="AF">Africa</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" className="mt-3" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Create Country'}
        </Button>
      </Form>
    </div>
  );
};

export default CreateCountry;
