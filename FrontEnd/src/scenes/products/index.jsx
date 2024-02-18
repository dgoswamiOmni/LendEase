import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import Header from "components/Header";

const RepayPage = () => {
  const [repaymentAmount, setRepaymentAmount] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [borrowedAmounts, setBorrowedAmounts] = useState({
    EXCS: 500,
    UniAcco: 1000,
    India: 750,
  });

  useEffect(() => {
    if (paymentSuccess) {
      const timer = setTimeout(() => {
        setPaymentSuccess(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [paymentSuccess]);

  const handleCardClick = (community) => {
    setSelectedCommunity(community);
  };

  const handleRepaymentAmountChange = (event) => {
    setRepaymentAmount(parseInt(event.target.value));
  };

  const handlePay = () => {
    // Perform payment logic here
    console.log('Payment Successful!');
    setPaymentSuccess(true);
    // Adjust the borrowed amount
    const updatedAmounts = { ...borrowedAmounts };
    updatedAmounts[selectedCommunity] -= repaymentAmount;
    setBorrowedAmounts(updatedAmounts);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Repay" />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        gap="20px"
      >
        {paymentSuccess ? (
          <Typography variant="h2" align="center">
            Payment Successful!!!
          </Typography>
        ) : (
          <>
            <Typography variant="h4" align="center" gutterBottom>
              Repay from Borrowed Communities
            </Typography>
            <Box display="flex" flexWrap="wrap" justifyContent="center">
              {Object.keys(borrowedAmounts).map((community) => (
                <Card key={community} sx={{ width: 300, height: 150, margin: '10px', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} onClick={() => handleCardClick(community)}>
                  <CardContent>
                    <Typography variant="h6" align="center">{community}</Typography>
                    <Typography variant="body1" align="center">Borrowed Amount: {borrowedAmounts[community]}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
            {selectedCommunity && (
              <>
                <Typography variant="h6" align="center" mt={2}>
                  Amount Due from {selectedCommunity}: {borrowedAmounts[selectedCommunity]}
                </Typography>
                <TextField
                  label="Repayment Amount"
                  variant="outlined"
                  value={repaymentAmount}
                  onChange={handleRepaymentAmountChange}
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: borrowedAmounts[selectedCommunity] } }}
                  style={{ width: '300px', marginBottom: '20px' }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePay}
                  disabled={repaymentAmount <= 0 || repaymentAmount > borrowedAmounts[selectedCommunity]}
                  size="large"
                >
                  Pay
                </Button>
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default RepayPage;
