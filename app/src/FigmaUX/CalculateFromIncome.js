import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {Typography, Box, Button, useMediaQuery, useTheme, Divider, createTheme} from '@mui/material';
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

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 900,
        lg: 1200,
        xl: 1536,
        desktop: 1280,
        wide: 1440
      },
    },
  });

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'desktop'));
  const isdesktop = useMediaQuery(theme.breakpoints.up('desktop'));

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
        <Box 
        display="flex" flexDirection="row"justifyContent="center"
        marginBottom={isMobile ? '10px' : isTablet ? '18px' : '20px'}>
          <Typography className='montserrat-bold' fontSize={buildFontSizeCssString('strong', isMobile, isTablet)}>
            <span
              className='montserrat-bold'
              align='center'
              style={{
                fontSize: buildFontSizeCssString('strong', isMobile, isTablet),
                color: "grey.700",
                backgroundColor: "primary",
                backgroundImage: 'linear-gradient(45deg, #33CBCC, #4A7DE2)',
                backgroundSize: "100%",
                backgroundRepeat: "repeat",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Calculate
            </span> from your income
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          marginTop={buildSpaceSizeCssString('regular', isMobile, isTablet)}
          marginBottom={buildSpaceSizeCssString('regular', isMobile, isTablet)}
        >
          <StagesProgressSection
            decadeAgeRange={selectedDecadeAgeRange()}
            stageSelected={updateView}
            selectedStage={selectedDecade}
            isMobile={isMobile} isTablet={isTablet}
          />
        </Box>
        {isMobile || isTablet ? (
          <>
            <GradientSliderComponent
              min={25000} max={300000}
              step={1000}
              initialValue={trimToInt(decades[selectedDecade].page.decadeIncome)}
              titleText={'Estimate your average income in the next 10 years'}
              isMobile={isMobile}
              isTablet={isTablet}
              updateRedux={updateDecadeIncomeValue}
            />
            <GradientSliderFullComponent
              min={0}
              max={100}
              sign='%'
              step={1}
              initialValue={trimToInt(decades[selectedDecade].page.savingsPercentage)}
              titleText={"What % of your income can you save?"}
              isMobile={isMobile}
              isTablet={isTablet}
              updateRedux={updateDecadePercentSavings}
            />
          </>
        ) : (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="start"
            alignContent="centre"
            gap={buildSpaceSizeCssString('medium', isMobile, isTablet)}
            marginBottom={buildSpaceSizeCssString('tiny', isMobile, isTablet)}
          >
            <GradientSliderComponent
              min={25000} max={300000}
              step={1000}
              initialValue={trimToInt(decades[selectedDecade].page.decadeIncome)}
              titleText={'Estimate your 10 year average income'}
              isMobile={isMobile}
              isTablet={isTablet}
              updateRedux={updateDecadeIncomeValue}
              flexGrow={1}
            />
            <GradientSliderFullComponent
              min={0}
              max={100}
              sign='%'
              step={1}
              initialValue={trimToInt(decades[selectedDecade].page.savingsPercentage)}
              titleText={"What % of your income can you save?"}
              isMobile={isMobile}
              isTablet={isTablet}
              updateRedux={updateDecadePercentSavings}
              flexGrow={1}
            />
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign:"center"}}
          marginBottom={buildSpaceSizeCssString('medium', isMobile, isTablet)}
        >
          <Box
            display="flex"
            flexDirection="row"
            gap={buildSpaceSizeCssString('big', isMobile, isTablet)}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              marginLeft={buildSpaceSizeCssString('small', isMobile, isTablet)}
              marginRight={buildSpaceSizeCssString('small', isMobile, isTablet)}
            >
              <img
                src={moneyBox}
                alt="Total Interest Earned"
                width="70rem"
              />
              <Typography 
                className='montserrat-regular'
                fontSize={buildFontSizeCssString('regular', isMobile, isTablet)}
                textAlign='center'
              >
                You're saving each month
              </Typography>
              <Typography
                className='montserrat-bold'
                color='var(--secondary-color)'
                fontSize={buildFontSizeCssString('regular', isMobile, isTablet)}
                textAlign='center'
              >
                {formatCurrency('$', false, calculateTotal().sumContributions)}?
              </Typography>
            </Box>
            <Box
              display='flex'
              flexDirection='column'
              alignItems="center"
              justifyContent='center'
            >
              <Divider
                orientation={'vertical'}
                sx={{
                  height: '50%',
                  backgroundColor: '#D6D6D6',
                  margin: '0 10px' }}
                flexItem
              />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              marginRight={buildSpaceSizeCssString('small', isMobile, isTablet)}
              marginLeft={buildSpaceSizeCssString('small', isMobile, isTablet)}
            >
              <img
                src={moneyBag}
                alt="Total Contributions"
                width="70rem"
              />
              <Typography
                className='montserrat-regular'
                fontSize={buildFontSizeCssString('regular', isMobile, isTablet)}
                textAlign='center'
              >
                You're {selectedDecadeAgeRange().upperBracketYears} and already saved
              </Typography>
              <Typography
                className='montserrat-bold'
                color='var(--secondary-color)'
                fontSize={buildFontSizeCssString('regular', isMobile, isTablet)}
                textAlign='center'
              >
                {formatCurrency('$', false, calculateTotal().sum)}!
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center">
            <Button
              variant="contained"
              sx={{
                padding: '20px 50px',
                backgroundColor:'#F5A338',
                color:'white',
                borderRadius:'4rem',
                width:'fit-content',
                '&:hover': {
                  backgroundColor: 'black',
            }}}
              onClick={nextDecade}
            >
              <Typography 
                padding={1}
                className='poppins-medium'
                fontSize={buildFontSizeCssString('medium', isMobile, isTablet)}
                paddingLeft={buildSpaceSizeCssString('tiny', isMobile, isTablet)}
                paddingRight={buildSpaceSizeCssString('tiny', isMobile, isTablet)}
              >
                  {selectedDecade === 2 ? 'Let’s save more' : `Calculate ${selectedDecade + 1 === 1 ? '2nd' : selectedDecade + 1 === 2 ? '3rd' : ''} Decade`}
              </Typography>
            </Button>
          </Box>
      </Box>
      <NavigationFooterComponent isMobile={isMobile} isTablet={isTablet}></NavigationFooterComponent>
    </>
  );
}

export default CalculateFromIncome;