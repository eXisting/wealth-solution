import React, { useState, useEffect, useRef } from 'react';
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
        narrowMobile: 480,
        mobile: 640,
        narrowTablet: 900,
        tablet: 1280,
        desktop: 1440
      },
    },
  });

  const isMobile = useMediaQuery(theme.breakpoints.down('mobile'));
  const isNarrowMobile = useMediaQuery(theme.breakpoints.down('narrowMobile'));
  const isTablet = useMediaQuery(theme.breakpoints.between('mobile', 'tablet'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('tablet'));
  const isWideDesktop = useMediaQuery(theme.breakpoints.up('desktop'));

  const [selectedDecade, setSelectedDecade] = useState(0);
  const selectedDecadeRef = useRef(selectedDecade);

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
    selectedDecadeRef.current = selectedDecade;
    updateView(selectedDecade);
  }, [selectedDecade, decades]);

  function updateView(decadeIndex) {
    setSelectedDecade(decadeIndex);

    const totalSavings = decadeIndex === 0 ? 0 : decades[decadeIndex - 1].page.totalDecadeSavings;

    const decade = decades[decadeIndex].page;

    calculateSavings(trimToInt(totalSavings), trimToInt(decade.decadeIncome), trimToInt(decade.savingsPercentage), decadeIndex);
  }

  const calculateSavings = (totalSavings, decadeIncome, savingsPercentage, index) => {
    const contribution = Math.round(decadeIncome * (parseFloat(savingsPercentage) / 100) / 12);
    dispatch(updateFunctions[index].updateMonthlyContribution(contribution));

    if (totalSavings === 0 && contribution === 0) {
      dispatch(updateFunctions[index].updateTotalDecadeSavings(0));
      return;
    }
  
    const interest = 0.1;
    const timesInterestAppliedPerPeriod = 12;
    const periods = 10;
    const initialBalance = parseFloat(trimToInt(totalSavings));
  
    const futureValue = initialBalance *
      Math.pow(1 + (interest / timesInterestAppliedPerPeriod), timesInterestAppliedPerPeriod * periods) + contribution *
      ((Math.pow(1 + (interest / timesInterestAppliedPerPeriod), timesInterestAppliedPerPeriod * periods) - 1) /
        (interest / timesInterestAppliedPerPeriod));
  
    const saved = Math.round(futureValue).toLocaleString();

    dispatch(updateFunctions[index].updateTotalDecadeSavings(saved));
  };

  function selectedDecadeAgeRange() {
    const lowerBracketYears = selectedDecade * 10 + startingAge;
    const upperBracketYears = lowerBracketYears + 10;

    return { lowerBracketYears, upperBracketYears };
  }

  function updateDecadeIncomeValue(value) {
    dispatch(updateFunctions[selectedDecadeRef.current].updateDecadeIncome(value));
  };

  function updateDecadePercentSavings(value) {
    dispatch(updateFunctions[selectedDecadeRef.current].updatePercents(value));
  };

  function calculateTotal() {
    const sum = decades[selectedDecade].page.totalDecadeSavings;
    const sumContributions = decades[selectedDecade].page.monthlyContribution;
    const interestEarned = sum - sumContributions;

    return { sum, sumContributions, interestEarned };
  }

  function selectDecade(decadeIndex) {
    setSelectedDecade(decadeIndex);
  }

  function nextDecade() {
    if (selectedDecade + 1 > 2) {
      navigate('/');
      return;
    }

    updateView(selectedDecade + 1);
  }

  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Box
        maxWidth={isMobile ? '420px' : isTablet ? '780px' : isDesktop ? '1200px' : '100%'}
        width={'90%'}
      >
      <NavigationHeaderComponent isMobile={isMobile} isTablet={isTablet}></NavigationHeaderComponent>
      <Box display="flex" flexDirection="column"
        marginTop={buildSpaceSizeCssString('small', isMobile, isTablet)}
      >
        <Box 
        display="flex"
        flexDirection="row"
        justifyContent="center"
        textAlign={'center'}
        marginBottom={isMobile ? '10px' : isTablet ? '18px' : '20px'}
        >
          <Typography className='montserrat-bold' fontSize={isMobile ? '28px' : isTablet ? '34px' : '48px'}>
            <span
              className='montserrat-bold'
              align='center'
              style={{
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
          marginBottom={buildSpaceSizeCssString('regular', isMobile, isTablet)}
        >
          <StagesProgressSection
            decadeAgeRange={selectedDecadeAgeRange()}
            stageSelected={selectDecade}
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
              titleText={'Estimate your 10 year average income'}
              isMobile={isMobile}
              isTablet={isTablet}
              updateRedux={updateDecadeIncomeValue}
            />
            <GradientSliderFullComponent
              min={0}
              max={100}
              index={selectedDecade}
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
              index={selectedDecade}
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
          marginTop={buildSpaceSizeCssString('medium', isMobile, isTablet)}
        >
          <Box
            display="flex"
            flexDirection="row"
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              width={'100%'}
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
              width={'100%'}
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
                textTransform: 'none',
                paddingTop: '15px',
                paddingBottom: '15px',
                paddingLeft: isMobile ? '20px' : '70px',
                paddingRight: isMobile ? '20px' : '70px',
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
                className='montserrat-bold'
                fontSize={isMobile ? '16px' : '20px'}
                paddingLeft={buildSpaceSizeCssString('tiny', isMobile, isTablet)}
                paddingRight={buildSpaceSizeCssString('tiny', isMobile, isTablet)}
              >
                  {selectedDecade === 2 ? 'Let’s save more' : `Calculate ${selectedDecade + 1 === 1 ? '2nd' : selectedDecade + 1 === 2 ? '3rd' : ''} Decade`}
              </Typography>
            </Button>
          </Box>
      </Box>
      <NavigationFooterComponent isMobile={isMobile} isNarrowMobile={isNarrowMobile} isTablet={isTablet}></NavigationFooterComponent>
    </Box>
    </Box>
  );
}

export default CalculateFromIncome;