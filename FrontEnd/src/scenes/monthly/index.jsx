import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, TextField, MenuItem, Typography } from '@mui/material';
import Header from "components/Header";

const PaymentPage = () => {
  const [amount, setAmount] = useState('');
  const [community, setCommunity] = useState('');
  const [checked, setChecked] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [communityAmount, setCommunityAmount] = useState({
    community1: 1000, // Sample initial amounts for each community
    community2: 1500,
    community3: 800,
    community4: 2000,
  });

  const handleAmountChange = (event) => {
    const enteredAmount = parseInt(event.target.value);
    if (enteredAmount > maxBorrowableAmount) {
      // Display prompt if the entered amount exceeds the max borrowable amount
      alert(`You can withdraw up to ${maxBorrowableAmount} only.`);
      setAmount('');
    } else {
      setAmount(enteredAmount.toString());
    }
  };

  const handleCommunityChange = (event) => {
    const selectedCommunity = event.target.value;
    setCommunity(selectedCommunity);
    // Clear the amount when the community is changed
    setAmount('');
  };

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleBorrow = () => {
    // Check if amount is entered, checkbox is checked, and community is selected
    if (amount && checked && community) {
      // Handle borrowing logic here
      console.log('Borrowing Amount:', amount);
      console.log('From Community:', community);
      
      // Set borrowing success state to true
      setPaymentSuccess(true);
    } else {
      alert('Please enter amount, select a community, and check the checkbox to proceed with borrowing.');
    }
  };

  // Calculate max borrowable amount (75% of the amount available in the selected community)
  const maxBorrowableAmount = Math.min(communityAmount[community] * 0.75, communityAmount[community]);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Borrow" />
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
            Request sent successfully!!!
          </Typography>
        ) : (
          <>
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
              <MenuItem value="">Select Community</MenuItem>
              <MenuItem value="community1">EXCS</MenuItem>
              <MenuItem value="community2">India</MenuItem>
              <MenuItem value="community3">Student</MenuItem>
              <MenuItem value="community4">UniAcco</MenuItem>
            </TextField>

            {community && ( // Render only if a community is selected
              <>
                {/* Available Amount */}
                <Typography variant="body1" align="center">
                  Available Amount: {communityAmount[community]}
                </Typography>

                {/* Max Borrowable Amount */}
                <Typography variant="body1" align="center">
                  Max Borrowable Amount: {maxBorrowableAmount}
                </Typography>
              </>
            )}

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
              inputProps={{ min: 1, max: maxBorrowableAmount }} // Set max borrowable amount
            />

            {/* Checkbox */}
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
              label="I have read all the community guidelines"
              style={{ alignSelf: 'center' }}
            />

            {/* Borrow Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleBorrow}
              size="large"
              disabled={!amount || !checked || !community} // Disable button if amount, checkbox, or community is not filled
            >
              Borrow
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default PaymentPage;
