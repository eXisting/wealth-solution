import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { batch } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import {Typography, Grid, Box, useMediaQuery, useTheme, Button, Divider, createTheme} from '@mui/material';
import StageSection from './Components/StageSection';
import { calculateEndYear, currentDayFormatted, formatCurrency, totalEnabledYears } from './Global/Global';
import TargetButtonsGroup from './Components/TargetButtonsGroup';
import CurvedLineChartControlledComponent from './Components/CurvedLineChartControlledComponent';
import DoughnutChartComponent from './Components/DoughnutChartComponent';
import { totalSavingsPerContributions } from './Global/ChartsMath';
import {setDefaultCombination, setSmallestCombination} from './Global/Math';
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
import CurvedLineChartComponent from "./Components/CurvedLineChartComponent";
import DoughnutChartControlledComponent from "./Components/DoughnutChartControlledComponent";

const CalculateFromTotalSavings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isStagesVisible, setStageVisible] = useState(false);

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
  const isWideMobile = useMediaQuery(theme.breakpoints.between('narrowMobile', 'mobile'));
  const isTablet = useMediaQuery(theme.breakpoints.between('mobile', 'tablet'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('tablet'));
  const isWideDesktop = useMediaQuery(theme.breakpoints.up('desktop'));

  useEffect(() => {
    handleUpdateDesiredResult(1000000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const enableStagesVisibility = (newValue) => {
    setStageVisible(true);
  }

  const handleUpdateStartingAge = (newValue) => {
    dispatch(updateStartingAge(newValue));
  };

  const handleUpdateDesiredResult = (newValue) => {
    const [stage1, stage2, stage3] = setDefaultCombination(
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
      <NavigationHeaderComponent
          isMobile={isMobile}
          isTablet={isTablet}
      />
      <Box
          display="flex"
          flexDirection="column"
          paddingLeft={buildSpaceSizeCssString('regular', isMobile, isTablet)}
          paddingRight={buildSpaceSizeCssString('regular', isMobile, isTablet)}
          marginTop={buildSpaceSizeCssString('small', isMobile, isTablet)}
      >
        <Box
            display="flex"
            flexDirection="column"
            gap={buildSpaceSizeCssString('small', isMobile, isTablet)}
            marginBottom={buildSpaceSizeCssString('medium', isMobile, isTablet)}
        >
          <Typography
              className='montserrat-bold'
              fontSize={buildFontSizeCssString('strong', isMobile, isTablet)}
              align={'center'}
          >
            Let us calculate a
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
                WebkitTextFillColor: "transparent"}}
            > savings plan
            </span> for you
          </Typography>
        </Box>
        <Box
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <InitialDataSectionComponent
            startingSavings={startingSavings}
            startingAge={startingAge}
            isMobile={isMobile} isTablet={isTablet}
            reduxStartingAgeUpdate={handleUpdateStartingAge}
            reduxStartingSavingsUpdate={handleUpdateStartingSavings}
          />
          <Typography
            className='montserrat-regular'
            align={'center'}
            marginTop={buildSpaceSizeCssString(!isMobile && !isTablet ? 'big' : 'medium', isMobile, isTablet)}
            marginBottom={buildCalculatedCssString(buildSpaceSizeCssString(!isMobile && !isTablet ? 'regular' : 'medium', isMobile, isTablet), ' - ', '10px')}
            fontSize={buildFontSizeCssString(isMobile ? 'strong' : 'regular', isMobile, isTablet)}
          >
            How much money do you want?
          </Typography>
          <TargetButtonsGroup 
            desiredResult={desiredResult} 
            reduxUpdate={handleUpdateDesiredResult}
          />
          <Box
            marginTop={isMobile ? '60px' : isTablet ? '84px' : '123px'}
            className='montserrat-bold'
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <Typography
              className='montserrat-bold'
              fontSize={buildFontSizeCssString('intermediate', isMobile, isTablet)}
            >
              Your savings plan is divided into <span style={{ color: '#33CBCC' }}>three stages.</span>
            </Typography>
            <Typography
              className='montserrat-regular'
              marginTop={buildSpaceSizeCssString('small', isMobile, isTablet)}
              fontSize={buildFontSizeCssString('small', isMobile, isTablet)}
            >
              As you make more money you save more money in each stage.
            </Typography>
          </Box>
        </Box>
        <Box
          width='100%'
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          marginTop={buildSpaceSizeCssString('small', isMobile, isTablet)}
        >
          <Box
            width='100%'
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              className='montserrat-regular'
              fontSize={buildFontSizeCssString('medium', isMobile, isTablet)}
            >
              Your investment will be worth
            </Typography>
            <Typography
              className='poppins-medium'
              color={'var(--main-color)'}
              fontSize={buildFontSizeCssString('big', isMobile, isTablet)}
              marginTop={buildSpaceSizeCssString('small', isMobile, isTablet)}
            >
              {formatCurrency('$', false, calculateTotal().sum)}
            </Typography>
          </Box>
          <Typography
            className='montserrat-regular'
            fontSize={buildFontSizeCssString('regular', isMobile, isTablet)}
            marginTop={buildSpaceSizeCssString('small', isMobile, isTablet)}
          >
            (over {totalEnabledYears(decades[0].page.age, decades[1].page.age, decades[2].page.age,
              decades[0].page.enabled, decades[1].page.enabled, decades[2].page.enabled)} years)
          </Typography>
        </Box>
        {!isStagesVisible && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            marginTop={buildSpaceSizeCssString('regular', isMobile, isTablet)}
          >
            <Button variant="contained" 
              sx={{marginBottom:16, backgroundColor:'var(--main-color)', color:'white', borderRadius:'1rem', 
              width:isMobile || isTablet ? '70%' : '50%',
            '&:hover': {
              backgroundColor: 'black',
            }}}
              onClick={enableStagesVisibility}
            >
              <Typography 
                padding={1}
                className='poppins-medium'
                fontSize={buildFontSizeCssString('medium', isMobile, isTablet)}>
                Let's see your plan!
              </Typography>
            </Button>
          </Box>
        )}
        {isStagesVisible && (
          <>
            <Box
              marginTop={buildSpaceSizeCssString('small', isMobile, isTablet)}
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              width='100%'
            >
              <Box
                width={isMobile || isTablet ? '100%' : '55%'}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                marginTop={buildSpaceSizeCssString('medium', isMobile, isTablet)}
                gap={buildSpaceSizeCssString('tiny', isMobile, isTablet)}
              >
                <StageSection
                  stageIndex={0}
                  stageNameText="Stage One"
                  ageRangeText="Your stage one age range"
                  isMobile={isMobile}
                  isTablet={isTablet}
                  minSliderValue={1}
                  maxSliderValue={5000}
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
                  minSliderValue={1}
                  maxSliderValue={10000}
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
                  minSliderValue={1}
                  maxSliderValue={15000}
                  isEnabled={decades[2].page.enabled}
                  startingYears={startingAge + decades[0].page.age + decades[1].page.age}
                  years={decades[2].page.age}
                  contributions={decades[2].page.monthlyContribution}
                  reduxUpdateEnabled={updateDecadeEnabled}
                  reduxUpdateYears={updateDecadeYears}
                  reduxUpdateContributions={updateDecadeContributions}
                />
              </Box>
            </Box>
            <Box
              marginTop={buildSpaceSizeCssString('regular', isMobile, isTablet)}
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            >
              <Box
                display='flex'
                flexDirection='row'
                width='100%'
                alignItems="center"
                justifyContent='center'
                textAlign='center'
                marginLeft={buildSpaceSizeCssString(isMobile || isTablet ? 'regular' : 'medium', isMobile, isTablet)}
                marginRight={buildSpaceSizeCssString(isMobile || isTablet ? 'regular' : 'medium', isMobile, isTablet)}
              >
                <Box display="flex" flexDirection="column" alignItems="center"
                  width={isMobile ? '104px' : isTablet ? '208px' : '305px'}
                >
                  <img
                    src={money}
                    alt="Total Interest Earned"
                    width={isMobile ? '37px' : isTablet ? '45px' : '70px'}
                    height={isMobile ? '37px' : isTablet ? '45px' : '70px'}
                  />
                  <Typography
                    className='montserrat-regular'
                    fontSize={buildFontSizeCssString('regular', isMobile, isTablet)}
                  >
                    Total Interest Earned
                  </Typography>
                  <Typography
                    className='montserrat-bold'
                    color={'var(--secondary-color)'}
                    fontSize={buildFontSizeCssString('medium', isMobile, isTablet)}
                  >
                    {formatCurrency('$', false, calculateTotal().interestEarned)}
                  </Typography>
                </Box>
                <Box
                  display='flex'
                  flexDirection='column'
                  justifyContent={'start'}
                >
                  <Divider
                    orientation={'vertical'}
                    sx={{
                      height: '100px',
                      width: '0.5px',
                      backgroundColor: '#D9D9D9'}}
                  />
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center"
                  width={isMobile ? '104px' : isTablet ? '208px' : '305px'}
                >
                  <img
                    src={donation}
                    alt="Total Contributions"
                    width={isMobile ? '37px' : isTablet ? '45px' : '70px'}
                    height={isMobile ? '37px' : isTablet ? '45px' : '70px'}
                  />
                  <Typography
                    className='montserrat-regular'
                    fontSize={buildFontSizeCssString('regular', isMobile, isTablet)}
                  >
                    Total Contributions
                  </Typography>
                  <Typography
                    className='montserrat-bold'
                    color={'var(--secondary-color)'}
                    fontSize={buildFontSizeCssString('medium', isMobile, isTablet)}
                  >
                    {formatCurrency('$', false, calculateTotal().sumContributions)}
                  </Typography>
                </Box>
              </Box>
            </Box>
            {!allDecadesDisabled && (
              <>
                {isMobile || isTablet ? (
                  <>
                    <div style={{
                      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                      gap: buildSpaceSizeCssString('regular', isMobile, isTablet),
                      marginBottom: buildSpaceSizeCssString('regular', isMobile, isTablet),
                      marginTop: buildSpaceSizeCssString(!isMobile && !isTablet ? 'regular' : 'medium', isMobile, isTablet)
                    }}
                    >
                      <Typography
                        className='montserrat-regular'
                        fontSize={buildFontSizeCssString(isTablet ? 'regular' : 'medium', isMobile, isTablet)}
                      >
                        Investment Growth Over Time
                      </Typography>
                      <div style={{
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        height: isMobile ? '400px' : isTablet ? '727px' : '1002px',
                        width: '100%'
                      }}
                      >
                        <CurvedLineChartControlledComponent/>
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: buildSpaceSizeCssString('regular', isMobile, isTablet)
                    }}>
                      <Typography
                        className='montserrat-regular'
                        fontSize={buildFontSizeCssString(isTablet ? 'regular' : 'medium', isMobile, isTablet)}
                      >
                        Investment Balance at Year {calculateEndYear(40)}
                      </Typography>
                      <div style={{
                        position: 'relative',
                        height: isMobile ? '230px' : isTablet ? '384px' : '493px',
                        width: isMobile ? '230px' : isTablet ? '384px' : '493px'
                      }}>
                        <DoughnutChartComponent isMobile={isMobile} isTablet={isTablet}/>
                        <div style={{
                          position: 'absolute', top: -30, left: 0, right: 0, bottom: 0,
                          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                          zIndex: '-1'
                        }}>
                          <Typography
                            className='montserrat-regular'
                            fontSize={buildFontSizeCssString('small', isMobile, isTablet)}
                            textAlign='center'
                          >
                            Total Saved
                          </Typography>
                          <Typography
                            className='montserrat-bold'
                            fontSize={buildFontSizeCssString('small', isMobile, isTablet)}
                            textAlign='center'
                          >
                            {formatCurrency('$', false, calculateTotal().sum)}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    gap={'110px'}
                    marginTop={buildSpaceSizeCssString('medium', isMobile, isTablet)}
                  >
                    <div
                      style={{
                        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                        gap: buildSpaceSizeCssString('regular', isMobile, isTablet),
                        marginBottom: buildSpaceSizeCssString('regular', isMobile, isTablet),
                        marginTop: buildSpaceSizeCssString(!isMobile && !isTablet ? 'regular' : 'medium', isMobile, isTablet),
                        height: '626px',
                        width: '550px',
                    }}
                    >
                      <Typography
                        className='montserrat-regular'
                        fontSize={buildFontSizeCssString('regular', isMobile, isTablet)}
                      >
                        Investment Growth Over Time
                      </Typography>
                      <div style={{
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        height: '550px',
                        width: '550px'
                      }}
                      >
                        <CurvedLineChartControlledComponent/>
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'start',
                      alignItems: 'start',
                      height: '626px',
                      width: '550px',
                      gap: buildSpaceSizeCssString('regular', isMobile, isTablet)
                    }}>
                      <Typography
                        className='montserrat-regular'
                        fontSize={buildFontSizeCssString('regular', isMobile, isTablet)}
                      >
                        Investment Balance at Year {calculateEndYear(40)}
                      </Typography>
                      <div style={{
                        position: 'relative',
                        height: '400px',
                        width: '400px'
                      }}>
                        <DoughnutChartComponent isMobile={isMobile} isTablet={isTablet}/>
                        <div style={{
                          position: 'absolute', top: -30, left: 0, right: 0, bottom: 0,
                          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                          zIndex: '-1'
                        }}>
                          <Typography
                            className='montserrat-regular'
                            fontSize={buildFontSizeCssString('small', isMobile, isTablet)}
                            textAlign='center'
                          >
                            Total Saved
                          </Typography>
                          <Typography
                            className='montserrat-bold'
                            fontSize={buildFontSizeCssString('small', isMobile, isTablet)}
                          textAlign='center'
                        >
                          {formatCurrency('$', false, calculateTotal().sum)}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </Box>
                )}
              </>
            )}
          </>
        )}
        </Box>
      <NavigationFooterComponent isMobile={isMobile} isTablet={isTablet}></NavigationFooterComponent>
      </Box>
    </Box>
  );
}

export default CalculateFromTotalSavings;