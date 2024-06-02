import { RoundSlider } from 'mz-react-round-slider';
import { useEffect, useState } from 'react';
import { formatCurrency } from '../Global/Global';
import {Box, Button, createTheme, Typography, useMediaQuery, useTheme} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { buildCalculatedCssString, buildFontSizeCssString, buildSpaceSizeCssString } from '../Global/CssStrings';

import '../css/fonts.css';
import '../css/components.css'

const GradientSliderComponent = ({ min, max, initialValue, step, sign = '$', titleText, updateRedux }) => {
  const [pointers, setPointers ] = useState([{ value: initialValue }]);
  const [displayedValue, setDisplayedValue] = useState(initialValue);

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
    setPointers([{ value: initialValue }]);
    setDisplayedValue(initialValue);
  }, [initialValue]);

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
      width={'100%'}
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
            padding:buildCalculatedCssString(buildSpaceSizeCssString('small', isMobile, isTablet), '*', "0.5"),
            borderRadius: '50%',
            minWidth: 'unset',
            backgroundColor: isDarkMode ? 'rgba(255,255,255, 0.1)' : '#F6F7F7' }}
          onClick={() => {decrement(step, min)}}
        >
          <Remove sx={{fill: isDarkMode ? 'white' : '#9D9D9D'}} />
        </Button>
        <Typography
          className='montserrat-regular'
          marginLeft={buildSpaceSizeCssString('regular', isMobile, isTablet)}
          marginRight={buildSpaceSizeCssString('regular', isMobile, isTablet)}
          fontSize={ isMobile ? '20px' : '27px' }
          sx={{ flexGrow: 1, textAlign: 'center' }}
        >
            {titleText}
        </Typography>
        <Button
          variant="contained"
          sx={{
            padding:buildCalculatedCssString(buildSpaceSizeCssString('small', isMobile, isTablet), '*', "0.5"),
            borderRadius: '50%',
            minWidth: 'unset',
            backgroundColor: isDarkMode ? 'rgba(255,255,255, 0.1)' : '#F6F7F7' }}
          onClick={() => {increment(step, max)}}
        >
          <Add sx={{fill: isDarkMode ? 'white' : '#9D9D9D'}} />
        </Button>
      </Box>
      <RoundSlider
        pointers={pointers}
        onChange={newPointers => {
          setPointers(newPointers);
          setDisplayedValue(newPointers[0].value);
          updateRedux(newPointers[0].value);
        }}
        animateOnClick={ true }
        pathStartAngle={ 140 }
        pathEndAngle={ 40 }
        pathThickness={ isMobile ? 23 : isTablet ? 27 : 25 }
        SvgDefs={
          <linearGradient 
              id="color-slider-gradient" 
              x1="90%" 
              y1="100%" 
              x2="0%" 
              y2="10%">
              <stop 
                  offset="0%" 
                  stopColor={ `#4A7DE2` } />
              <stop 
                  offset="100%" 
                  stopColor={ `#33CBCC` } />
          </linearGradient>
        }
        hideConnection={true}
        
        pathBgColor={'url(#color-slider-gradient)'}
        pointerBgColor={'var(--main-color)'}
        pointerBgColorSelected={'var(--main-color)'}
        pointerBgColorHover={'var(--main-color)'}
        
        pointerBorderColor={'white'}
        pointerBorder={isMobile ? 2 : isTablet ? 3 : 4}
        pointerRadius={isMobile ? 17 : isTablet ? 25 : 25}
        pathRadius={isMobile ? 160 : isTablet ? 215 : 200 }
        
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
            alignItems: 'center',
            justifyContent: 'center',
            textAlign:'center',
          }}
      >
        <Typography 
          className='montserrat-bold'
          color={'var(--main-color)'}
          fontSize={isMobile ? '28px' : '40px'}
          sx={{ textAlign: 'center' }}
        >
          {sign}
        </Typography>
        <Typography
          className='montserrat-medium'
          fontSize={isMobile ? '48px' : '80px'}
          sx={{ textAlign: 'center' }}
        >{
          formatCurrency('', undefined, displayedValue)}
        </Typography>
      </Box>
    </Box>
  );
};

export default GradientSliderComponent;
