import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {Typography, Box, useMediaQuery, useTheme, Divider, createTheme} from '@mui/material';
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";
import { calculateEndYear, currentDate, currentDayFormatted, formatCurrency, trimToInt } from './Global/Global';
import GradientSliderComponent from './Components/GradientSliderComponent';
import CurvedLineChartComponent from './Components/CurvedLineChartComponent';
import DoughnutChartControlledComponent from './Components/DoughnutChartControlledComponent';
import NavigationHeaderComponent from './Components/NavigationHeaderComponent';
import NavigationFooterComponent from './Components/NavigationFooterComponent';
import { calculateSavings } from './Global/Math';
import { buildCalculatedCssString, buildFontSizeCssString, buildSpaceSizeCssString } from './Global/CssStrings';

import './css/layoutSpaces.css';
import './css/fonts.css';
import './css/components.css';

// Media
import money from '../Media/money.svg'
import donation from '../Media/donation.svg'

// Redux
import {
  updateMonthlyContribution,
} from '../redux/decadeOneReducer';

const UseWealthometer = () => {
  const dispatch = useDispatch();

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
  const isTablet = useMediaQuery(theme.breakpoints.between('mobile', 'tablet'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('tablet'));

  useEffect(() => {
    handleUpdateContributions(1000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    monthlyContribution,
  } = useSelector((state) => state.decadeOnePage);

  const handleUpdateContributions = (newValue) => {
    dispatch(updateMonthlyContribution(newValue));
  };

  function calculateTotal() {
    const sumContributions = monthlyContribution * 12 * 40;
    const sum = calculateSavings(monthlyContribution, 40, 0);
    const interestEarned = sumContributions - sum;

    return { sum, sumContributions, interestEarned };
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
      <NavigationHeaderComponent
          isMobile={isMobile}
          isTablet={isTablet}>
      </NavigationHeaderComponent>
      <Box
          display="flex"
          flexDirection="column"
          marginTop={buildSpaceSizeCssString('small', isMobile, isTablet)}
      >
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            marginBottom={buildCalculatedCssString(buildSpaceSizeCssString('small', isMobile, isTablet), '*', "1.5")}
            width={'100%'}
        >
          <Typography
            className={isDesktop ? 'montserrat-semibold' : 'montserrat-bold'}
            align='center'
            fontSize={ isMobile ? '28px' : isTablet ? '34px' : '48px' }
          >
            Use Wealthometer to <span
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
            predict
          </span> your wealth
          </Typography>
        </Box>

        {isMobile || isTablet ? (
          <>
            <GradientSliderComponent
              min={0}
              max={1600}
              step={100}
              initialValue={trimToInt(monthlyContribution)}
              titleText={"Monthly Savings"}
              updateRedux={handleUpdateContributions}
            />
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              zIndex={-1}
              marginTop={buildCalculatedCssString(buildSpaceSizeCssString('medium', isMobile, isTablet), '*', "-2.5")}
              gap={buildSpaceSizeCssString('medium', isMobile, isTablet)}
            >
              <Box>
                <Typography
                  className='montserrat-medium'
                  fontSize={isMobile ? '14px' : '20px'}
                  textAlign='center'
                  marginBottom={'10px'}
                >
                  Your investment<br/> will be worth
                </Typography>
                <Typography
                  className='montserrat-medium'
                  color='var(--main-color)'
                  fontSize={isMobile ? '40px' : '60px'}
                  textAlign='center'
                >
                  {formatCurrency('$', false, calculateTotal().sum)}
                </Typography>
                <Typography
                  className='montserrat-regular'
                  fontSize={isMobile ? '16px' : '20px'}
                  textAlign='center'
                >
                  (over 40 years)
                </Typography>
              </Box>
            </Box>
            <Box
              display='flex'
              flexDirection='row'
              width='100%'
              zIndex={-1}
              alignItems="center"
              justifyContent='center'
              textAlign='center'
              gap={buildSpaceSizeCssString('tiny', isMobile, isTablet)}
              marginTop={buildCalculatedCssString(buildSpaceSizeCssString('medium', isMobile, isTablet), '*', '1.2')}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                width={isMobile ? '160px' : '270px'}
              >
                <img
                    src={money}
                    alt="Total Interest Earned"
                    width={isMobile ? '40px' : '70px'}
                    height={isMobile ? '40px' : '70px'}
                />
                <Typography
                  className='montserrat-medium'
                  fontSize={isMobile ? '14px' : '24px'}
                >
                  Total Interest Earned
                </Typography>
                <Typography
                  className='montserrat-bold'
                  color={'var(--secondary-color)'}
                  fontSize={isMobile ? '16px' : '28px'}
                >
                  {formatCurrency('$', false, calculateTotal().interestEarned)}
                </Typography>
              </Box>
              <Divider
                orientation={'vertical'}
                sx={{
                  height: isMobile ? '37px' : '70px',
                  backgroundColor: '#D9D9D9',
                  margin: '0 10px' }}
              />
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                width={isMobile ? '160px' : '270px'}
              >
              <img
                src={donation}
                alt="Total Contributions"
                width={isMobile ? '40px' : '70px'}
                height={isMobile ? '40px' : '70px'}
              />
              <Typography
                className='montserrat-medium'
                fontSize={isMobile ? '14px' : '24px'}
              >
                Total Contributions
              </Typography>
              <Typography
                  className='montserrat-bold'
                  color={'var(--secondary-color)'}
                  fontSize={isMobile ? '16px' : '28px'}
              >
                {formatCurrency('$', false, calculateTotal().sumContributions)}
              </Typography>
            </Box>
            </Box>
            <Box
              display='flex'
              flexDirection='row'
              width='100%'
              zIndex={-1}
              alignItems="center"
              justifyContent='center'
              textAlign='center'
            >
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: isMobile ? '360px' : isTablet ? '720px' : '305px',
                gap: isMobile ? '45px' : '80px',
                marginBottom: buildSpaceSizeCssString('small', isMobile, isTablet),
                marginTop: isMobile ? '60px' : '90px',}}
              >
                <Typography
                    className='montserrat-regular'
                    fontSize={isMobile ? '20px' : '24px'}
                >
                  Investment Growth Over Time
                </Typography>
                <div style={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  height: isMobile ? '400px' : isTablet ? '700px' : '402px',
                  width: '100%'
                }}
                >
                  <CurvedLineChartComponent years={40} step={isTablet ? 5 : 10} monthlyContributions={monthlyContribution}
                                            initialSavings={0} isMobile={isMobile} isTablet={isTablet}/>
                </div>
              </div>
            </Box>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: isMobile ? '16px' : '30px',
                marginTop: isMobile ? '16px' : '40px',
              }}>
                <Typography
                    className='montserrat-regular'
                    fontSize={isMobile ? '20px' : '24px'}
                >
                  Investment Balance at Year {calculateEndYear(40)}
                </Typography>
                <div style={{
                  position: 'relative',
                  height: isMobile ? '230px' : isTablet ? '384px' : '493px',
                  width: isMobile ? '230px' : isTablet ? '384px' : '493px'
                }}>
                  <DoughnutChartControlledComponent years={40} monthlyContributions={monthlyContribution}
                                                    initialSavings={0} isMobile={isMobile} isTablet={isTablet}/>
                  <div style={{
                    position: 'absolute', top: -30, left: 0, right: 0, bottom: 0,
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                    zIndex: '-1'
                  }}>
                    <Typography
                        className='montserrat-regular'
                        fontSize={isMobile ? '10px' : '20px'}
                        textAlign='center'
                    >
                      Total Saved
                    </Typography>
                    <Typography
                        className='montserrat-medium'
                        fontSize={isMobile ? '15px' : '30px'}
                        textAlign='center'
                    >
                      {formatCurrency('', undefined, calculateTotal().sum)}
                    </Typography>
                  </div>
                </div>
              </div>
          </>
        ) : (
          <>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              gap={ isDesktop ? '' : buildSpaceSizeCssString('medium', isMobile, isTablet )}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                width={'50%'}
              >
                <GradientSliderComponent
                  min={0}
                  max={1600}
                  step={100}
                  initialValue={trimToInt(monthlyContribution)}
                  titleText={"Monthly Savings"}
                  updateRedux={handleUpdateContributions}
                />
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  zIndex={-1}
                  marginTop={buildCalculatedCssString(buildSpaceSizeCssString('medium', isMobile, isTablet), '*', "-2.2")}
                  gap='10px'
                >
                  <Typography
                    className='montserrat-regular'
                    fontSize={'20px'}
                    textAlign='center'
                  >
                    Your investment<br/> will be worth
                  </Typography>
                  <Typography
                    className='poppins-medium'
                    color='var(--main-color)'
                    fontSize={buildFontSizeCssString('strong', isMobile, isTablet)}
                    textAlign='center'
                  >
                    {formatCurrency('$', false, calculateTotal().sum)}
                  </Typography>
                  <Typography
                    className='montserrat-regular'
                    fontSize={buildFontSizeCssString('tiny', isMobile, isTablet)}
                    textAlign='center'
                  >
                    (over 40 years)
                  </Typography>
                </Box>
              </Box>
              <Box
                  marginBottom='70px'
                  marginRight={'100px'}
                  sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
              >
                <Box
                    display='flex'
                    flexDirection='column'
                    width='100%'
                    alignItems="center"
                    justifyContent='center'
                    gap='20px'
                    textAlign='center'
                    marginTop={buildCalculatedCssString(buildSpaceSizeCssString('medium', isMobile, isTablet))}
                >
                  <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent='center'
                      width={'380px'}
                  >
                    <img
                        src={money}
                        alt="Total Interest Earned"
                        width={'100px'}
                        height={'100px'}
                    />
                    <Typography
                        className='montserrat-regular'
                        fontSize={'30px'}
                    >
                      Total Interest Earned
                    </Typography>
                    <Typography
                      className='montserrat-bold'
                      color={'var(--secondary-color)'}
                      fontSize={'34px'}
                    >
                      {formatCurrency('$', false, calculateTotal().interestEarned)}
                    </Typography>
                  </Box>
                  <Divider
                    orientation="horizontal"
                    width={'170px'}
                  />
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent='center'
                    width={isMobile ? '120px' : isTablet ? '208px' : '305px'}
                  >
                    <img
                      src={donation}
                      alt="Total Contributions"
                      width={'100px'}
                      height={'100px'}
                    />
                    <Typography
                      className='montserrat-regular'
                      fontSize={'30px'}
                    >
                      Total Contributions
                    </Typography>
                    <Typography
                      className='montserrat-bold'
                      color={'var(--secondary-color)'}
                      fontSize={'34px'}
                    >
                      {formatCurrency('$', false, calculateTotal().sumContributions)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="start"
          gap={'70px'}
          marginRight={'70px'}
          marginTop={'80px'}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '550px',
              gap: '40px',
              marginBottom: buildSpaceSizeCssString('small', isMobile, isTablet),
              marginRight: buildSpaceSizeCssString('big', isMobile, isTablet)
            }}
          >
            <Typography
              className='montserrat-regular'
              fontSize={'24px'}
              align={'center'}
            >
              Investment Growth <br/>Over Time
            </Typography>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '500px',
              width: '100%'
            }}
            >
              <CurvedLineChartComponent
                years={40}
                step={2}
                monthlyContributions={monthlyContribution}
                initialSavings={0}
                isMobile={isMobile}
                isTablet={isTablet}
              />
            </div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
            height: '100%',
            alignItems: 'center',
            gap: '30px',
            marginBottom: buildSpaceSizeCssString('small', isMobile, isTablet)}}
          >
            <Typography
              className='montserrat-regular'
              fontSize={'24px'}
              align={'center'}
            >
              Investment Balance <br/>at Year {calculateEndYear(40)}
            </Typography>
            <div style={{
              position: 'relative',
              height: '450px',
              width: '370px'
            }}
            >
              <DoughnutChartControlledComponent
                years={40}
                monthlyContributions={monthlyContribution}
                initialSavings={0}
                isMobile={isMobile}
                isTablet={isTablet}
              />
              <div style={{
                position: 'absolute',
                top: -120,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: '-1'}}
              >
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
                  {formatCurrency('', false, calculateTotal().sum)}
                </Typography>
              </div>
            </div>
          </div>
        </Box>
          </>
        )}
      </Box>
      <NavigationFooterComponent isMobile={isMobile} isTablet={isTablet}></NavigationFooterComponent>
      </Box>
    </Box>
  );
}

export default UseWealthometer;