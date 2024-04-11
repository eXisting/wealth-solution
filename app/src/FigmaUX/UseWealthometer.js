import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Box } from '@mui/material';
import StageSection from './StageSection';
import StartingAmountSelection from './Components/StartingAmountSelection';
import { currentDayFormatted, formatCurrency, totalEnabledYears } from './Global/Global';

// Media
import money from '../Media/money.svg'
import donation from '../Media/donation.svg'

// Redux
import { 
  updateStartingSavings, 
  updateStartingAge,
  updateDesiredResult,
} from '../redux/initialValuesReducer';

import {
  updateMonthlyContribution as updateFirstDecadeMonthlyContribution,
  updateAge as updateFirstDecadeAge,
  updateTotalDecadeSavings as updateFirstDecadeTotalSavings,
  updateEnabled as updateFirstDecadeEnabled,
} from '../redux/decadeOneReducer';

import {
  updateMonthlyContribution as updateSecondDecadeMonthlyContribution,
  updateAge as updateSecondDecadeAge,
  updateTotalDecadeSavings as updateSecondDecadeTotalSavings,
  updateEnabled as updateSecondDecadeEnabled,
} from '../redux/decadeTwoReducer';

import {
  updateMonthlyContribution as updateThirdDecadeMonthlyContribution,
  updateAge as updateThirdDecadeAge,
  updateTotalDecadeSavings as updateThirdDecadeTotalSavings,
  updateEnabled as updateThirdDecadeEnabled,
} from '../redux/decadeThreeReducer';

import TargetButtonsGroup from './Components/TargetButtonsGroup';
import CurvedLineChartComponent from './Components/CurvedLineChartComponent';
import PieChartComponent from './Components/PieChartComponent';
import DashedSlider from './Components/DashedSlider';
import { totalSavingsPerContributions } from './Global/ChartsMath';
import { setSmallestCombination } from './Global/Math';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

const UseWealthometer = () => {
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

  const handleUpdateStartingSavings = (newValue) => {
    dispatch(updateStartingSavings(newValue));
  };

  const handleUpdateStartingAge = (newValue) => {
    dispatch(updateStartingAge(newValue));
  };

  const handleUpdateDesiredResult = (newValue) => {
    dispatch(updateDesiredResult(newValue));
    const [stage1, stage2, stage3] = setSmallestCombination(newValue, startingSavings, 
      decades[0].page.enabled, decades[1].page.enabled, decades[2].page.enabled);

      // console.log("Stage 1 - Age:", stage1.age, "Contribution:", stage1.contribution);
      // console.log("Stage 2 - Age:", stage2.age, "Contribution:", stage2.contribution);
      // console.log("Stage 3 - Age:", stage3.age, "Contribution:", stage3.contribution);
      
      dispatch(updateFirstDecadeAge(stage1.age));
      dispatch(updateFirstDecadeMonthlyContribution(stage1.contribution));
      dispatch(updateSecondDecadeAge(stage2.age));
      dispatch(updateSecondDecadeMonthlyContribution(stage2.contribution));
      dispatch(updateThirdDecadeAge(stage3.age));
      dispatch(updateThirdDecadeMonthlyContribution(stage3.contribution));
  };

  const updateDecadeEnabled = (stageIndex, newValue) => {
    if (newValue === false) {
      updateDecadeYears(stageIndex, 0);
      updateDecadeContributions(stageIndex, 0);
    }

    dispatch(updateFunctions[stageIndex].updateEnabled(newValue));
  }

  const updateDecadeYears = (stageIndex, newValue) => {
    dispatch(updateFunctions[stageIndex].updateAge(newValue));
  }

  const updateDecadeContributions = (stageIndex, newValue) => {
    dispatch(updateFunctions[stageIndex].updateMonthlyContribution(newValue));
  }

  function calculateTotal() {
    const contributions = [
      !decades[0].page.enabled ? 0 : decades[0].page.monthlyContribution,
      !decades[1].page.enabled ? 0 : decades[1].page.monthlyContribution,
      !decades[2].page.enabled ? 0 : decades[2].page.monthlyContribution,
    ];
    
    const years = [
      !decades[0].page.enabled ? 0 : decades[0].page.age === 0 ? 1 : decades[0].page.age,
      !decades[1].page.enabled ? 0 : decades[1].page.age === 0 ? 1 : decades[1].page.age,
      !decades[2].page.enabled ? 0 : decades[2].page.age === 0 ? 1 : decades[2].page.age,
    ];

    const total = totalSavingsPerContributions(startingAge, years[0], years[1], years[2], startingSavings, 
      contributions[0], contributions[1], contributions[2]);
    
    let [
      { total1, contributionsTotal1 },
      { total2, contributionsTotal2 },
      { total3, contributionsTotal3 },
    ] = total;
    
    const sumContributions = contributionsTotal1 + contributionsTotal2 + contributionsTotal3;

    const interestEarned = total3 - sumContributions;

    const sum = total3;

    return { sum, sumContributions, interestEarned };
  }

  const nextPage = () => {
    navigate(`/???`);
  };

  return (
    <Box gap={8}>
      <Box sx={{ m: 2, justifyContent: 'flex-start' }}>
        <Typography variant="h5">Use Wealthometer to predict your wealth</Typography>
        <Typography variant="body2" sx={{ fontSize: 'var(--font-size-small)' }}>
          {currentDayFormatted()}
        </Typography>
      </Box>
      <Box sx={{justifyContent:"center"}}>
        {/* IMPLEMENT new item here */}
        <Grid container alignItems="center">
            <Grid item>
              <Button
                onClick={() => {}}>
                <span style={{ fontSize: "2.5vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  -
                </span>
              </Button>
            </Grid>
            <Grid item>
              Monthly Savings
            </Grid>
            <Grid item>
              <Button
                onClick={() => {}}>
                <span style={{ fontSize: "2.5vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  +
                </span>
              </Button>
            </Grid>
          </Grid>
      </Box>
      <Box className="section padded-section" display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ m: 2, marginTop: 8}}>
        <Box>
          <Typography variant="h5" style={{ fontFamily: 'Montserrat, sans-serif', textAlign: 'center', marginBottom:4 }}>
            Your investment will<br /> be worth
          </Typography>
          <Typography variant="h2" style={{ fontFamily: 'Poppins, sans-serif', textAlign: 'center', color:'#4A7DE2' }}>
            {formatCurrency('$', false, calculateTotal().sum)}
          </Typography>
        </Box>
        <Typography variant="body2" style={{ fontFamily: 'Montserrat, sans-serif', textAlign: 'center' }}>(over {
          totalEnabledYears(decades[0].page.age, decades[1].page.age, decades[2].page.age, 
            decades[0].page.enabled, decades[1].page.enabled, decades[2].page.enabled)
        } years)</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:"4rem", paddingBottom:"4rem" }}>
        <Box display="flex" flexDirection="row" gap={8}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <img src={money} alt="Total Interest Earned" width="100rem" />
            <Typography variant='body2'>Total Interest Earned</Typography>
            <Typography variant='body1' color={'#4A7DE2'}>{formatCurrency('$', false, calculateTotal().interestEarned)}</Typography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <img src={donation} alt="Total Contributions" width="100rem" />
            <Typography variant='body2'>Total Contributions</Typography>
            <Typography variant='body1' color={'#4A7DE2'}>{
            formatCurrency('$', false, calculateTotal().sumContributions)}</Typography>
          </Box>
        </Box>
      </Box>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30rem', margin: '2rem', marginTop: '4rem' }}>
        <CurvedLineChartComponent />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30rem', margin: '2rem' }}>
        <PieChartComponent />
      </div>
    </Box>
  );
}

export default UseWealthometer;