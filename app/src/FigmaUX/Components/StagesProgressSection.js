import { Button, Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { buildFontSizeCssString, buildSpaceSizeCssString } from '../Global/CssStrings';

import '../css/fonts.css';

const StagesProgressSection = ({ decadeAgeRange, stageSelected, selectedStage, isMobile, isTablet }) => {
  const [selectedButton, setSelectedButton] = useState(selectedStage);

  useEffect(() => {
    setSelectedButton(selectedStage);
  }, [selectedStage]);

  const handleButtonClick = (buttonIndex) => {
    setSelectedButton(buttonIndex);
    stageSelected(buttonIndex);
  };

  return (
    <Box marginLeft={buildSpaceSizeCssString(isMobile ? 'regular' : 'medium', isMobile, isTablet)} 
      marginRight={buildSpaceSizeCssString(isMobile ? 'regular' : 'medium', isMobile, isTablet)}
      paddingBottom={isMobile ? '8rem' : isTablet ? '10rem' : '12rem'}
    >
      <Box display='flex' flexDirection='row' justifyContent="space-between" textAlign={'center'} alignItems="center">
        {[1, 2, 3].map((stage, index) => (
          <Box key={index} sx={{ position: 'relative' }}>
            <Button
              variant="contained"
              sx={{
                position: 'relative',
                borderRadius: '50%',
                p: 0,
                minWidth: 0,
                width: isMobile ? '26px' : isTablet ? '37px' : '51px',
                height: isMobile ? '26px' : isTablet ? '37px' : '51px',
                backgroundColor: selectedButton === index ? 'var(--main-color)' : '#D9D9D9',
                '&:hover': {
                  backgroundColor: 'var(--main-color)',
                }
              }}
              onClick={() => handleButtonClick(index)}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 'calc(100% - 10px)',
                  height: 'calc(100% - 10px)',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                }}/>
            </Button>
            <Box textAlign={'center'} marginTop={isMobile ? '18px' : isTablet ? '25px' : '35px'} >
              <Typography className='montserrat-medium'
                fontSize={isMobile ? '12px' : isTablet ? '18px' : '26px'}
                color="var(--main-color)"
              >
                DECADE {stage}
              </Typography>
            </Box>
            {selectedButton === index && (
              <Box 
                width={'50vw'} marginTop={isMobile || isTablet ? '15px' : '25px'} 
                sx={{ position: 'absolute', 
                  transform: `translateX(-${index * 40}%)`,
                  textAlign: index === 0 ? 'left' : index === 1 ? 'center' : "end",
                  display: 'flex', justifyContent: 'center', flexDirection: 'column' 
                }}
                >
                <Typography className='montserrat-bold'
                  fontSize={buildFontSizeCssString(isMobile ? 'strong' : 'medium', isMobile, isTablet)}
                  color="var(--main-color)"
                  marginLeft={index === 0 ? '5%' : '0px'}
                  marginRight={index === 2 ? '5%' : '0px'}
                >
                  ▲
                </Typography>
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
