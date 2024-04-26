import { RoundSlider } from 'mz-react-round-slider';
import { useState } from 'react';
import { formatCurrency } from '../Global/Global';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { buildFontSizeCssString } from '../Global/CssStrings';

import '../css/fonts.css';
import '../css/components.css'

const GradientSliderComponent = ({ min, max, initialValue, step, sign = '$', titleText, updateRedux }) => {
  const theme = useTheme();

  const [ pointers, setPointers ] = useState([{ value: initialValue }]);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const increment = (interval, max) => {
    setPointers(prevPointers => {
      const newPointers = [...prevPointers];
      newPointers[0] = { ...newPointers[0], value: newPointers[0].value + interval };
      if (newPointers[0].value <= max) {
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
        updateRedux(newPointers[0].value);
        return newPointers;
      } else {
        return prevPointers;
      }
    });
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box display="flex" flexDirection={"row"} width={'100%'} alignItems="center" justifyContent="space-between">
        <Button
          variant="contained"
          width={isMobile ? '40px' : isTablet ? '60px' : '90px'}
          height={isMobile ? '40px' : isTablet ? '60px' : '90px'}
          sx={{ padding:`${isMobile ? '11px' : isTablet ? '16px' : '25px'}`, borderRadius: '50%', minWidth: 'unset', backgroundColor: '#F6F7F7' }}
          onClick={() => {decrement(step, min)}}
        >
          <Remove sx={{fill:'#9D9D9D'}} />
        </Button>
        <Typography
          className='montserrat-regular'
          fontSize={isMobile ? 
            buildFontSizeCssString('strong', isMobile, isTablet) : buildFontSizeCssString('medium', isMobile, isTablet)} sx={{ flexGrow: 1, textAlign: 'center' }}
        >
            {titleText}
        </Typography>
        <Button
          variant="contained"
          width={isMobile ? '40px' : isTablet ? '60px' : '90px'}
          height={isMobile ? '40px' : isTablet ? '60px' : '90px'}
          sx={{ padding:`${isMobile ? '11px' : isTablet ? '16px' : '25px'}`, borderRadius: '50%', minWidth: 'unset', backgroundColor: '#F6F7F7' }}
          onClick={() => {increment(step, max)}}
        >
          <Add sx={{fill:'#9D9D9D'}} />
        </Button>
      </Box>
      <RoundSlider
        pointers={pointers}
        onChange={newPointers => {
          setPointers(newPointers);
        }}
        animateOnClick={ true }
        pathStartAngle={ 140 }
        pathEndAngle={ 40 }
        pathThickness={ 16 }
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
        pointerRadius={isMobile ? 15 : isTablet ? 18 : 25}
        pathRadius={isMobile ? 150 : isTablet ? 200 : 250 }
        
        hideText={true}
        textPrefix={sign}
        textColor={'black'}
        textFontSize={isMobile ? 25 : isTablet ? 36 : 50} 
        textFontFamily={"'Poppins', sans-serif"}

        mousewheelDisabled={true}
        step={step}
        min={ min }
        max={ max }
      >
      </RoundSlider>
      <Box
          sx={{
            display: 'flex',
            position: 'absolute',
            zIndex: -1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign:'center',
            height: '100%',
            width: '100%',
          }}
      >
        <Typography 
          className='poppins-medium'
          color={'var(--main-color)'}
          fontSize={isMobile ? 
            '25px' : isTablet ? '36px' : '50px'} 
          sx={{ textAlign: 'center' }}
        >
          {sign}
        </Typography>
        <Typography
          className='poppins-medium'
          fontSize={!isMobile && !isTablet ? '100px' : buildFontSizeCssString('big', isMobile, isTablet)}
          sx={{ textAlign: 'center' }}
        >{
          formatCurrency('$', undefined, pointers[0].value)}
        </Typography>
      </Box>
    </Box>
  );
};

export default GradientSliderComponent;
