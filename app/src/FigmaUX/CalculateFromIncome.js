import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Button, useMediaQuery } from '@mui/material';
import { currentDayFormatted, formatCurrency, trimToInt } from './Global/Global';
import NavigationHeaderComponent from './Components/NavigationHeaderComponent';
import CircleSlider from './Components/CircleSlider';
import StagesProgressSection from './Components/StagesProgressSection';

// Media
import moneyBag from '../Media/moneyBag.svg'
import moneyBox from '../Media/moneyBox.svg'

// Redux
import {
  updateTotalDecadeSavings as updateFirstDecadeTotalSavings,
  updateDecadeIncome as updateFirstDecadeTotalIncome,
  updatePercents as updateFirstDecadePercentage,
  updateMonthlyContribution as updateFirstDecadeMonthlyContributions
} from '../redux/decadeOneReducer';

import {
  updateTotalDecadeSavings as updateSecondDecadeTotalSavings,
  updateDecadeIncome as updateSecondDecadeTotalIncome,
  updatePercents as updateSecondDecadePercentage,
  updateMonthlyContribution as updateSecondDecadeMonthlyContributions
} from '../redux/decadeTwoReducer';

import {
  updateTotalDecadeSavings as updateThirdDecadeTotalSavings,
  updateDecadeIncome as updateThirdDecadeTotalIncome,
  updatePercents as updateThirdDecadePercentage,
  updateMonthlyContribution as updateThirdDecadeMonthlyContributions
} from '../redux/decadeThreeReducer';
import NavigationFooterComponent from './Components/NavigationFooterComponent';

const CalculateFromIncome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedDecade, setSelectedDecade] = useState(0);

  const isMobile = useMediaQuery('(max-width:744px)');
  const isTablet = useMediaQuery('(max-width:1224px)');

  const initialData = {
    startingSavings: 5000,
    startingAge: 25,
  };
  
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
      updateTotalDecadeSavings: updateFirstDecadeTotalSavings,
      updateDecadeIncome: updateFirstDecadeTotalIncome,
      updatePercents: updateFirstDecadePercentage,
      updateMonthlyContribution: updateFirstDecadeMonthlyContributions
    },
    {
      updateTotalDecadeSavings: updateSecondDecadeTotalSavings,
      updateDecadeIncome: updateSecondDecadeTotalIncome,
      updatePercents: updateSecondDecadePercentage,
      updateMonthlyContribution: updateSecondDecadeMonthlyContributions
    },
    {
      updateTotalDecadeSavings: updateThirdDecadeTotalSavings,
      updateDecadeIncome: updateThirdDecadeTotalIncome,
      updatePercents: updateThirdDecadePercentage,
      updateMonthlyContribution: updateThirdDecadeMonthlyContributions
    },
  ];

  useEffect(() => {
    updateView(selectedDecade);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decades[selectedDecade].page.decadeIncome, decades[selectedDecade].page.savingsPercentage]);


  function updateView(decadeIndex) {
    setSelectedDecade(decadeIndex);

    const totalSavings = decadeIndex === 0 ? 0 : decades[decadeIndex - 1].page.totalDecadeSavings;

    const decade = decades[decadeIndex].page;

    calculateSavings(trimToInt(totalSavings), trimToInt(decade.decadeIncome), trimToInt(decade.savingsPercentage));
  }

  const calculateSavings = (totalSavings, decadeIncome, savingsPercentage) => {
    const contribution = Math.round(decadeIncome * (parseFloat(savingsPercentage) / 100) / 12);
    dispatch(updateFunctions[selectedDecade].updateMonthlyContribution(contribution));
  
    if (totalSavings === 0 && contribution === 0) {
      dispatch(updateFunctions[selectedDecade].updateTotalDecadeSavings(0));
      return;
    }
  
    const r = parseFloat(10) / 100;
    const n = 12;
    
    const t = 10;
    
    const P = parseFloat(trimToInt(totalSavings));
  
    const futureValue = P * Math.pow(1 + (r / n), n * t) + contribution * ((Math.pow(1 + (r / n), n * t) - 1) / (r / n));
  
    const saved = Math.round(futureValue).toLocaleString();
    dispatch(updateFunctions[selectedDecade].updateTotalDecadeSavings(saved));
  };

  function selectedDecadeAgeRange() {
    const lowerBracketYears = selectedDecade * 10 + initialData.startingAge;
    const upperBracketYears = lowerBracketYears + 10;

    return { lowerBracketYears, upperBracketYears };
  }

  const updateDecadeIncomeValue = value => {
    dispatch(updateFunctions[selectedDecade].updateDecadeIncome(value));
  };

  const updateDecadePercentSavings = value => {
    dispatch(updateFunctions[selectedDecade].updatePercents(value));
  };

  function calculateTotal() {
    const sum = decades[selectedDecade].page.totalDecadeSavings;
    const sumContributions = decades[selectedDecade].page.monthlyContribution;
    const interestEarned = sum - sumContributions;

    return { sum, sumContributions, interestEarned };
  }

  return (
    <>
      <NavigationHeaderComponent isMobile={isMobile} isTablet={isTablet}></NavigationHeaderComponent>
      <Box gap={8}>
        <Box sx={{ m: 2, justifyContent: 'flex-start' }}>
          <Typography variant="h5">Calculate from your income</Typography>
          <Typography variant="body2" sx={{ fontSize: 'var(--font-size-small)' }}>
            {currentDayFormatted()}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="flex-start" sx={{ m: 2, mt: 8 }}>
          <StagesProgressSection stageSelected={updateView} selectedStage={selectedDecade}></StagesProgressSection>
          <Box display="flex" alignItems="center" sx={{ m: 2, gap: 16, mt:8, ml:4 }}>
            <Typography variant="h5" color={'#4A7DE2'}>Your savings between age {selectedDecadeAgeRange().lowerBracketYears} and {selectedDecadeAgeRange().upperBracketYears}</Typography>
          </Box>
        </Box>
        <CircleSlider min={10000} max={1000000} 
          step={1000}
          initialValue={trimToInt(decades[selectedDecade].page.decadeIncome)} 
          titleText={"Estimate your 10 year average income"}
          updateRedux={updateDecadeIncomeValue} 
        />
        <CircleSlider min={0} max={100} 
          sign='%'
          step={1}
          initialValue={trimToInt(decades[selectedDecade].page.savingsPercentage)} 
          titleText={"What % of your income can you save?"}
          updateRedux={updateDecadePercentSavings} 
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:"4rem", paddingBottom:"4rem", textAlign:"center" }}>
          <Box display="flex" flexDirection="row" gap={8}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <img src={moneyBag} alt="Total Interest Earned" width="100rem" />
              <Typography variant='body2'>You're saving each month</Typography>
              <Typography variant='body1' color={'#4A7DE2'}>{formatCurrency('$', false, calculateTotal().sumContributions)}?</Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <img src={moneyBox} alt="Total Contributions" width="100rem" />
              <Typography variant='body2'>You're {selectedDecadeAgeRange().upperBracketYears} and already saved</Typography>
              <Typography variant='body1' color={'#4A7DE2'}>{
              formatCurrency('$', false, calculateTotal().sum)}!</Typography>
            </Box>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
            <Button variant="contained" sx={{marginBottom:16, backgroundColor:'#F5A338', color:'white', borderRadius:'4rem', width:'30rem',
            '&:hover': {
              backgroundColor: 'black',
            }}}>
              <Typography padding={2} variant='h5'>
                Let's save more
              </Typography>
            </Button>
          </Box>
      </Box>
      <NavigationFooterComponent isMobile={isMobile} isTablet={isTablet}></NavigationFooterComponent>
    </>
  );
}

export default CalculateFromIncome;