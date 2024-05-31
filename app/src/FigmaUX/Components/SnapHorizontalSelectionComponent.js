import React, { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { createTheme, useMediaQuery } from '@mui/material';
import dashedBorder from '../../Media/dashed-border.svg';

const SnapHorizontalSelectionComponent = ({ min, max, reduxValue, updateRedux }) => {
  const numCircles = max - min + 1;
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [snapPoints, setSnapPoints] = useState([]);

  const theme = createTheme({
    breakpoints: {
      values: {
        narrowMobile: 480,
        mobile: 640,
        narrowTablet: 900,
        tablet: 1280,
        desktop: 1440,
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

  const circleWidth = isMobile ? 117 : 163;

  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      const newSnapPoints = [];
      for (let i = 0; i <= max - min; i++) {
        newSnapPoints.push(i * circleWidth);
      }

      setSnapPoints(newSnapPoints);
      scrollRef.current.scroll({
        left: newSnapPoints[getIndexOutOfValue(reduxValue)],
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setScrollPosition(scrollRef.current.scrollLeft);
        clearTimeout(scrollRef.current.scrollTimeout);

        scrollRef.current.scrollTimeout = setTimeout(() => {
          const nearestSnapPoint = snapPoints.reduce((prev, curr) =>
            Math.abs(curr - scrollRef.current.scrollLeft) < Math.abs(prev - scrollRef.current.scrollLeft)
              ? curr
              : prev
          );
          scrollRef.current.scroll({
            left: nearestSnapPoint,
            behavior: 'smooth',
          });

          const currentIndex = snapPoints.findIndex((point) => point === nearestSnapPoint);
          const value = currentIndex + min;
          updateRedux(value);
        }, 100); // Adjust the debounce time as needed
      }
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollRef, snapPoints, min]);

  function getIndexOutOfValue(value) {
    return value - min;
  }

  const calculateFontSizeAndColor = (index) => {
    if (!scrollRef.current) return { fontSize: '65px', color: 'green' };

    const scrollCenter = scrollRef.current.scrollLeft;
    const circleCenter = (index - min) * circleWidth + circleWidth / 2;
    const distanceFromCenter = Math.abs(scrollCenter - circleCenter + circleWidth / 2);

    // const maxDistance = circleCenter * 2 + 2 * circleWidth;
    const scale = Math.min(circleWidth * 3 / distanceFromCenter, 10);

    const fontSize = 5 * scale; // Adjust size increase
    const color = scale > 6 ? 'white' : '#D9D9D9'; // Adjust color brightness

    if (scale > 2) {
      console.log(
        'index:', index,
        'scrollCenter:', scrollCenter,
        'circleCenter:' , circleCenter);
      // 'distanceFromCenter:' + distanceFromCenter + '...........' +
      // // 'maxDistance:' + maxDistance + '...........' +
      // 'scale:' + scale +
      // 'fontSize:' + fontSize +
      // 'color:' + color);
    }

    return { fontSize: fontSize+'px', color };
  };

  const renderCircle = (index) => {
    const { fontSize, color } = calculateFontSizeAndColor(index);

    const circleStyle = {
      width: `${circleWidth}px`,
      height: `${circleWidth}px`,
      flex: `0 0 ${circleWidth}px`,
      borderRadius: '50%',
      backgroundColor: 'transparent',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      fontSize,
      color,
    };

    return (
      <Box key={index} className="montserrat-medium" sx={circleStyle}>
        {index}
      </Box>
    );
  };

  return (
    <Box ref={containerRef} display={'flex'} flexDirection={'row'} position={'relative'} width={'100%'}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        left={`calc(50% - ${circleWidth / 2}px)`}
        width={circleWidth}
        height={circleWidth}
        borderRadius="50%"
        zIndex={-1}
        sx={{
          backgroundImage: 'linear-gradient(0deg, #4A7DE2, #33CBCC) !important',
        }}
      >
        <img
          src={dashedBorder}
          alt="dashed-border"
          width={!isMobile ? '185px' : 'auto'}
          height={!isMobile ? '185px' : 'auto'}
        />
      </Box>
      <Box
        ref={scrollRef}
        display={'flex'}
        flexDirection={'row'}
        style={{
          height: '100%',
          overflow: 'auto',
          scrollSnapType: 'x mandatory',
          paddingLeft: `calc(50% - ${circleWidth / 2}px)`,
          paddingRight: `calc(50% - ${circleWidth / 2}px)`,
        }}
      >
        {[...Array(numCircles).keys()].map((index) => renderCircle(index + min))}
        <Box
          className="fade-overlay fade-left"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '40%',
            height: '100%',
            pointerEvents: 'none',
            backgroundImage: isDarkMode
              ? 'linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))'
              : 'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))',
          }}
        />
        <Box
          className="fade-overlay fade-right"
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '40%',
            height: '100%',
            pointerEvents: 'none',
            backgroundImage: isDarkMode
              ? 'linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))'
              : 'linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))',
          }}
        />
      </Box>
    </Box>
  );
};

export default SnapHorizontalSelectionComponent;