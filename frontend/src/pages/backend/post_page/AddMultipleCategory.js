import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPostCategories, createSingleCategory } from '../../../api/SingleCategoryApi';
import PublisherHeader from '../../../components/header_component/PublisherHeader';
import Footer from '../../../components/footer_component/Footer';
import FooterTop from '../../../components/footer_component/FooterTop';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { Container, Row, Col } from 'react-bootstrap';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import '../../../styles/post/AddSingleCategory.css';

function AddMultipleCategory() {
  const { locationId } = useParams();
  const [categories, setCategories] = useState({});
  const [expanded, setExpanded] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await fetchPostCategories();
        const groupedCategories = categoriesData.reduce((acc, category) => {
          if (!acc[category.post_type]) {
            acc[category.post_type] = [];
          }
          acc[category.post_type].push(category);
          return acc;
        }, {});
        setCategories(groupedCategories);
      } catch (err) {
        console.error('Error fetching post categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCategoryClick = async (categoryId) => {
    const categoryData = {
      post_category: categoryId,
      location: locationId,
    };

    try {
      const createdCategory = await createSingleCategory(locationId, categoryData);
      navigate(`/categories/${createdCategory.id}/posts/add/multiple`);
    } catch (err) {
      console.error('Error creating category:', err);
    }
  };

  const breadcrumbsItems = [
    { label: 'Home', path: '/' },
    { label: 'Post Ads', path: '/post-ads' },
    { label: `Location ID: ${locationId}`, path: `/add-multiple-category/${locationId}` },
  ];

  return (
    <>
      <PublisherHeader />
      <Container>
        <Breadcrumbs items={breadcrumbsItems} />
      </Container>
      <Container className="category-container">
        <h2 className="page-title">Select Category</h2>
        <div className="tree-view-container">
          <ul className="tree-view">
            {Object.keys(categories).map((postType) => (
              <li key={postType} className="post-type-item">
                <span className="post-type-name" onClick={() => toggleExpand(postType)}>
                  {expanded[postType] ? <FaChevronDown className="arrow-icon" /> : <FaChevronRight className="arrow-icon" />}
                  {postType}
                </span>
                {expanded[postType] && (
                  <Row className="category-list">
                    {categories[postType].map((category) => (
                      <Col key={category.id} lg={6} md={6} sm={6} className="category-item" onClick={() => handleCategoryClick(category.id)}>
                        <span className="square-bullet"></span> {category.name}
                      </Col>
                    ))}
                  </Row>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <FooterTop />
      <Footer />
    </>
  );
}

export default AddMultipleCategory;
