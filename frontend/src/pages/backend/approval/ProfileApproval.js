import React, { useEffect, useState } from 'react';
import { Table, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const getToken = () => {
  const userData = localStorage.getItem('userData');
  if (userData) {
    const { accessToken } = JSON.parse(userData);
    return accessToken;
  }
  return null;
};

const fetchProfiles = async () => {
  const response = await axios.get('http://localhost:8000/api/publisher-profile-approvals/', {
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

const approveProfile = async (profileId) => {
  const response = await axios.post(
    'http://localhost:8000/api/publisher-profile-approvals/',
    { id: profileId, is_verified: true },
    {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    }
  );
  return response.data;
};

const ProfileApproval = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfiles = async () => {
      try {
        const profilesData = await fetchProfiles();
        setProfiles(profilesData);
      } catch (err) {
        setError('Failed to fetch profiles.');
      } finally {
        setLoading(false);
      }
    };

    getProfiles();
  }, []);

  const handleApprove = async (profileId) => {
    try {
      const data = await approveProfile(profileId);
      alert(data.message);
      setProfiles(profiles.filter((profile) => profile.id !== profileId));
      
      // Navigate to the home page after approval
      navigate('/');
    } catch (err) {
      alert('Failed to approve profile.');
    }
  };

  return (
    <div>
      <h2>Profile Approval</h2>

      {loading && <Spinner animation="border" />}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && profiles.length === 0 && <Alert variant="info">No profiles to approve.</Alert>}

      {!loading && profiles.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>NID Frontpage</th>
              <th>NID Backpage</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile, index) => (
              <tr key={profile.id}>
                <td>{index + 1}</td>
                <td>{profile.user.username}</td>
                <td>
                  <img src={`http://localhost:8000${profile.nid_frontpage}`} alt="NID Front" width="100" />
                </td>
                <td>
                  <img src={`http://localhost:8000${profile.nid_backpage}`} alt="NID Back" width="100" />
                </td>
                <td>{profile.is_verified ? 'Verified' : 'Pending'}</td>
                <td>
                  {!profile.is_verified && (
                    <Button variant="success" onClick={() => handleApprove(profile.id)}>
                      Approve
                    </Button>
                  )}
                  {profile.is_verified && <span>Approved</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ProfileApproval;
