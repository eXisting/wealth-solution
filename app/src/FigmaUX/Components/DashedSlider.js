import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import styled from 'styled-components';
import { buildFontSizeCssString } from '../Global/CssStrings';

const CustomThumbSlider = styled(Slider)(({ width }) => ({
  color: '#3a8589',
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
  const theme = useTheme();
  const { children, ...other } = props;

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const size = isMobile ? '37px' : isTablet ? '62px' : '40px';

  return (
    <SliderThumb sx={{width: `${size} !important`, height: `${size} !important`}} {...other} >
      <Box
        position={'absolute'}
        backgroundColor={'var(--main-color)'} 
        width={isMobile ? '4.25px' : isTablet ? '7.25px' : '6px'}
        height={isMobile ? '91px' : isTablet ? '150px' : '130px'}
        zIndex={1}
      />
      <Box 
      width={size}
      height={size}
        backgroundColor='#fff'
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

const generateLines = (numLines, highlightedIndex) => {
  const lines = [];
  for (let i = 0; i < numLines; i++) {
    let lineHeight = '60%'; // Default height for most lines
    if (i >= 3 || (i <= numLines - 3)) {
      if ((i + 1) % 4 === 0)
        lineHeight = '100%'; // Height for specific lines
    }

    lines.push(<Box key={i} 
      backgroundColor={'#D9D9D9'} 
      width={'5px'}
      height={lineHeight} 
    />);
  }
  return lines;
};

const DashedSlider = ({min, max, reduxValue, updateRedux}) => {
  const theme = useTheme();
  const parentRef = useRef(null);

  const [numLines, setNumLines] = useState(1);
  const [value, setValue] = useState(reduxValue);
  const [highlightedIndex, setHighlightedIndex] = useState(calculateHighlightedIndex(value));
  
  const space = 13;

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  useEffect(() => {
    const handleResize = () => {
      let newNumLines = calculateNumberOfLines(); 

      setHighlightedIndex(calculateHighlightedIndex(reduxValue, newNumLines));
      setNumLines(newNumLines);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };    
  }, []);

  useEffect(() => {
    setHighlightedIndex(calculateHighlightedIndex(reduxValue, calculateNumberOfLines()));
  }, [reduxValue, numLines]);

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
      {generateLines(numLines, highlightedIndex)}
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
        style={{ position: 'absolute', bottom: '-10%', left: '10%', marginBottom: '-10%' }}
      >
        {min.toLocaleString()}
      </Typography>
      <Typography className='montserrat-regular'
        color={'var(--main-color)'}
        fontSize={buildFontSizeCssString('regular', isMobile, isTablet)}
        style={{ position: 'absolute', bottom: '-10%', right: '10%', marginBottom: '-10%' }}
      >
        {max.toLocaleString()}
      </Typography>
    </Box>
  );
};

export default DashedSlider;
