import {Button, Box, Typography, Divider} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { buildFontSizeCssString, buildSpaceSizeCssString } from '../Global/CssStrings';

import '../css/fonts.css';
import CircleButton from './CircleButton';

const StagesProgressSection = ({ decadeAgeRange, stageSelected, selectedStage, isMobile, isTablet }) => {
  const [selectedButton, setSelectedButton] = useState(selectedStage);
  const parentParentRef = useRef(null);

  const [isDarkMode, setIsDarkMode] = useState();

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'theme') {
        setIsDarkMode(event.newValue === 'dark');
      }
    };

    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
    
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };    
  }, []);

  useEffect(() => {
    setSelectedButton(selectedStage);
  }, [selectedStage]);

  const handleButtonClick = (buttonIndex) => {
    setSelectedButton(buttonIndex);
    stageSelected(buttonIndex);
  };

  return (
    <Box 
      ref={parentParentRef}
      width={'100%'}
    >
      <Box
        marginLeft={buildSpaceSizeCssString(isMobile ? 'regular' : 'medium', isMobile, isTablet)}
        marginRight={buildSpaceSizeCssString(isMobile ? 'regular' : 'medium', isMobile, isTablet)}
      >
      <Box
        marginLeft={buildSpaceSizeCssString(isMobile ? 'regular' : 'medium', isMobile, isTablet)}
        marginRight={buildSpaceSizeCssString(isMobile ? 'regular' : 'medium', isMobile, isTablet)}
        sx={{
          position: 'relative',
          // calculated by "heigh of the box - margin top - font size - circle height / 2"
          top: isMobile ? '20.8px' : isTablet ? '30px' : '24px',
          height: '7.78px',
          maxWidth: isMobile ? '240px' : '270px',
          margin: "0 auto",
          background: isDarkMode ? 'rgba(255,255,255, 0.2)' : 'rgba(0,0,0, 0.1)',
          zIndex: 0,
        }}
      />
      <Box
        display='flex'
        flexDirection='row'
        justifyContent="center"
        textAlign={'center'}
        alignItems="center"
        gap={'40px'}
        maxWidth={'350px'}
        margin="0 auto"
      >
        {[1, 2, 3].map((stage, index, array) => (
          <Box
            key={index} sx={{ position: 'relative' }}
            display='flex'
            flexDirection='column'
            justifyContent="center"
            textAlign={'center'}
            alignItems="center"
            width={'90px'}
          >
            <CircleButton
              isMobile={isMobile}
              isTablet={isTablet}
              mainBackgroundColor={isDarkMode ? '#333333' : '#D9D9D9'}
              mainColorSelected={'var(--main-color)'}
              secondaryColor={isDarkMode ? 'black' : '#FFFFFF'}
              secondaryColorSelected={isDarkMode ? 'black' :'#FFFFFF'}
              width={isMobile ? '26px' : isTablet ? '37px' : '30px'}
              height={isMobile ? '26px' : isTablet ? '37px' : '30px'}
              selected={selectedButton === index}
              increaseSize={true}
              onClick={() => {handleButtonClick(index)}}
            />
            <Box textAlign={'center'} marginTop={isMobile ? '18px' : isTablet ? '25px' : '35px'} >
              <Typography className='montserrat-medium'
                fontSize={isMobile ? '14px' : '16px'}
                color={selectedButton === index ? "var(--main-color)" : '#D9D9D9'}
              >
                DECADE {stage}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      </Box>
      <Box
        textAlign={'center'}
        alignItems="center"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography
          className='montserrat-bold'
          marginTop={buildSpaceSizeCssString('medium')}
          fontSize={isMobile ? '20px' : '28px'}
          color="var(--main-color)"
          width={'95%'}
        >
          Your savings between the ages of {decadeAgeRange.lowerBracketYears} to {decadeAgeRange.upperBracketYears}
        </Typography>
      </Box>
    </Box>
  );
};

export default StagesProgressSection;
