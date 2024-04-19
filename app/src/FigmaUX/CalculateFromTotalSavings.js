import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Box, useMediaQuery } from '@mui/material';
import StageSection from './Components/StageSection';
import StartingAmountSelection from './Components/StartingAmountSelection';
import { currentDayFormatted, formatCurrency, totalEnabledYears } from './Global/Global';
import TargetButtonsGroup from './Components/TargetButtonsGroup';
import CurvedLineChartComponent from './Components/CurvedLineChartComponent';
import PieChartComponent from './Components/PieChartComponent';
import DashedSlider from './Components/DashedSlider';
import { totalSavingsPerContributions } from './Global/ChartsMath';
import { setSmallestCombination } from './Global/Math';
import NavigationHeaderComponent from './Components/NavigationHeaderComponent';
import NavigationFooterComponent from './Components/NavigationFooterComponent';

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
import { buildFontSizeCssString, buildSpaceSizeCssString } from './Global/CssStrings';

const CalculateFromTotalSavings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMobile = useMediaQuery('(max-width:744px)');
  const isTablet = useMediaQuery('(max-width:1224px)');

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

  const allDecadesDisabled = decades.every((decade) => !decade.page.enabled);

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
    
    const noSavingStages = allDecadesDisabled;
    const sumContributions = contributionsTotal1 + contributionsTotal2 + contributionsTotal3;

    if (noSavingStages) {
      total3 = startingSavings;
    }

    const interestEarned = noSavingStages ? 0 : total3 - sumContributions;

    const sum = total3;

    return { sum, sumContributions, interestEarned };
  }

  const nextPage = () => {
    navigate(`/???`);
  };

  return (
    <>
      <NavigationHeaderComponent isMobile={isMobile} isTablet={isTablet}></NavigationHeaderComponent>
      <Box display="flex" flexDirection="column" paddingLeft={buildSpaceSizeCssString('regular', isMobile, isTablet)}
        marginTop={buildSpaceSizeCssString('small', isMobile, isTablet)}
      >
        <Box display="flex" flexDirection="column" gap={buildSpaceSizeCssString('small', isMobile, isTablet)} 
          marginBottom={isMobile ? '65px' : isTablet ? '85px' : '90px'}>
          <Typography className='montserrat-bold' fontSize={isMobile ? '28px' : isTablet ? '38px' : '52px'}>
              Use Wealthometer to predict your wealth
          </Typography>
          <Typography 
            className='montserrat-medium'
            fontSize={
              isMobile ? buildFontSizeCssString('regular', isMobile, isTablet) :
              isTablet ? buildFontSizeCssString('small', isMobile, isTablet) : buildFontSizeCssString('tiny', isMobile, isTablet)}
          >
            {currentDayFormatted()}
          </Typography>
        </Box>
        <Box gap={2} sx={{ m:4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Grid container direction='column' gap={2} alignItems="center">
            <Typography variant="h5">Starting amount</Typography>
            <StartingAmountSelection onUpdateStartingSavings={handleUpdateStartingSavings}/>
            <DashedSlider
              min={5000}
              max={20000}
              reduxValue={startingSavings}
              updateRedux={handleUpdateStartingSavings}
            />
          </Grid>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} gap={4}>
            <Typography variant="h5" marginBottom={2}>Your current age</Typography>
            <DashedSlider
              min={12}
              max={50}
              reduxValue={startingAge}
              updateRedux={handleUpdateStartingAge}
            />
            {/* <CircleSlider min={12} max={55} initialValue={startingAge}></CircleSlider> */}
            <Typography variant="h5" marginTop={4}>How much money do you want?</Typography>
            <TargetButtonsGroup 
              desiredResult={desiredResult} 
              reduxUpdate={handleUpdateDesiredResult}
            />
          </Box>
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6">
              Your savings plan is divided <br />  
            </Typography>
            <Typography variant="h6">
              into <span style={{ color: '#33CBCC' }}>three stages.</span>
            </Typography>
            <Typography variant="body1" marginTop={2}>
              As you make more money you save more
            </Typography>
            <Typography variant="body1">
              money in each stage.
            </Typography>
          </Box>
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
        <Box gap={4} sx={{ m:4, marginTop:8, display: 'flex', flexDirection: 'column' }}>
          <StageSection
            stageIndex={0}
            stageNameText="Stage One"
            ageRangeText="Your stage one age range"
            minSliderValue={5000}
            maxSliderValue={20000}
            isEnabled={decades[0].page.enabled}
            startingYears={startingAge}
            years={decades[0].page.age}
            contributions={decades[0].page.monthlyContribution}
            reduxUpdateEnabled={updateDecadeEnabled}
            reduxUpdateYears={updateDecadeYears}
            reduxUpdateContributions={updateDecadeContributions}
          />
          <StageSection
            stageIndex={1}
            stageNameText="Stage Two"
            ageRangeText="Your stage two age range"
            minSliderValue={6000}
            maxSliderValue={25000}
            isEnabled={decades[1].page.enabled}
            startingYears={startingAge + decades[0].page.age}
            years={decades[1].page.age}
            contributions={decades[1].page.monthlyContribution}
            reduxUpdateEnabled={updateDecadeEnabled}
            reduxUpdateYears={updateDecadeYears}
            reduxUpdateContributions={updateDecadeContributions}
          />
          <StageSection
            stageIndex={2}
            stageNameText="Stage Three"
            ageRangeText="Your stage three age range"
            minSliderValue={6000}
            maxSliderValue={25000}
            isEnabled={decades[2].page.enabled}
            startingYears={startingAge + decades[0].page.age + decades[1].page.age}
            years={decades[2].page.age}
            contributions={decades[2].page.monthlyContribution}
            reduxUpdateEnabled={updateDecadeEnabled}
            reduxUpdateYears={updateDecadeYears}
            reduxUpdateContributions={updateDecadeContributions}
          />
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
        {!allDecadesDisabled && (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30rem', margin: '2rem', marginTop: '4rem' }}>
              <CurvedLineChartComponent />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30rem', margin: '2rem' }}>
              <PieChartComponent />
            </div>
          </>
          )}
      </Box>
      <NavigationFooterComponent isMobile={isMobile} isTablet={isTablet}></NavigationFooterComponent>
    </>
  );
}

export default CalculateFromTotalSavings;