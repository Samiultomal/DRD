import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCountriesByContinent, fetchRegionsByCountry, createSingleLocation } from '../../../api/SingleLocationApi';
import PublisherHeader from '../../../components/header_component/PublisherHeader';
import Footer from '../../../components/footer_component/Footer';
import FooterTop from '../../../components/footer_component/FooterTop';
import Breadcrumbs from '../../../components/Breadcrumbs'; // Import Breadcrumbs component
import { Container } from 'react-bootstrap';
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import '../../../styles/post/AddSingleLocation.css';

function AddMultipleLocation() {
  const [continents] = useState([
    { code: 'NA', name: 'United States' },
    { code: 'LAC', name: 'Latin America and Caribbean' },
    { code: 'CA', name: 'Canada' },
    { code: 'EU', name: 'Europe' },
    { code: 'AS', name: 'Asia' },
    { code: 'AUO', name: 'Australia and Oceania' },
    { code: 'AF', name: 'Africa' }
  ]);

  const [countries, setCountries] = useState({});
  const [regions, setRegions] = useState({});
  const [expanded, setExpanded] = useState({});
  const navigate = useNavigate();

  const breadcrumbsItems = [
    { label: 'Home', path: '/' },
    { label: 'Post Ads', path: '/post-ads' },
    { label: 'Choose Location', path: '/add-multiple-location' },
  ];

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Fetch and sort countries alphabetically
  const handleContinentClick = async (continentCode) => {
    toggleExpand(continentCode);
    if (!countries[continentCode]) {
      try {
        let countriesData = await fetchCountriesByContinent(continentCode);
        countriesData = countriesData.sort((a, b) => a.name.localeCompare(b.name)); // Sort A-Z
        setCountries((prev) => ({ ...prev, [continentCode]: countriesData }));
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Fetch and sort regions alphabetically
  const handleCountryClick = async (continentCode, countryId) => {
    toggleExpand(countryId);
    if (!regions[countryId]) {
      try {
        let regionsData = await fetchRegionsByCountry(countryId);
        regionsData = regionsData.sort((a, b) => a.name.localeCompare(b.name)); // Sort A-Z
        setRegions((prev) => ({ ...prev, [countryId]: regionsData }));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleRegionClick = async (countryId, regionId) => {
    const locationData = { country: countryId, region: regionId };
    try {
      const createdLocation = await createSingleLocation(locationData);
      navigate(`/add-multiple-location/${createdLocation.id}`);
    } catch (err) {
      console.error("Failed to create the location:", err);
    }
  };

  return (
    <>
      <PublisherHeader />

      {/* Breadcrumbs */}
      <Container>
        <Breadcrumbs items={breadcrumbsItems} />
      </Container>

      <Container className="single-location-container">
        <h2 className="page-title">Choose Any One</h2>
        <div className="tree-view-container">
          <ul className="tree-view">
            {continents.map((continent) => (
              <li key={continent.code} className="continent-item">
                <span className="continent-name" onClick={() => handleContinentClick(continent.code)}>
                  {expanded[continent.code] ? <FaChevronDown /> : <FaChevronRight />} 
                  {continent.name}
                </span>
                {expanded[continent.code] && countries[continent.code] && (
                  <ul className="country-list">
                    {countries[continent.code].map((country) => (
                      <li key={country.id} className="country-item">
                        <span className="location-country-name" onClick={() => handleCountryClick(continent.code, country.id)}>
                          {country.name}
                        </span>
                        {expanded[country.id] && regions[country.id] && (
                          <ul className="region-list">
                            {regions[country.id].map((region) => (
                              <li
                                key={region.id}
                                className="region-item"
                                onClick={() => handleRegionClick(country.id, region.id)}
                                style={{ display: 'flex', alignItems: 'center' }}
                              >
                                <span>{region.name}</span>
                                <span style={{ marginLeft: '10px' }}>$0.50</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
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

export default AddMultipleLocation;
