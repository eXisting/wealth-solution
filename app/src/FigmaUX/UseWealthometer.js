import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Typography, Box, useMediaQuery } from '@mui/material';
import { calculateEndYear, currentDate, currentDayFormatted, formatCurrency, trimToInt } from './Global/Global';
import CircleSlider from './Components/CircleSlider';
import CurvedLineChartControlledComponent from './Components/CurvedLineChartControlledComponent';
import PieChartControlledComponent from './Components/PieChartControlledComponent';
import NavigationHeaderComponent from './Components/NavigationHeaderComponent';
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
import NavigationFooterComponent from './Components/NavigationFooterComponent';


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
      <NavigationHeaderComponent isMobile={isMobile} isTablet={isTablet}></NavigationHeaderComponent>
      <Box display="flex" flexDirection="column" paddingLeft={buildSpaceSizeCssString('regular', isMobile, isTablet)} 
        paddingRight={buildSpaceSizeCssString('regular', isMobile, isTablet)} marginTop={buildSpaceSizeCssString('small', isMobile, isTablet)}>
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
          // marginTop={'-3.5rem'}
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
              fontSize={buildFontSizeCssString(isMobile || isTablet ? 'regular' : 'tiny', isMobile, isTablet)}
              textAlign='center'
            >
              (over 40 years)
            </Typography>
          </Box>
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
            <CurvedLineChartControlledComponent years={40} step={10} monthlyContributions={monthlyContribution} initialSavings={0}/>
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
            <PieChartControlledComponent years={40} monthlyContributions={monthlyContribution} initialSavings={0} isMobile={isMobile} isTablet={isTablet}/>
          </div>
        </div>
      </Box>
      <NavigationFooterComponent isMobile={isMobile} isTablet={isTablet}></NavigationFooterComponent>
    </>
  );
}

export default UseWealthometer;