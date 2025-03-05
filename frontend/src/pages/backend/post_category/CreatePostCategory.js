import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { createPostCategory } from '../../../api/ApiService';

const CreatePostCategory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [postType, setPostType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const categoryData = { name, description, post_type: postType };
      const response = await createPostCategory(categoryData);
      setSuccess(`Post category "${response.name}" created successfully!`);
      setName('');
      setDescription('');
      setPostType('');
    } catch (err) {
      setError(err.detail || 'An error occurred while creating the post category.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create a New Post Category</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="postType" className="mt-3">
          <Form.Label>Post Type</Form.Label>
          <Form.Select
            value={postType}
            onChange={(e) => setPostType(e.target.value)}
            required
          >
            <option value="">Select a post type</option>
            <option value="adult">Adult</option>
            <option value="community">Community</option>
            <option value="local_places">Local Places</option>
            <option value="rentals">Rentals</option>
            <option value="dating">Dating</option>
            <option value="musician">Musician</option>
            <option value="services">Services</option>
            <option value="automotive">Automotive</option>
            <option value="real_estate">Real Estate</option>
            <option value="jobs">Jobs</option>
            <option value="trade">Trade</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="name">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="description" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter category description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" className="mt-3" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Create Category'}
        </Button>
      </Form>
    </div>
  );
};

export default CreatePostCategory;
