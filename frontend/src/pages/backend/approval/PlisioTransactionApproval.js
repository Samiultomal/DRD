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

const fetchTransactions = async () => {
  const response = await axios.get('http://localhost:8000/api/plisio-transaction-approvals/', {
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

const approveTransaction = async (transactionId) => {
  const response = await axios.post(
    'http://localhost:8000/api/plisio-transaction-approvals/',
    { id: transactionId, is_verified: true },
    {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    }
  );
  return response.data;
};

const PlisioTransactionApproval = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const transactionsData = await fetchTransactions();
        setTransactions(transactionsData);
      } catch (err) {
        setError('Failed to fetch transactions.');
      } finally {
        setLoading(false);
      }
    };

    getTransactions();
  }, []);

  const handleApprove = async (transactionId) => {
    try {
      const data = await approveTransaction(transactionId);
      alert(data.message);
      setTransactions(transactions.filter((transaction) => transaction.id !== transactionId));
      navigate('/');
    } catch (err) {
      alert('Failed to approve transaction.');
    }
  };

  return (
    <div>
      <h2>Plisio Transaction Approval</h2>

      {loading && <Spinner animation="border" />}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && transactions.length === 0 && (
        <Alert variant="info">No transactions to approve.</Alert>
      )}

      {!loading && transactions.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Wallet ID</th>
              <th>Amount</th>
              <th>Crypto Currency</th>
              <th>Transaction ID</th>
              <th>Transaction Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.id}>
                <td>{index + 1}</td>
                <td>{transaction.wallet_id}</td>
                <td>{transaction.order_number}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.crypto_currency}</td>
                <td>{new Date(transaction.created_at).toLocaleString()}</td>
                <td>
                  {!transaction.is_verified ? (
                    <Button variant="success" onClick={() => handleApprove(transaction.id)}>
                      Approve
                    </Button>
                  ) : (
                    <span>Approved</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default PlisioTransactionApproval;
