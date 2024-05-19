import { RoundSlider } from 'mz-react-round-slider';
import { useState } from 'react';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { buildFontSizeCssString, buildCalculatedCssString, buildSpaceSizeCssString } from '../Global/CssStrings';

import '../css/fonts.css';
import '../css/components.css'

const GradientSliderFullComponent = ({ min, max, initialValue, step, sign = '$', titleText, updateRedux }) =>
{
  const theme = useTheme();

  const [ pointers, setPointers ] = useState([{ value: initialValue }]);
  const [displayedValue, setDisplayedValue] = useState(initialValue);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const increment = (interval, max) => {
    setPointers(prevPointers => {
      const newPointers = [...prevPointers];
      newPointers[0] = { ...newPointers[0], value: newPointers[0].value + interval };
      if (newPointers[0].value <= max) {
        setDisplayedValue(newPointers[0].value);
        updateRedux(newPointers[0].value);
        return newPointers;
      } else {
        return prevPointers;
      }
    });
  };
  
  const decrement = (interval, min) => {
    setPointers(prevPointers => {
      const newPointers = [...prevPointers];
      newPointers[0] = { ...newPointers[0], value: newPointers[0].value - interval };
      if (newPointers[0].value >= min) {
        setDisplayedValue(newPointers[0].value);
        updateRedux(newPointers[0].value);
        return newPointers;
      } else {
        return prevPointers;
      }
    });
  };

  const data = [];
  for (let value = min; value <= max; value += step) {
    data.push(value);
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        display="flex"
        flexDirection={"row"}
        width={'100%'}
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          variant="contained"
          sx={{
            padding:`${buildCalculatedCssString(buildSpaceSizeCssString('small', isMobile, isTablet), '*', "0.5")}`,
            borderRadius: '50%',
            minWidth: 'unset',
            backgroundColor: '#F6F7F7' }}
          onClick={() => {decrement(step, min)}}
        >
          <Remove
            sx={{fill:'#9D9D9D'}}
          />
        </Button>
        <Typography
          className='montserrat-regular'
          marginLeft={buildSpaceSizeCssString('regular', isMobile, isTablet)}
          marginRight={buildSpaceSizeCssString('regular', isMobile, isTablet)}
          fontSize={isMobile ?
            buildFontSizeCssString('strong', isMobile, isTablet) : buildFontSizeCssString('regular', isMobile, isTablet)} sx={{ flexGrow: 1, textAlign: 'center' }}
        >
          {titleText}
        </Typography>
        <Button
          variant="contained"
          sx={{
            padding:`${buildCalculatedCssString(buildSpaceSizeCssString('small', isMobile, isTablet), '*', "0.5")}`,
            borderRadius: '50%',
            minWidth: 'unset',
            backgroundColor: '#F6F7F7' }}
          onClick={() => {increment(step, max)}}
        >
          <Add sx={{fill:'#9D9D9D'}} />
        </Button>
      </Box>
      <RoundSlider
        pointers={pointers}
        onChange={newPointers => {
          setPointers(newPointers);
          setDisplayedValue(newPointers[0].value);
          updateRedux(newPointers[0].value);
        }}
        pathStartAngle={ 15 }
        pathEndAngle={ 375 }
        animateOnClick={ true }
        pathThickness={ isMobile ? 24 : isTablet ? 50 : 60 }

        connectionBgColor={'var(--main-color)'}
        pointersOverlap={false}
        
        pathBgColor={'#33CBCC'}
        pointerBgColor={'var(--main-color)'}
        pointerBgColorSelected={'var(--main-color)'}
        pointerBgColorHover={'var(--main-color)'}
        
        pointerBorderColor={'white'}
        pointerBorder={isMobile ? 2 : isTablet ? 3 : 4}
        pointerRadius={isMobile ? 20 : isTablet ? 32 : 35}
        pathRadius={isMobile ? 80 : isTablet ? 130 : 120 }
        
        hideText={true}
        textPrefix={sign}
        textColor={'black'}
        textFontSize={isMobile ? 25 : isTablet ? 36 : 50} 
        textFontFamily={"'Poppins', sans-serif"}

        mousewheelDisabled={true}
        data={data}
        min={ min }
        max={ max }
      >
      </RoundSlider>
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'start',
          textAlign:'center',
          marginTop: isMobile ? '60px' : isTablet ? "70px" : '65px'
        }}
      >
        <Typography
          className='poppins-medium'
          fontSize={buildFontSizeCssString('big', isMobile, isTablet)}
          sx={{ textAlign: 'center' }}
        >{`${displayedValue}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default GradientSliderFullComponent;
