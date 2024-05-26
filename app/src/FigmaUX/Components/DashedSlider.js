import React, { useEffect, useState, useRef } from 'react';
import {Box, createTheme, Typography, useMediaQuery, useTheme} from '@mui/material';
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import styled from 'styled-components';
import { buildFontSizeCssString } from '../Global/CssStrings';

const CustomThumbSlider = styled(Slider)(({ width }) => ({
  position: 'absolute !important',
  width: `${width}px !important`,
  '& .MuiSlider-thumb': {
    height: '50px',
    width: '60px',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
  },
  '& .MuiSlider-track': {
    display: 'none'
  },
  '& .MuiSlider-rail': {
    display: 'none'
    // color: '#bfbfbf',
    // opacity: 1,
    // height: 3,
  },
}));

function AirbnbThumbComponent(props) {
  const { children, ...other } = props;

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

  const size = isMobile ? '25px' : isTablet ? '40px' : '35px';

  return (
    <SliderThumb sx={{width: `${size} !important`, height: `${size} !important`}} {...other} >
      <Box
        position={'absolute'}
        backgroundColor={'var(--main-color)'} 
        width={isMobile ? '4.25px' : isTablet ? '7.25px' : '6px'}
        height={isMobile ? '81px' : isTablet ? '120px' : '110px'}
        zIndex={1}
      />
      <Box 
      width={size}
      height={size}
        backgroundColor={isDarkMode ? 'black' : 'white'}
        position={'absolute'}
        border={`${isMobile ? '4px' : '6px'} solid var(--main-color)`}
        borderRadius={'50%'} zIndex={2}>
      </Box>
      {children}
    </SliderThumb>
  );
}

AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
};

const generateLines = (isDarkMode, numLines, highlightedIndex) => {
  const lines = [];
  for (let i = 0; i < numLines; i++) {
    let lineHeight = '40%'; // Default height for most lines
    if (i >= 3 || (i <= numLines - 3)) {
      if ((i + 1) % 4 === 0)
        lineHeight = '100%'; // Height for specific lines
    }

    lines.push(<Box key={i} 
      backgroundColor={isDarkMode ? 'rgba(255,255,255, 0.2)' : 'rgba(0,0,0, 0.2)'} 
      width={'5px'}
      height={lineHeight} 
    />);
  }
  return lines;
};

const DashedSlider = ({min, max, reduxValue, updateRedux}) => {
  const parentRef = useRef(null);

  const [numLines, setNumLines] = useState(1);
  const [value, setValue] = useState(reduxValue);
  const [highlightedIndex, setHighlightedIndex] = useState(calculateHighlightedIndex(value));
  
  const space = 13;

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
    const handleResize = () => {
      let newNumLines = calculateNumberOfLines(); 

      setHighlightedIndex(calculateHighlightedIndex(reduxValue, newNumLines));
      setNumLines(newNumLines);
    };

    const handleStorageChange = (event) => {
      if (event.key === 'theme') {
        setIsDarkMode(event.newValue === 'dark');
      }
    };

    handleResize();
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('storage', handleStorageChange);
    };    
  }, []);

  useEffect(() => {
    setHighlightedIndex(calculateHighlightedIndex(reduxValue, calculateNumberOfLines()));
  }, [reduxValue, numLines, isDarkMode]);

  function calculateNumberOfLines() {
    const parentWidth = parentRef.current.clientWidth;
    const max = Math.floor(parentWidth / (space + 5 + 1)); // Calculate the maximum number of lines that can fit
    return Math.floor(max / 4) * 4 - 1; // Ensure the new number of lines is divisible by 4
  }

  function calculateHighlightedIndex(newValue, lines) {
    let index = Math.floor((newValue - min) / ((max - min) / lines));
    if (index <= 0)
      index = 0;
    else if (index >= lines) 
      index = lines - 1;
    
    return index;
  }

  return (
    <Box
        ref={parentRef}
        height={isMobile ? '57px' : isTablet ? '90px' : '80px'}
        width={'100%'}
        display="flex"
        alignItems={'center'}
        flexDirection="row"
        justifyContent={'center'}
        gap={`${space}px`}
        position={'relative'}
    >
      {generateLines(isDarkMode, numLines, highlightedIndex)}
      <CustomThumbSlider
        slots={{ thumb: AirbnbThumbComponent }}
        width={numLines * 5 + (numLines - 1) * space}
        value={Math.round(reduxValue)}
        min={min}
        max={max}
        onChange={(event, newValue) => {
          setValue(newValue);
          setHighlightedIndex(calculateHighlightedIndex(newValue, calculateNumberOfLines()));
          updateRedux(Math.round(newValue));
        }}
        step={(max - min) / (numLines - 1)}
        defaultValue={Math.round(reduxValue)}
      />
      <Typography className='montserrat-regular'
        color={'var(--main-color)'} 
        fontSize={buildFontSizeCssString('regular', isMobile, isTablet)}
        style={{ position: 'absolute', bottom: isTablet ? '0' : '-10%', left: '10%', marginBottom: '-10%' }}
      >
        {min.toLocaleString()}
      </Typography>
      <Typography className='montserrat-regular'
        color={'var(--main-color)'}
        fontSize={buildFontSizeCssString('regular', isMobile, isTablet)}
        style={{ position: 'absolute', bottom: isTablet ? '0' : '-10%', right: '10%', marginBottom: '-10%' }}
      >
        {max.toLocaleString()}
      </Typography>
    </Box>
  );
};

export default DashedSlider;
