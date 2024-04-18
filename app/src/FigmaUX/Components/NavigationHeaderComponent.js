import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const NavigationHeaderComponent = ({margin}) => {
  const navigate = useNavigate();

  return (
    <Box backgroundColor="#111111" padding={2} marginTop={margin} marginLeft={margin} marginRight={margin}>
      <Box textAlign={'center'}>
        <Typography variant="h2" color={"white"}>
          Wealth website
        </Typography>
        <Button
          variant="contained"
          sx={{ minWidth: 'unset', height: '3rem', backgroundColor: '#4A7DE2', m:2 }}
          onClick={() => navigate('/fromTotalSavings')}
        >
          From Total
        </Button>
        <Button
          variant="contained"
          sx={{ minWidth: 'unset', height: '3rem', backgroundColor: '#4A7DE2', m:2 }}
          onClick={() => navigate('/')}
        >
          Wealthometer
        </Button>
        <Button
          variant="contained"
          sx={{ minWidth: 'unset', height: '3rem', backgroundColor: '#4A7DE2', m:2 }}
          onClick={() => navigate('/fromIncome')}
        >
          From Income
        </Button>
      </Box>
    </Box>
  );
};

export default NavigationHeaderComponent;