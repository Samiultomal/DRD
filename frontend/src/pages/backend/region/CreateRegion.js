import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { fetchCountriesByContinent, createRegion } from '../../../api/ApiService';

const CreateRegion = () => {
  const [name, setName] = useState('');
  const [continent, setContinent] = useState('');
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const CONTINENT_CHOICES = [
    { value: 'NA', label: 'USA' },
    { value: 'LAC', label: 'America and Caribbean' },
    { value: 'CA', label: 'Canada' },
    { value: 'EU', label: 'Europe' },
    { value: 'AS', label: 'Asia' },
    { value: 'ME', label: 'Middle East' },
    { value: 'AUO', label: 'Oceania' },
    { value: 'AF', label: 'Africa' },
  ];

  useEffect(() => {
    if (continent) {
      const loadCountries = async () => {
        try {
          const data = await fetchCountriesByContinent(continent);
          setCountries(data);
        } catch (err) {
          setError(err.detail || 'Failed to load countries.');
        }
      };

      loadCountries();
    } else {
      setCountries([]);
    }
  }, [continent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const regionData = { name, country };
      const response = await createRegion(regionData);
      setSuccess(`Region "${response.name}" created successfully in country "${response.country}"!`);
      setName('');
      setContinent('');
      setCountry('');
    } catch (err) {
      setError(err.detail || 'An error occurred while creating the region.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create a New Region</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="continent">
          <Form.Label>Continent</Form.Label>
          <Form.Select
            value={continent}
            onChange={(e) => setContinent(e.target.value)}
            required
          >
            <option value="">Select a continent</option>
            {CONTINENT_CHOICES.map((cont) => (
              <option key={cont.value} value={cont.value}>
                {cont.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="country" className="mt-3">
          <Form.Label>Country</Form.Label>
          <Form.Select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            disabled={!countries.length}
          >
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="name" className="mt-3">
          <Form.Label>Region Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter region name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" className="mt-3" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Create Region'}
        </Button>
      </Form>
    </div>
  );
};

export default CreateRegion;
