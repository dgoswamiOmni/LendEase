import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, TextField, MenuItem, Typography } from '@mui/material';
import Header from "components/Header";



const PaymentPage = () => {
  const [amount, setAmount] = useState('');
  const [community, setCommunity] = useState('');
  const [checked, setChecked] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleCommunityChange = (event) => {
    setCommunity(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  const handlePayment = () => {
    // Check if amount is entered and checkbox is checked
    if (amount && checked) {
      // Handle payment logic here
      console.log('Amount:', amount);
      console.log('Community:', community);
      
      // Set payment success state to true
      setPaymentSuccess(true);
    } else {
      alert('Please enter amount and check the checkbox to proceed with payment.');
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
    <Header
      title="Lend"
      subtitle="For the betterment of Society"
    />
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
          {/* Amount Textfield */}
          <TextField
            label="Amount"
            variant="outlined"
            value={amount}
            onChange={handleAmountChange}
            margin="normal"
            size="large"
            style={{ width: '300px' }}
            type="number"
            inputProps={{ min: 1 }}
          />

          {/* Community Dropdown */}
          <TextField
            select
            label="Community"
            variant="outlined"
            value={community}
            onChange={handleCommunityChange}
            margin="normal"
            size="large"
            style={{ width: '300px' }}
          >
            <MenuItem value="community1">EXCS</MenuItem>
            <MenuItem value="community2">India</MenuItem>
            <MenuItem value="community3">Student</MenuItem>
            <MenuItem value="community4">UniAcco</MenuItem>
            {/* Add more community options as needed */}
          </TextField>

          {/* Checkbox */}
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
            label="I have read all the community guidelines"
            style={{ alignSelf: 'center' }}
          />

          {/* Pay Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handlePayment}
            size="large"
            disabled={!amount || !checked} // Disable button if amount or checkbox is not filled
          >
            Pay
          </Button>
        </>
      )}
    </Box>
    </Box>
  );
};

export default PaymentPage;
