import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { createDeposit } from '../../../api/DepositApi';

const CreateDeposit = () => {
    const [amount, setAmount] = useState('');
    const [currencyType, setCurrencyType] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!amount || parseFloat(amount) < 20) {
            setError('The minimum deposit amount is $20.');
            setLoading(false);
            return;
        }

        if (!currencyType) {
            setError('Please select a currency type.');
            setLoading(false);
            return;
        }

        const depositData = {
            amount: parseFloat(amount),
            currency_type: currencyType,
        };

        try {
            const response = await createDeposit(depositData);
            const invoiceUrl = response.invoice_url;  
            window.location.href = invoiceUrl; 
        } catch (err) {
            setError(err.detail || 'Failed to create deposit.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Create Deposit</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="amount" className="mb-3">
                    <Form.Label>Deposit Amount</Form.Label>
                    <Form.Control
                        type="number"
                        min="20"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="currencyType" className="mb-3">
                    <Form.Label>Currency Type</Form.Label>
                    <Form.Control
                        as="select"
                        value={currencyType}
                        onChange={(e) => setCurrencyType(e.target.value)}
                        required
                    >
                        <option value="">Select Currency Type</option>
                        <option value="DOGE">DOGE</option>
                        <option value="BTC">BTC</option>
                        <option value="LTC">LTC</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? (
                        <>
                            <Spinner animation="border" size="sm" /> Processing...
                        </>
                    ) : (
                        'Create Deposit'
                    )}
                </Button>
            </Form>
        </div>
    );
};

export default CreateDeposit;
