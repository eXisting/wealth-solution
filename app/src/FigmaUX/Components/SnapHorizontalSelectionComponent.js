import React, { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useMediaQuery, useTheme } from '@mui/material';

const SnapHorizontalSelectionComponent = ({min, max, reduxValue, updateRedux}) => {
  const theme = useTheme();

  const numCircles = max - min + 1;
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const [snapPoints, setSnapPoints] = useState([]);
  
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const circleWidth = isMobile ? 132 : isTablet ? 185 : 255;
  
  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      const newSnapPoints = [];
      for(let i = min; i <= max; i++) {
        newSnapPoints.push((i - min) * circleWidth);
      }

      setSnapPoints(newSnapPoints);
      scrollRef.current.scroll({
        left: newSnapPoints[getIndexOutOfValue(reduxValue)],
        behavior: 'smooth',
      });
    }
  }, []);

  function getIndexOutOfValue(value) {
    return value - min;
  }

  const handleScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.style.scrollSnapAlign = 'start';
      clearTimeout(scrollRef.current.scrollTimeout);

      scrollRef.current.scrollTimeout = setTimeout(() => {
        if (scrollRef && scrollRef.current) {
          const scrollLeft = scrollRef.current.scrollLeft;
          const nearestSnapPoint = snapPoints.reduce((prev, curr) => Math.abs(curr - scrollLeft) < Math.abs(prev - scrollLeft) ? curr : prev);
          scrollRef.current.scroll({
            left: nearestSnapPoint,
            behavior: 'smooth',
          });

          const currentIndex = snapPoints.findIndex(point => point === nearestSnapPoint);
          const value = currentIndex + min;
          updateRedux(value);
        }
      }, 100); // Adjust the debounce time as needed
    }
  };

  const renderCircle = (index) => {
    const isSelected = index === reduxValue;
    
    const circleStyle = {
      width: `${circleWidth}px`,
      height: `${circleWidth}px`,
      flex: `0 0 ${circleWidth}px`,
      borderRadius: '50%',
      backgroundColor: 'transparent',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'none',
      cursor: 'pointer',
      fontSize: `44px`, // Set the font size dynamically
    };
    
    return (
      <Box
        key={index}
        color={isSelected ? 'white' : '#D9D9D9'}
        sx={circleStyle}
      >
        {index}
      </Box>
    );
  };
  

  return (
    <Box ref={containerRef} display={'flex'} flexDirection={'row'} position={'relative'} width={'100%'}>
      {/* <Box display={'flex'}
        flexDirection={'row'} 
        position={'absolute'}
        top={0}
        left={0}
        width={'30%'} backgroundColor='white' height={'100%'} /> */}
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        position='absolute'
        left={`calc(50% - ${circleWidth / 2}px)`}
        width={circleWidth}
        height={circleWidth}
        borderRadius='50%'
        zIndex={-1}
        sx={{backgroundImage:'linear-gradient(0deg, #4A7DE2, #33CBCC) !important'}}
      />
      <Box
        ref={scrollRef}
        display={'flex'}
        flexDirection={'row'}
        onScroll={handleScroll}
        style={{
          height: '100%',
          overflow: 'auto',
          scrollSnapType: 'x mandatory',
          paddingLeft: `calc(50% - ${circleWidth / 2}px)`,
          paddingRight: `calc(50% - ${circleWidth / 2}px)`,
        }}
      >
        {[...Array(numCircles).keys()].map((index) => renderCircle(index + min))}
      </Box>
      {/* <Box display={'flex'}
        flexDirection={'row'} 
        position={'absolute'}
        top={0}
        right={0}
        width={'30%'} backgroundColor='white' height={'100%'} /> */}
    </Box>
  );
};

export default SnapHorizontalSelectionComponent;
