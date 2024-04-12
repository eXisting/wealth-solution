import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const NavigationHeaderComponent = () => {
  const navigate = useNavigate();

  return (
    <Box backgroundColor="#111111">
      <Box style={{ padding: '2vh', gap:'1rem' }} textAlign={'center'}>
        <Typography variant="h2" color={"white"}>
          Wealth website
        </Typography>
        <Button
          variant="contained"
          sx={{ minWidth: 'unset', height: '3rem', backgroundColor: '#4A7DE2' }}
          onClick={() => navigate('/fromTotalSavings')}
        >
          From Total
        </Button>
        <Button
          variant="contained"
          sx={{ minWidth: 'unset', height: '3rem', backgroundColor: '#4A7DE2' }}
          onClick={() => navigate('/')}
        >
          Wealthometer
        </Button>
        <Button
          variant="contained"
          sx={{ minWidth: 'unset', height: '3rem', backgroundColor: '#4A7DE2' }}
          onClick={() => navigate('fromIncome')}
        >
          From Income
        </Button>
      </Box>
    </Box>
  );
};

export default NavigationHeaderComponent;