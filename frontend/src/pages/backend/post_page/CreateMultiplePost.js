import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { createPost } from '../../../api/PostApi';
import PublisherHeader from '../../../components/header_component/PublisherHeader';
import Footer from '../../../components/footer_component/Footer';
import FooterTop from '../../../components/footer_component/FooterTop';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../../styles/post/CreatePost.css';

function CreateMultiplePost() {
    const { categoryId } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        age: '',
        address: '',
        email: '',
        contact_number: '',
        image1: null,
        image2: null,
        image3: null,
        image4: null,
        is_premium: false,
        is_sponsor: false,
        is_aggred: false,
        is_global: true,
        single_category: categoryId,
    });

    const [globalCost, setGlobalCost] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
        if (name === 'is_global') {
            setGlobalCost(checked ? 444 * 0.02 : null);
        }
    };

    const handleDescriptionChange = (value) => {
        setFormData({ ...formData, description: value });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const existingImages = Object.values(formData).filter(file => file instanceof File);
        
        if (existingImages.length + files.length > 4) {
            setError('You can only upload up to 4 images.');
            return;
        }
    
        const updatedFormData = { ...formData };
    
        let imageIndex = 1;
        for (const key in updatedFormData) {
            if (key.startsWith('image') && !updatedFormData[key] && files.length > 0) {
                updatedFormData[key] = files.shift();
            }
        }
    
        setFormData(updatedFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key] !== null) {
                formDataToSend.append(key, formData[key]);
            }
        });

        try {
            await createPost(formData.single_category, formDataToSend);
            setSuccess('Post created successfully!');
            setTimeout(() => navigate('/dashboard/publisher'), 3000);
        } catch (err) {
            setError('An error occurred while creating the post.');
        }
    };

    return (
        <>
            <PublisherHeader />
            <div className="create-post-wrapper mb-5">
                <Container className="create-post-container">
                    <div className="form-header">
                        <h2 className="add-post-title mb-4">Write your Ads</h2>
                    </div>
                    {error && <Alert variant="danger" className="form-alert">{error}</Alert>}
                    {success && <Alert variant="success" className="form-alert">{success}</Alert>}
                    <div className="form-body">
                        <Form onSubmit={handleSubmit} className="create-post-form">
                            <Row>
                                <Col md={12} className="form-group">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="title-input"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3 form-group">
                                <Form.Label>Description</Form.Label>
                                <ReactQuill
                                    value={formData.description}
                                    className="description-editor"
                                    onChange={handleDescriptionChange}
                                    modules={quillModules}
                                    formats={quillFormats}
                                />
                            </Form.Group>
                            <Row>
                                <Col md={12} className="form-group">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="address-input"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={12} className="form-group">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            className="email-input"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3 form-group">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="contact-input"
                                    name="contact_number"
                                    value={formData.contact_number}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="age-label">Age</Form.Label>
                                <Form.Control
                                    type="number"
                                    className="age-input"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Upload Images (Max 4)</Form.Label>
                                <Form.Control className="image-input" type="file" multiple onChange={handleImageUpload} />
                                <div className="image-preview mt-2">
                                    {Object.keys(formData)
                                        .filter((key) => key.startsWith('image') && formData[key])
                                        .map((key, index) => (
                                            <img
                                                key={index}
                                                src={URL.createObjectURL(formData[key])}
                                                alt={`Preview ${index + 1}`}
                                                className="uploaded-image-preview"
                                            />
                                        ))}
                                </div>
                            </Form.Group>

                            <div className="checkbox-section">
                                <Form.Group className="mb-3">
                                    <div className="regular-post-message mb-2">Each regular post costs $0.02.</div>
                                    <Form.Check
                                        type="checkbox"
                                        label="Make this ad Premium for $5"
                                        name="is_premium"
                                        checked={formData.is_premium}
                                        onChange={handleInputChange}
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Your ad will be highlighted for 4 weeks at $10."
                                        name="is_sponsor"
                                        checked={formData.is_sponsor}
                                        onChange={handleInputChange}
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Post to all cities (Total Cost $8.88)"
                                        name="is_global"
                                        checked={formData.is_global}
                                        onChange={handleInputChange}
                                        disabled
                                    />
                                    {globalCost !== null && (
                                        <div className="global-cost-message">
                                            Cost: ${globalCost.toFixed(2)}
                                        </div>
                                    )}
                                    <Form.Check
                                        type="checkbox"
                                        label="Agree to Terms"
                                        name="is_aggred"
                                        checked={formData.is_aggred}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </div>
                            <Button type="submit" variant="primary" className="submit-btn">
                                Create Post
                            </Button>
                        </Form>
                    </div>
                </Container>
            </div>
            <FooterTop />
            <Footer />
        </>
    );
}

const quillModules = { toolbar: [[{ font: [] }], [{ size: [] }], [{ align: [] }], ['bold', 'italic', 'underline'], [{ color: [] }, { background: [] }], [{ list: 'ordered' }, { list: 'bullet' }], ['clean']] };
const quillFormats = ['font', 'size', 'align', 'bold', 'italic', 'underline', 'color', 'background', 'list', 'bullet'];

export default CreateMultiplePost;
