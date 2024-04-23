import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CircularSliderWithChildren } from "react-circular-slider-svg";
import { formatCurrency, trimToInt } from '../Global/Global';
import { Add, Remove } from '@mui/icons-material';
import { buildFontSizeCssString } from '../Global/CssStrings';

import '../css/fonts.css';
import '../css/components.css';

const CircleSlider = ({ isMobile, isTablet, min, max, initialValue, step, sign = '$', titleText, updateRedux }) => {
  const [value1, setValue1] = useState(initialValue);

  useEffect(() => {
    setValue1(initialValue);
  }, [initialValue]);

  function handleValueIsSet() {
    updateRedux(trimToInt(value1));
  }
  
  const setValue1WithLimits = (newValue) => {
    const limit = max;
    const currentValue = value1;

    if (newValue > currentValue + limit) {
      // the handle is probably crossing over from 0% -> 100%, don't move it
      setValue1(currentValue);
    } else if (newValue < currentValue - limit) {
      // the handle is probably crossing over from 100% -> 0%, don't move it
      setValue1(currentValue);
    } else {
      setValue1(newValue);
    }
  };

  const increment = (interval, max) => {
    const newValue = value1 + interval;
    
    if (newValue <= max) {
      setValue1(newValue);
      updateRedux(newValue);
    }
  };

  const decrement = (interval, min) => {
    const newValue = value1 - interval;
    
    if (newValue >= min) {
      setValue1(newValue);
      updateRedux(newValue);
    }
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
      <CircularSliderWithChildren
        size={isMobile ? 300 : isTablet ? 450 : 550}
        trackWidth={16}
        minValue={min}
        maxValue={max}
        startAngle={50}
        endAngle={310}
        coerceToInt={true}
        angleType={{
          direction: "cw",
          axis: "-y"
        }}
        handle1={{
          value: value1,
          onChange: v => setValue1WithLimits(v)
        }}
        onControlFinished={handleValueIsSet}
        arcColor="blue"
        arcBackgroundColor="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(8,142,43,1) 45%, rgba(0,212,255,1) 100%)"
      >
        <Box
            sx={{
              display: 'flex',
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
              formatCurrency('$', undefined, value1).substring(1)}
            </Typography>
          </Box>
      </CircularSliderWithChildren>
    </Box>
  );
};

export default CircleSlider;
