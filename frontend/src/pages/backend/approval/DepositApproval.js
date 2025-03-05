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

const fetchDeposits = async () => {
  const response = await axios.get('http://localhost:8000/api/deposit-approvals/', {
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

const approveDeposit = async (depositId) => {
  const response = await axios.post(
    'http://localhost:8000/api/deposit-approvals/',
    { id: depositId, is_verified: true },
    {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    }
  );
  return response.data;
};

const DepositApproval = () => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getDeposits = async () => {
      try {
        const depositsData = await fetchDeposits();
        setDeposits(depositsData);
      } catch (err) {
        setError('Failed to fetch deposits.');
      } finally {
        setLoading(false);
      }
    };

    getDeposits();
  }, []);

  const handleApprove = async (depositId) => {
    try {
      const data = await approveDeposit(depositId);
      alert(data.message); 
      setDeposits(deposits.filter((deposit) => deposit.id !== depositId)); 
      navigate('/'); // Navigate to the home page after approving the deposit
    } catch (err) {
      alert('Failed to approve deposit.');
    }
  };

  return (
    <div>
      <h2>Deposit Approval</h2>

      {loading && <Spinner animation="border" />}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && deposits.length === 0 && <Alert variant="info">No deposits to approve.</Alert>}

      {!loading && deposits.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Deposit Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {deposits.map((deposit, index) => (
              <tr key={deposit.id}>
                <td>{index + 1}</td>
                <td>{deposit.amount}</td>
                <td>{deposit.payment_method}</td>
                <td>{new Date(deposit.deposit_date).toLocaleString()}</td>
                <td>{deposit.is_verified ? 'Verified' : 'Pending'}</td>
                <td>
                  {!deposit.is_verified && (
                    <Button variant="success" onClick={() => handleApprove(deposit.id)}>
                      Approve
                    </Button>
                  )}
                  {deposit.is_verified && <span>Approved</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default DepositApproval;
