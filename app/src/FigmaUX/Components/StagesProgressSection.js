import { Button, Box, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
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
      paddingBottom={isMobile ? '8rem' : isTablet ? '10rem' : '12rem'}
    >
      <Box display='flex' flexDirection='row' justifyContent="space-between" textAlign={'center'} alignItems="center">
        {[1, 2, 3].map((stage, index, array) => (
          <Box key={index} sx={{ position: 'relative' }} 
            height={isMobile ? '113px' : isTablet ? '156px' : '187px'}
          >
            <CircleButton
              isMobile={isMobile}
              isTablet={isTablet}
              mainBackgroundColor={'#D9D9D9'}
              mainColorSelected={'var(--main-color)'}
              secondaryColor={'#FFFFFF'}
              secondaryColorSelected={'#FFFFFF'}
              width={isMobile ? '26px' : isTablet ? '37px' : '51px'}
              height={isMobile ? '26px' : isTablet ? '37px' : '51px'}
              selected={selectedButton === index}
              increaseSize={true}
              onClick={() => {handleButtonClick(index)}}
            />
            <Box textAlign={'center'} marginTop={isMobile ? '18px' : isTablet ? '25px' : '35px'} >
              <Typography className='montserrat-medium'
                fontSize={isMobile ? '12px' : isTablet ? '18px' : '26px'}
                color="var(--main-color)"
              >
                DECADE {stage}
              </Typography>
              {selectedButton === index && (
              <Typography className='montserrat-bold'
                  marginTop='35px'
                  fontSize={buildFontSizeCssString(isMobile ? 'strong' : 'medium', isMobile, isTablet)}
                  color="var(--main-color)"
                >
                  ▲
                </Typography>)}
            </Box>
            {selectedButton === index && (
              <Box 
                width={'60vw'} marginTop={isMobile || isTablet ? '15px' : '25px'} 
                sx={{ position: 'absolute', 
                  transform: `translateX(-${index * 40}%)`,
                  textAlign: index === 0 ? 'left' : index === 1 ? 'center' : "end",
                  display: 'flex', justifyContent: 'center', flexDirection: 'column' 
                }}
                >
                <Typography className='montserrat-bold'
                  fontSize={buildFontSizeCssString(isMobile ? 'strong' : 'medium', isMobile, isTablet)}
                  color="var(--main-color)"
                >
                  Your savings between the <br/> ages {decadeAgeRange.lowerBracketYears} and {decadeAgeRange.upperBracketYears}
                </Typography>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default StagesProgressSection;
