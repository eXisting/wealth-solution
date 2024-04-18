import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Typography, Box, useMediaQuery } from '@mui/material';
import { currentDayFormatted, formatCurrency, trimToInt } from './Global/Global';
import CircleSlider from './Components/CircleSlider';
import CurvedLineChartControlledComponent from './Components/CurvedLineChartControlledComponent';
import PieChartControlledComponent from './Components/PieChartControlledComponent';
import NavigationHeaderComponent from './Components/NavigationHeaderComponent';
import { calculateSavings } from './Global/Math';
import { buildFontSizeCssString, buildSpaceSizeCssString } from './Global/CssStrings';

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
  const navigate = useNavigate();

  const isMobile = useMediaQuery('(max-width:744px)');
  const isTablet = useMediaQuery('(max-width:1224px)');

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
      <NavigationHeaderComponent margin={'-8px'}></NavigationHeaderComponent>
      <Box display="flex" flexDirection="column" padding={buildSpaceSizeCssString('regular', isMobile, isTablet)}>
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
        <CircleSlider 
          isMobile={isMobile}
          isTablet={isTablet}
          min={0} max={20000} 
          step={100}
          initialValue={trimToInt(monthlyContribution)} 
          titleText={"Monthly Savings"}
          updateRedux={handleUpdateContributions} 
        />
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" 
          marginTop={'-3.5rem'}
          gap={buildSpaceSizeCssString('medium', isMobile, isTablet)}>
          <Box>
            <Typography 
              className='montserrat-medium'
              fontSize={
                isMobile ? '14px' : isTablet ? buildFontSizeCssString('regular', isMobile, isTablet) : '26px'}
              textAlign='center'
            >
              Your investment will<br /> be worth
            </Typography>
            <Typography 
              className='poppins-medium'
              color='var(--main-color)'
              fontSize={
                isMobile ? buildFontSizeCssString('big', isMobile, isTablet) 
                : isTablet ? buildFontSizeCssString('strong', isMobile, isTablet) : '80px'}
              textAlign='center'
            >
              {formatCurrency('$', false, calculateTotal().sum)}
            </Typography>
            <Typography 
              className='montserrat-regular'
              fontSize={
                isMobile || isTablet ? buildFontSizeCssString('regular', isMobile, isTablet) : buildFontSizeCssString('tiny', isMobile, isTablet)}
              textAlign='center'
            >
              (over 40 years)
            </Typography>
          </Box>
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
          <CurvedLineChartControlledComponent years={40} step={10} monthlyContributions={monthlyContribution} initialSavings={0}/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30rem', margin: '2rem', paddingBottom:'3rem' }}>
          <PieChartControlledComponent years={40} monthlyContributions={monthlyContribution} initialSavings={0}/>
        </div>
      </Box>
    </>
  );
}

export default UseWealthometer;