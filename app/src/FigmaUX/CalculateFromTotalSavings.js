import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { batch } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Box, useMediaQuery } from '@mui/material';
import StageSection from './Components/StageSection';
import { calculateEndYear, currentDayFormatted, formatCurrency, totalEnabledYears } from './Global/Global';
import TargetButtonsGroup from './Components/TargetButtonsGroup';
import CurvedLineChartComponent from './Components/CurvedLineChartComponent';
import DoughnutChartComponent from './Components/DoughnutChartComponent';
import { totalSavingsPerContributions } from './Global/ChartsMath';
import { setSmallestCombination } from './Global/Math';
import NavigationHeaderComponent from './Components/NavigationHeaderComponent';
import NavigationFooterComponent from './Components/NavigationFooterComponent';
import InitialDataSectionComponent from './Components/InitialDataSectionComponent';
import { buildCalculatedCssString, buildFontSizeCssString, buildSpaceSizeCssString } from './Global/CssStrings';

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
    const [stage1, stage2, stage3] = setSmallestCombination(
      newValue,
      startingSavings,
      decades[0].page.enabled,
      decades[1].page.enabled,
      decades[2].page.enabled
    );

    const actions = [
      updateDesiredResult(newValue),
      updateFunctions[0].updateAge(stage1.age),
      updateFunctions[0].updateMonthlyContribution(stage1.contribution),
      updateFunctions[1].updateAge(stage2.age),
      updateFunctions[1].updateMonthlyContribution(stage2.contribution),
      updateFunctions[2].updateAge(stage3.age),
      updateFunctions[2].updateMonthlyContribution(stage3.contribution),
    ];
    
    for(var i = 0; i < actions.length; i++)
      dispatch(actions[i]);
  };
  

  const updateDecadeEnabled = (stageIndex, newValue) => {
    if (newValue === false) {
      updateDecadeYears(stageIndex, 0);
      updateDecadeContributions(stageIndex, 0);
    }
    else {
      updateDecadeYears(stageIndex, 1);
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
      <Box display="flex" flexDirection="column" 
        paddingLeft={buildSpaceSizeCssString('regular', isMobile, isTablet)}
        paddingRight={buildSpaceSizeCssString('regular', isMobile, isTablet)}
        marginTop={buildSpaceSizeCssString('small', isMobile, isTablet)}
      >
        <Box display="flex" flexDirection="column" gap={buildSpaceSizeCssString('small', isMobile, isTablet)} 
          marginBottom={isMobile ? '65px' : isTablet ? '85px' : '90px'}>
          <Typography className='montserrat-bold' fontSize={isMobile ? '28px' : isTablet ? '38px' : '52px'}>
            Calculate from total savings
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

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <InitialDataSectionComponent startingSavings={startingSavings} startingAge={startingAge}
            isMobile={isMobile} isTablet={isTablet}
            reduxStartingAgeUpdate={handleUpdateStartingAge} reduxStartingSavingsUpdate={handleUpdateStartingSavings}/>
          <Typography className='montserrat-regular'
            marginTop={buildSpaceSizeCssString(!isMobile && !isTablet ? 'regular' : 'medium', isMobile, isTablet)}
            marginBottom={buildCalculatedCssString(buildSpaceSizeCssString(!isMobile && !isTablet ? 'regular' : 'medium', isMobile, isTablet), ' - ', '10px')}
            fontSize={buildFontSizeCssString(isMobile ? 'strong' : 'medium', isMobile, isTablet)}
          >
            How much money do you want?
          </Typography>
          <TargetButtonsGroup 
            desiredResult={desiredResult} 
            reduxUpdate={handleUpdateDesiredResult}
          />
          <Box marginTop={isMobile ? '60px' : isTablet ? '84px' : '123px'} 
            className='montserrat-bold'
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography className='montserrat-bold' fontSize={isMobile ? '20px' : isTablet ? '30px' : '40px'}>
              Your savings plan is divided <br />  
            </Typography>
            <Typography className='montserrat-bold' fontSize={isMobile ? '20px' : isTablet ? '30px' : '40px'}>
              into <span style={{ color: '#33CBCC' }}>three stages.</span>
            </Typography>
            <Typography className='montserrat-medium' marginTop={2} fontSize={isMobile ? '12px' : isTablet ? '18px' : '24px'}>
              As you make more money you save more
            </Typography>
            <Typography className='montserrat-medium' fontSize={isMobile ? '12px' : isTablet ? '18px' : '24px'}>
              money in each stage.
            </Typography>
          </Box>
        </Box>
        <Box width='100%' display="flex" flexDirection="column" justifyContent="center" alignItems="center"
          marginTop={buildSpaceSizeCssString('regular', isMobile, isTablet)}
        >
          <Box width='100%' display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Typography className='montserrat-regular' fontSize={isMobile ? '20px' : isTablet ? '30px' : '40px'}>
              Your investment will be worth
            </Typography>
            <Typography className='poppins-medium' color={'var(--main-color)'} fontSize={isMobile ? '40px' : isTablet ? '80px' : '100px'}>
              {formatCurrency('$', false, calculateTotal().sum)}
            </Typography>
          </Box>
          <Typography className='montserrat-regular' fontSize={isMobile ? '10px' : isTablet ? '20px' : '30px'}>(over {
            totalEnabledYears(decades[0].page.age, decades[1].page.age, decades[2].page.age, 
              decades[0].page.enabled, decades[1].page.enabled, decades[2].page.enabled)
          } years)</Typography>
        </Box>
        <Box width='100%' display="flex" flexDirection="column" justifyContent="center" alignItems="center"
          marginTop={buildSpaceSizeCssString('medium', isMobile, isTablet)}
          gap={isMobile ? '33px' : isTablet ? '45px' : '65px'}
        >
          <StageSection
            stageIndex={0}
            stageNameText="Stage One"
            ageRangeText="Your stage one age range"
            isMobile={isMobile}
            isTablet={isTablet}
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
            isMobile={isMobile}
            isTablet={isTablet}
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
            isMobile={isMobile}
            isTablet={isTablet}
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
        <Box marginTop={buildSpaceSizeCssString('regular', isMobile, isTablet)} 
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
          <Box display='flex' flexDirection='row' width='100%' alignItems="center" 
          justifyContent='center'
            gap={buildCalculatedCssString(buildSpaceSizeCssString('medium', isMobile, isTablet), '*', '2')} textAlign='center'
            marginLeft={buildSpaceSizeCssString(isMobile || isTablet ? 'regular' : 'medium', isMobile, isTablet)}
            marginRight={buildSpaceSizeCssString(isMobile || isTablet ? 'regular' : 'medium', isMobile, isTablet)}
          >
            <Box display="flex" flexDirection="column" alignItems="center" 
              width={isMobile ? '104px' : isTablet ? '208px' : '305px'}
              height={isMobile ? '77px' : isTablet ? '151px' : '276px'}
            > 
              <img src={money} alt="Total Interest Earned"
                width={isMobile ? '37px' : isTablet ? '45px' : '126px'}
                height={isMobile ? '37px' : isTablet ? '45px' : '126px'}
              />
              <Typography 
                className='montserrat-regular'
                fontSize={buildFontSizeCssString(isMobile ? 'small' : isTablet ? 'regular' : 'small', isMobile, isTablet)}
              >
                Total Interest Earned
              </Typography>
              <Typography 
                className='poppins-medium'
                color={'var(--main-color)'}
                fontSize={buildFontSizeCssString(isMobile || isTablet ? 'medium' : 'strong', isMobile, isTablet)}
              >
                {formatCurrency('$', false, calculateTotal().interestEarned)}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center"
              width={isMobile ? '104px' : isTablet ? '208px' : '305px'}
              height={isMobile ? '77px' : isTablet ? '151px' : '276px'}
            >
              <img src={donation} alt="Total Contributions" 
                width={isMobile ? '37px' : isTablet ? '45px' : '126px'}
                height={isMobile ? '37px' : isTablet ? '45px' : '126px'}
              />
              <Typography
                className='montserrat-regular'
                fontSize={buildFontSizeCssString(isMobile ? 'small' : 'regular', isMobile, isTablet)}
              >
                Total Contributions
              </Typography>
              <Typography 
                className='poppins-medium'
                color={'var(--main-color)'}
                fontSize={buildFontSizeCssString(isMobile || isTablet ? 'medium' : 'strong', isMobile, isTablet)}
              >
                {formatCurrency('$', false, calculateTotal().sumContributions)}
              </Typography>
            </Box>
          </Box>
        </Box>
        {!allDecadesDisabled && (
          <>
            <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', 
              gap: buildSpaceSizeCssString('regular', isMobile, isTablet), 
              marginBottom: buildSpaceSizeCssString('regular', isMobile, isTablet),
              marginTop: buildSpaceSizeCssString(!isMobile && !isTablet ? 'regular' : 'medium', isMobile, isTablet) }}
            >
              <Typography 
                className='montserrat-regular'
                fontSize={buildFontSizeCssString(isTablet ? 'regular' : 'medium', isMobile, isTablet)}
              >
                Investment Growth Over Time
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
              height: isMobile ? '400px' : isTablet ? '727px' : '1002px',
              width: '100%'}}
              >
                <CurvedLineChartComponent isMobile={isMobile} isTablet={isTablet}/>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', gap:buildSpaceSizeCssString('regular', isMobile, isTablet) }}>
              <Typography 
                className='montserrat-regular'
                fontSize={buildFontSizeCssString(isTablet ? 'regular' : 'medium', isMobile, isTablet)}
              >
                Investment Balance at Year {calculateEndYear(40)}
              </Typography>
              <div style={{ height: isMobile ? '230px' : isTablet ? '384px' : '493px', width: isMobile ? '230px' : isTablet ? '384px' : '493px' }}>
                <DoughnutChartComponent isMobile={isMobile} isTablet={isTablet}/>
              </div>
            </div>
          </>
          )}
      </Box>
      <NavigationFooterComponent isMobile={isMobile} isTablet={isTablet}></NavigationFooterComponent>
    </>
  );
}

export default CalculateFromTotalSavings;