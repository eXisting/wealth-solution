import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Typography, Box, useMediaQuery, useTheme, Divider } from '@mui/material';
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
  
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

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
    <>
      <NavigationHeaderComponent
          isMobile={isMobile}
          isTablet={isTablet}>
      </NavigationHeaderComponent>
      <Box
          display="flex"
          flexDirection="column"
          paddingLeft={buildSpaceSizeCssString('regular', isMobile, isTablet)}
          paddingRight={buildSpaceSizeCssString('regular', isMobile, isTablet)}
          marginTop={buildSpaceSizeCssString('small', isMobile, isTablet)}
      >
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            marginBottom={buildCalculatedCssString(buildSpaceSizeCssString('small', isMobile, isTablet), '*', "1.5")}
        >
          <Typography
            className='montserrat-bold'
            align='center'
            fontSize={buildFontSizeCssString('strong', isMobile, isTablet)}
          >
            Use Wealthometer to <span
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
              marginTop={buildCalculatedCssString(buildSpaceSizeCssString('medium', isMobile, isTablet), '*', "-2.2")}
              gap={buildSpaceSizeCssString('medium', isMobile, isTablet)}
            >
              <Box>
                <Typography
                  className='montserrat-medium'
                  fontSize={buildFontSizeCssString('regular', isMobile, isTablet)}
                  textAlign='center'
                >
                  Your investment will<br /> be worth
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
              display='flex'
              flexDirection='row'
              width='100%'
              zIndex={-1}
              alignItems="center"
              justifyContent='center'
              textAlign='center'
              gap={buildCalculatedCssString(buildSpaceSizeCssString('medium', isMobile, isTablet), '*', '2')}
              marginTop={buildCalculatedCssString(buildSpaceSizeCssString('medium', isMobile, isTablet), '*', '1.2')}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                width={isMobile ? '120px' : isTablet ? '208px' : '305px'}
              >
                <img
                    src={money}
                    alt="Total Interest Earned"
                    width={isMobile ? '27px' : '35px'}
                    height={isMobile ? '27px' : '35px'}
                />
                <Typography
                  className='montserrat-regular'
                  fontSize={buildFontSizeCssString('small', isMobile, isTablet)}
                >
                  Total Interest Earned
                </Typography>
                <Typography
                  className='poppins-medium'
                  color={'var(--main-color)'}
                  fontSize={buildFontSizeCssString('medium', isMobile, isTablet)}
                >
                  {formatCurrency('$', false, calculateTotal().interestEarned)}
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                width={isMobile ? '120px' : isTablet ? '208px' : '305px'}
              >
              <img
                src={donation}
                alt="Total Contributions"
                width={isMobile ? '27px' : isTablet ? '35px' : '40px'}
                height={isMobile ? '27px' : isTablet ? '35px' : '40px'}
              />
              <Typography
                className='montserrat-regular'
                fontSize={buildFontSizeCssString('small', isMobile, isTablet)}
              >
                Total Contributions
              </Typography>
              <Typography
                  className='poppins-medium'
                  color={'var(--main-color)'}
                  fontSize={buildFontSizeCssString('medium', isMobile, isTablet)}
              >
                {formatCurrency('$', false, calculateTotal().sumContributions)}
              </Typography>
            </Box>
            </Box>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: buildSpaceSizeCssString('tiny', isMobile, isTablet),
              marginBottom: buildSpaceSizeCssString('small', isMobile, isTablet),
              marginTop: buildSpaceSizeCssString('big', isMobile, isTablet)
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
                  height: isMobile ? '200px' : isTablet ? '327px' : '402px',
                  width: '100%'
                }}
                >
                  <CurvedLineChartComponent years={40} step={1} monthlyContributions={monthlyContribution}
                                            initialSavings={0} isMobile={isMobile} isTablet={isTablet}/>
                </div>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: buildSpaceSizeCssString('small', isMobile, isTablet),
                marginTop: buildSpaceSizeCssString('small', isMobile, isTablet)
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
                  <DoughnutChartControlledComponent years={40} monthlyContributions={monthlyContribution}
                                                    initialSavings={0} isMobile={isMobile} isTablet={isTablet}/>
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
          <>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              gap={buildSpaceSizeCssString('medium', isMobile, isTablet)}
              paddingLeft={buildCalculatedCssString(buildSpaceSizeCssString('medium', isMobile, isTablet), '*', '2.1')}
              paddingRight={buildSpaceSizeCssString('regular', isMobile, isTablet)}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
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
                  gap={buildSpaceSizeCssString('medium', isMobile, isTablet)}
                >
                  <Box>
                    <Typography
                      className='montserrat-medium'
                      fontSize={buildFontSizeCssString('regular', isMobile, isTablet)}
                      textAlign='center'
                    >
                      Your investment will<br/> be worth
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
              </Box>
              <Box
                  marginTop={buildSpaceSizeCssString('regular', isMobile, isTablet)}
                  marginBottom={buildSpaceSizeCssString('small', isMobile, isTablet)}
                  sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
              >
                <Box
                    display='flex'
                    flexDirection='column'
                    width='100%'
                    alignItems="center"
                    justifyContent='center'
                    gap={buildCalculatedCssString(buildSpaceSizeCssString('small', isMobile, isTablet), '*', '2')} textAlign='center'
                    marginLeft={buildSpaceSizeCssString(isMobile || isTablet ? 'regular' : 'medium', isMobile, isTablet)}
                    marginRight={buildSpaceSizeCssString(isMobile || isTablet ? 'regular' : 'medium', isMobile, isTablet)}
                    marginTop={buildCalculatedCssString(buildSpaceSizeCssString('medium', isMobile, isTablet))}
                >
                  <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent='center'
                      width={isMobile ? '120px' : isTablet ? '208px' : '305px'}
                  >
                    <img
                        src={money}
                        alt="Total Interest Earned"
                        width={isMobile ? '27px' : isTablet ? '35px' : '85px'}
                        height={isMobile ? '27px' : isTablet ? '35px' : '85px'}
                    />
                    <Typography
                        className='montserrat-regular'
                        fontSize={buildFontSizeCssString('small', isMobile, isTablet)}
                    >
                      Total Interest Earned
                    </Typography>
                    <Typography
                      className='poppins-medium'
                      color={'var(--main-color)'}
                      fontSize={buildFontSizeCssString('medium', isMobile, isTablet)}
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
                      width={isMobile ? '27px' : isTablet ? '35px' : '75px'}
                      height={isMobile ? '27px' : isTablet ? '35px' : '75px'}
                    />
                    <Typography
                      className='montserrat-regular'
                      fontSize={buildFontSizeCssString('small', isMobile, isTablet)}
                    >
                      Total Contributions
                    </Typography>
                    <Typography
                      className='poppins-medium'
                      color={'var(--main-color)'}
                      fontSize={buildFontSizeCssString('medium', isMobile, isTablet)}
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
          alignItems="center"
          gap={buildSpaceSizeCssString('medium', isMobile, isTablet)}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '500px',
              gap: buildSpaceSizeCssString('small', isMobile, isTablet),
              marginBottom: buildSpaceSizeCssString('small', isMobile, isTablet),
              marginTop: buildSpaceSizeCssString('small', isMobile, isTablet),
              marginRight: buildSpaceSizeCssString('big', isMobile, isTablet)
            }}
          >
            <Typography
              className='montserrat-regular'
              fontSize={buildFontSizeCssString('small', isMobile, isTablet)}
              align={'center'}
            >
              Investment Growth <br/>Over Time
            </Typography>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: isMobile ? '200px' : isTablet ? '327px' : '402px',
              width: '100%'
            }}
            >
              <CurvedLineChartComponent
                years={50}
                step={10}
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
            justifyContent: 'center',
            alignItems: 'center',
            gap: buildSpaceSizeCssString('small', isMobile, isTablet),
            marginBottom: buildSpaceSizeCssString('small', isMobile, isTablet),
            marginTop: buildSpaceSizeCssString('big', isMobile, isTablet)}}
          >
            <Typography
              className='montserrat-regular'
              fontSize={buildFontSizeCssString('small', isMobile, isTablet)}
              align={'center'}
            >
              Investment Balance <br/>at Year {calculateEndYear(40)}
            </Typography>
            <div style={{
              position: 'relative', height: '450px',
              width: '340px'
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
                position: 'absolute', top: -150, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center', zIndex: '-1'}}
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
    </>
  );
}

export default UseWealthometer;