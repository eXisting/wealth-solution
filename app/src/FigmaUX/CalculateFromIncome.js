import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Box, Button } from '@mui/material';
import { currentDayFormatted, formatCurrency, totalEnabledYears, trimToInt } from './Global/Global';
import { totalSavingsPerContributions } from './Global/ChartsMath';
import { setSmallestCombination } from './Global/Math';
import NavigationHeaderComponent from './Components/NavigationHeaderComponent';

// Media
import money from '../Media/money.svg'
import donation from '../Media/donation.svg'

// Redux
import { 
  updateStartingSavings, 
  updateStartingAge,
} from '../redux/initialValuesReducer';

import {
  updateMonthlyContribution as updateFirstDecadeMonthlyContribution,
  updateAge as updateFirstDecadeAge,
  updateTotalDecadeSavings as updateFirstDecadeTotalSavings,
  savingsPercentage as updateFirstDecadePercentage,
  updateEnabled as updateFirstDecadeEnabled,
} from '../redux/decadeOneReducer';

import {
  updateMonthlyContribution as updateSecondDecadeMonthlyContribution,
  updateAge as updateSecondDecadeAge,
  updateTotalDecadeSavings as updateSecondDecadeTotalSavings,
  savingsPercentage as updateSecondDecadePercentage,
  updateEnabled as updateSecondDecadeEnabled,
} from '../redux/decadeTwoReducer';

import {
  updateMonthlyContribution as updateThirdDecadeMonthlyContribution,
  updateAge as updateThirdDecadeAge,
  updateTotalDecadeSavings as updateThirdDecadeTotalSavings,
  savingsPercentage as updateThirdDecadePercentage,
  updateEnabled as updateThirdDecadeEnabled,
} from '../redux/decadeThreeReducer';
import CircleSlider from './Components/CircleSlider';

const CalculateFromIncome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    startingSavings,
    startingAge,
    desiredResult
  } = useSelector((state) => state.initialPage);
  
  const decades = [
    {
      page: useSelector((state) => state.decadeOnePage),
    },
    {
      page: useSelector((state) => state.decadeTwoPage),
    },
    {
      page: useSelector((state) => state.decadeThreePage),
    },
  ];

  const updateFunctions = [
    {
      updateMonthlyContribution: updateFirstDecadeMonthlyContribution,
      updateAge: updateFirstDecadeAge,
      updateTotalDecadeSavings: updateFirstDecadeTotalSavings,
      updateEnabled: updateFirstDecadeEnabled,
    },
    {
      updateMonthlyContribution: updateSecondDecadeMonthlyContribution,
      updateAge: updateSecondDecadeAge,
      updateTotalDecadeSavings: updateSecondDecadeTotalSavings,
      updateEnabled: updateSecondDecadeEnabled,
    },
    {
      updateMonthlyContribution: updateThirdDecadeMonthlyContribution,
      updateAge: updateThirdDecadeAge,
      updateTotalDecadeSavings: updateThirdDecadeTotalSavings,
      updateEnabled: updateThirdDecadeEnabled,
    },
  ];

  function resetInitialData() {
    dispatch(updateStartingSavings(0));
    dispatch(updateStartingAge(25));
  };

  const updateDecadeYears = (stageIndex, newValue) => {
    dispatch(updateFunctions[stageIndex].updateAge(newValue));
  }

  const updateDecadeContributions = (stageIndex, newValue) => {
    dispatch(updateFunctions[stageIndex].updateMonthlyContribution(newValue));
  }

  function calculateTotal() {

    const interestEarned = 0;
    const sumContributions = 0;
    const sum = 0;

    return { sum, sumContributions, interestEarned };
  }

  const nextPage = () => {
    navigate(`/???`);
  };

  return (
    <Box gap={8}>
      <NavigationHeaderComponent></NavigationHeaderComponent>
      <Box sx={{ m: 2, justifyContent: 'flex-start' }}>
        <Typography variant="h5">Use Wealthometer to predict your wealth</Typography>
        <Typography variant="body2" sx={{ fontSize: 'var(--font-size-small)' }}>
          {currentDayFormatted()}
        </Typography>
      </Box>
      <CircleSlider min={0} max={20000} 
        initialValue={trimToInt(100)} 
        titleText={"Estimate your 10 year average income"}
        updateRedux={updateDecadeContributions} 
      />
      <CircleSlider min={0} max={100} 
        initialValue={trimToInt(15)} 
        titleText={"What % of your income can you save?"}
        updateRedux={updateDecadeContributions} 
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:"4rem", paddingBottom:"4rem", textAlign:"center" }}>
        <Box display="flex" flexDirection="row" gap={8}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <img src={money} alt="Total Interest Earned" width="100rem" />
            <Typography variant='body2'>You're saving each month</Typography>
            <Typography variant='body1' color={'#4A7DE2'}>{formatCurrency('$', false, calculateTotal().interestEarned)}?</Typography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <img src={donation} alt="Total Contributions" width="100rem" />
            <Typography variant='body2'>You're {} and already saved</Typography>
            <Typography variant='body1' color={'#4A7DE2'}>{
            formatCurrency('$', false, calculateTotal().sumContributions)}!</Typography>
          </Box>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
          <Button sx={{marginBottom:16, backgroundColor:'#F5A338', color:'white', borderRadius:'4rem', width:'30rem'}}>
            <Typography padding={4} variant='h5'>
              Let's save more
            </Typography>
          </Button>
        </Box>
    </Box>
  );
}

export default CalculateFromIncome;