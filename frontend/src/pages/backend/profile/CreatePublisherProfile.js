import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Spinner, Container } from 'react-bootstrap';
import { createPublisherProfile } from '../../../api/ProfileApi';
import PublisherHeader from '../../../components/header_component/PublisherHeader';
import Footer from '../../../components/footer_component/Footer';
import FooterTop from '../../../components/footer_component/FooterTop';
import '../../../styles/post/CreatePublisherProfile.css';

const CreatePublisherProfile = () => {
    const [nidFrontPage, setNidFrontPage] = useState(null);
    const [nidBackPage, setNidBackPage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e, setFile) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!nidFrontPage || !nidBackPage) {
            setError('Please upload both NID front and back pages.');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('nid_frontpage', nidFrontPage);
        formData.append('nid_backpage', nidBackPage);

        try {
            await createPublisherProfile(formData);
            navigate('/dashboard/publisher');
        } catch (err) {
            setError(err.detail || 'Failed to create the profile.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <PublisherHeader />
            <div className="create-profile-wrapper mb-5">
                <Container className="mt-4 create-profile-container">
                    <h2 className="title mb-4">Profile Verification</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="nidFrontPage" className="mb-3">
                            <Form.Label>NID Front Page</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, setNidFrontPage)}
                            />
                        </Form.Group>

                        <Form.Group controlId="nidBackPage" className="mb-3">
                            <Form.Label>NID Back Page</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, setNidBackPage)}
                            />
                        </Form.Group>
                            <Button className="profile-create-btn" variant="primary" type="submit" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Spinner animation="border" size="sm" /> Creating...
                                    </>
                                ) : (
                                    'Create Profile'
                                )}
                            </Button>
                    </Form>
                </Container>
            </div>
            <FooterTop />
            <Footer />
        </>
    );
};

export default CreatePublisherProfile;