import React, { useState } from "react";
import { FormControl, MenuItem, InputLabel, Box, Select } from "@mui/material";
import Header from "components/Header";
import OverviewChart from "components/OverviewChart";

const Overview = () => {
  const [view, setView] = useState("units");

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="OVERVIEW"
        subtitle="Overview of general varience in funds"
      />
      <Box height="65vh">
        <FormControl sx={{ mt: "1rem", width:'15rem' }}>
          <InputLabel sx={{ width: '150rem' }}>Communities</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
            MenuProps={{ PaperProps: { sx: { maxHeight: '300px' } } }} // Adjust maxHeight as needed
          >
            <MenuItem value="sales">EXCS</MenuItem>
            <MenuItem value="units">UniAcco</MenuItem>
            <MenuItem value="units">India</MenuItem>
            <MenuItem value="units">Student</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} />
      </Box>
    </Box>
  );
};

export default Overview;
