import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Button, useMediaQuery, useTheme } from '@mui/material';
import { currentDayFormatted, formatCurrency, trimToInt } from './Global/Global';
import NavigationHeaderComponent from './Components/NavigationHeaderComponent';
import StagesProgressSection from './Components/StagesProgressSection';
import NavigationFooterComponent from './Components/NavigationFooterComponent';
import { buildFontSizeCssString, buildSpaceSizeCssString } from './Global/CssStrings';
import InitialDataSectionComponent from './Components/InitialDataSectionComponent';
import GradientSliderComponent from './Components/GradientSliderComponent';
import GradientSliderFullComponent from './Components/GradientSliderFullComponent';

// Media
import moneyBag from '../Media/moneyBag.svg'
import moneyBox from '../Media/moneyBox.svg'

// Redux
import { 
  updateStartingSavings, 
  updateStartingAge,
} from '../redux/initialValuesReducer';

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

const CalculateFromIncome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [selectedDecade, setSelectedDecade] = useState(0);

  const {
    startingSavings,
    startingAge,
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
    const lowerBracketYears = selectedDecade * 10 + startingAge;
    const upperBracketYears = lowerBracketYears + 10;

    return { lowerBracketYears, upperBracketYears };
  }

  const updateDecadeIncomeValue = value => {
    dispatch(updateFunctions[selectedDecade].updateDecadeIncome(value));
  };

  const updateDecadePercentSavings = value => {
    dispatch(updateFunctions[selectedDecade].updatePercents(value));
  };

  const handleUpdateStartingSavings = (newValue) => {
    dispatch(updateStartingSavings(newValue));
  };

  const handleUpdateStartingAge = (newValue) => {
    dispatch(updateStartingAge(newValue));
  };

  function calculateTotal() {
    const sum = decades[selectedDecade].page.totalDecadeSavings;
    const sumContributions = decades[selectedDecade].page.monthlyContribution;
    const interestEarned = sum - sumContributions;

    return { sum, sumContributions, interestEarned };
  }

  function nextDecade() {
    if (selectedDecade + 1 > 2) {
      navigate('/');
      return;
    }

    updateView(selectedDecade + 1);
  }

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
          <Typography className='montserrat-bold' fontSize={buildFontSizeCssString('medium', isMobile, isTablet)}>
              Calculate from your income
          </Typography>
        </Box>
        <InitialDataSectionComponent startingSavings={startingSavings} startingAge={startingAge} 
          isMobile={isMobile} isTablet={isTablet}
          reduxStartingAgeUpdate={handleUpdateStartingAge} reduxStartingSavingsUpdate={handleUpdateStartingSavings}
        />
        <Box display="flex" flexDirection="column" justifyContent="flex-start" 
          marginTop={buildSpaceSizeCssString('medium', isMobile, isTablet)}
          marginBottom={buildSpaceSizeCssString('medium', isMobile, isTablet)}
        >
          <StagesProgressSection 
            decadeAgeRange={selectedDecadeAgeRange()}
            stageSelected={updateView} 
            selectedStage={selectedDecade} 
            isMobile={isMobile} isTablet={isTablet}
          />
        </Box>
        <GradientSliderComponent
          min={25000} max={350000} 
          step={1000}
          initialValue={trimToInt(decades[selectedDecade].page.decadeIncome)} 
          titleText={'Estimate your average income in the next 10 years'}
          isMobile={isMobile}
          isTablet={isTablet}
          updateRedux={updateDecadeIncomeValue} 
        />
        <Box display="flex" flexDirection="column" justifyContent="flex-start" marginBottom={buildSpaceSizeCssString('medium', isMobile, isTablet)} />
        <GradientSliderFullComponent min={0} max={100} 
          sign='%'
          step={1}
          initialValue={trimToInt(decades[selectedDecade].page.savingsPercentage)} 
          titleText={"What % of your income can you save?"}
          isMobile={isMobile}
          isTablet={isTablet}
          updateRedux={updateDecadePercentSavings} 
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign:"center" }} marginBottom={buildSpaceSizeCssString('medium', isMobile, isTablet)} marginTop={buildSpaceSizeCssString('medium', isMobile, isTablet)}>
          <Box display="flex" flexDirection="row" gap={buildSpaceSizeCssString('medium', isMobile, isTablet)}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <img src={moneyBag} alt="Total Interest Earned" width="100rem" />
              <Typography 
                className='montserrat-regular'
                fontSize={
                  isMobile ? '10px' : isTablet ? '14px' : '36px'}
                textAlign='center'
              >
                You're saving each month
              </Typography>
              <Typography
                className='poppins-medium'
                color='var(--main-color)'
                fontSize={buildFontSizeCssString(isMobile || isTablet ? 'medium' : 'strong', isMobile, isTablet)}
                textAlign='center'
              >
                {formatCurrency('$', false, calculateTotal().sumContributions)}?
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <img src={moneyBox} alt="Total Contributions" width="100rem" />
              <Typography
                className='montserrat-regular'
                fontSize={
                  isMobile ? '10px' : isTablet ? '14px' : '36px'}
                textAlign='center'
              >
                You're {selectedDecadeAgeRange().upperBracketYears} and already saved
              </Typography>
              <Typography
                className='poppins-medium'
                color='var(--main-color)'
                fontSize={buildFontSizeCssString(isMobile || isTablet ? 'medium' : 'strong', isMobile, isTablet)}
                textAlign='center'
              >
                {formatCurrency('$', false, calculateTotal().sum)}!
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
            <Button variant="contained" 
              sx={{marginBottom:16, backgroundColor:'#F5A338', color:'white', borderRadius:'4rem', 
              width:'70%',
            '&:hover': {
              backgroundColor: 'black',
            }}}
              onClick={nextDecade}
            >
              <Typography 
                padding={1}
                className='poppins-medium'
                fontSize={buildFontSizeCssString('medium', isMobile, isTablet)}>
                  {selectedDecade === 2 ? 'What is next?' : `Calculate ${selectedDecade + 1 === 1 ? '2nd' : selectedDecade + 1 === 2 ? '3rd' : ''} Decade`}
              </Typography>
            </Button>
          </Box>
      </Box>
      <NavigationFooterComponent isMobile={isMobile} isTablet={isTablet}></NavigationFooterComponent>
    </>
  );
}

export default CalculateFromIncome;