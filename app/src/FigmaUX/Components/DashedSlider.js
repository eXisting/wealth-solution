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
    height: 50,
    width: 50,
    backgroundColor: '#fff',
    border: '4px solid var(--main-color)',
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
  return (
    <SliderThumb {...other}>
      {children}
      {/* <Box
        backgroundColor={'var(--main-color)'} 
        width={'7.5px'} 
        height={'120px'} 
      /> */}
    </SliderThumb>
  );
}

AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
};

const generateLines = (numLines, highlightedIndex) => {
  const lines = [];
  for (let i = 0; i < numLines; i++) {
    let lineHeight = '30%'; // Default height for most lines
    if (i >= 3 || (i <= numLines - 3)) {
      if ((i + 1) % 4 === 0)
        lineHeight = '70%'; // Height for specific lines
    }

    const isHighlighted = i === highlightedIndex;
    const width = isHighlighted ? '7.5px' : '5px';
    const height = isHighlighted ? '75%' : lineHeight;

    lines.push(<Box key={i} 
      backgroundColor={i === highlightedIndex ? 'var(--main-color)' : '#D9D9D9'} 
      width={width} 
      height={height} 
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
  
  const space = 20;

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
    <Box ref={parentRef} height="200px" display="flex" alignItems={'center'} flexDirection="row" width={'100%'} justifyContent={'center'} gap={`${space}px`} position={'relative'}>
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
      <Typography className='montserrat-medium' 
        fontSize={buildFontSizeCssString('medium', isMobile, isTablet)}
        style={{ position: 'absolute', bottom: 0, left: '10%', marginBottom: '-2%' }}>{min}</Typography>
      <Typography className='montserrat-medium' 
        fontSize={buildFontSizeCssString('medium', isMobile, isTablet)}
        style={{ position: 'absolute', bottom: 0, right: '10%', marginBottom: '-2%' }}>{max}</Typography>
    </Box>
  );
};

export default DashedSlider;
