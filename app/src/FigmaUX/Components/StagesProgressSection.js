import {Button, Box, Typography, Divider} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { buildFontSizeCssString, buildSpaceSizeCssString } from '../Global/CssStrings';

import '../css/fonts.css';
import CircleButton from './CircleButton';

const StagesProgressSection = ({ decadeAgeRange, stageSelected, selectedStage, isMobile, isTablet }) => {
  const [selectedButton, setSelectedButton] = useState(selectedStage);
  const parentParentRef = useRef(null);

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
      marginLeft={buildSpaceSizeCssString(isMobile ? 'regular' : 'medium', isMobile, isTablet)} 
      marginRight={buildSpaceSizeCssString(isMobile ? 'regular' : 'medium', isMobile, isTablet)}
      marginBottom={buildSpaceSizeCssString('small')}
    >
      <Box
        display='flex'
        flexDirection='row'
        justifyContent="center"
        textAlign={'center'}
        alignItems="center"
        marginLeft={buildSpaceSizeCssString(isMobile ? 'regular' : 'medium', isMobile, isTablet)}
        marginRight={buildSpaceSizeCssString(isMobile ? 'regular' : 'medium', isMobile, isTablet)}
      >
        {[1, 2, 3].map((stage, index, array) => (
          <Box
            key={index} sx={{ position: 'relative' }}
            marginLeft={buildSpaceSizeCssString('regular', isMobile, isTablet)}
            marginRight={buildSpaceSizeCssString('regular', isMobile, isTablet)}
          >
            <CircleButton
              isMobile={isMobile}
              isTablet={isTablet}
              mainBackgroundColor={'#D9D9D9'}
              mainColorSelected={'var(--main-color)'}
              secondaryColor={'#FFFFFF'}
              secondaryColorSelected={'#FFFFFF'}
              width={isMobile ? '26px' : isTablet ? '37px' : '30px'}
              height={isMobile ? '26px' : isTablet ? '37px' : '30px'}
              selected={selectedButton === index}
              increaseSize={true}
              onClick={() => {handleButtonClick(index)}}
            />
            <Box textAlign={'center'} marginTop={isMobile ? '18px' : isTablet ? '25px' : '35px'} >
              <Typography className='montserrat-medium'
                fontSize={isMobile ? '8px' : isTablet ? '13px' : '18px'}
                color={selectedButton === index ? "var(--main-color)" : '#D9D9D9'}
              >
                DECADE {stage}
              </Typography>
            </Box>
          </Box>
        ))}
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
          fontSize={buildFontSizeCssString(isMobile ? 'strong' : 'medium', isMobile, isTablet)}
          color="var(--main-color)"
        >
          Your savings between the ages {decadeAgeRange.lowerBracketYears} and {decadeAgeRange.upperBracketYears}
        </Typography>
      </Box>
    </Box>
  );
};

export default StagesProgressSection;
