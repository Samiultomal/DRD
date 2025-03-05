import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import PublisherHeader from '../../../components/header_component/PublisherHeader';
import Footer from '../../../components/footer_component/Footer';
import FooterTop from '../../../components/footer_component/FooterTop';
import Breadcrumbs from '../../../components/Breadcrumbs'; 
import '../../../styles/post/AdsPost.css';

function AdsPost() {
  const breadcrumbsItems = [
    { label: 'Home', path: '/' },
    { label: 'Post Ads', path: '/post-ads' },
  ];

  return (
    <div className="ads-post-container">
      <PublisherHeader />
      
      <Container>
        <Breadcrumbs items={breadcrumbsItems} />
      </Container>

      <Container className="ads-post-content">
        <Row>
          <Col>
            <h1>Select Post Type</h1>
            <ul className="ads-post-list">
              <li>
                <Link to="/add-single-location" className="ads-link">
                  Add Post For Single Location
                </Link>
              </li>
              <li>
                <Link to="/add-multiple-location" className="ads-link">
                  Add Post For Multiple Locations
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>

      <FooterTop />
      <Footer />
    </div>
  );
}

export default AdsPost;
