import {Box, Button, ButtonGroup, Typography, IconButton, Menu, MenuItem, Divider} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import logo from '../../Media/logo.png';
import darkMode_logo from '../../Media/logo_dark_mode.png';
import switchDarkMode from '../../Media/switch_dark_mode.svg';
import switchLightMode from '../../Media/switch_light_mode.svg';
import wealthometer from '../../Media/wealthometer.svg';
import from_income from '../../Media/from_income.svg';
import { buildCalculatedCssString, buildFontSizeCssString, buildSpaceSizeCssString } from "../Global/CssStrings";

const NavigationHeaderComponent = ({ isMobile, isTablet }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);

    const event = new Event('storage');
    event.key = 'theme';
    event.newValue = !isDarkMode ? 'dark' : 'light';
    window.dispatchEvent(event);
  };

  return (
    <>
      <Box
        paddingTop={buildSpaceSizeCssString('small', isMobile, isTablet)}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          zIndex={-1}
          marginBottom={buildSpaceSizeCssString('small', isMobile, isTablet)}
        >
          <img
            src={isDarkMode ? darkMode_logo : logo}
            style={{width: isMobile ? '166px' : isTablet ? '232px' : '320px', height: isMobile ? '25px' : isTablet ? '35px' : '52px'}}
            alt="Company Logo"
          />
          <Button sx={{color: "white !important"}} onClick={toggleDarkMode}>
            <img
              src={isDarkMode ? switchDarkMode : switchLightMode}
              style={{width: isMobile ? '20px' : isTablet ? '30px' : '40px', height: isMobile ? '20px' : isTablet ? '30px' : '40px'}}
              alt="DarkMode"
            />
          </Button>
        </Box>
        {( isMobile || isTablet ) && (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent={isMobile ? "center" : "flex-start"}
            alignItems={isMobile ? "center" : "flex-start"}
            zIndex={-1}
          >
            <Button
              sx={{
                color: location.pathname === '/fromTotalSavings' ? '#4A7DE2' : isDarkMode ? 'white' : 'black',
                border: 'none !important',
                textTransform: 'none'
              }}
              onClick={() => navigate('/fromTotalSavings')}
            >
              <Typography
                className='montserrat-regular'
                align={'left'}
                fontSize={buildFontSizeCssString('medium', isMobile, isTablet)}
              >
                Use Our Calculators
              </Typography>
            </Button>
          </Box>
        )}
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          width={'100%'}
          zIndex={-1}
          marginTop={buildSpaceSizeCssString('tiny', isMobile, isTablet)}
          marginBottom={buildSpaceSizeCssString('small', isMobile, isTablet)}
          gap={buildSpaceSizeCssString('medium', isMobile, isTablet)}
        >
          <ButtonGroup
            variant="text"
            sx={{gap:2, justifyContent: !isMobile && !isTablet ? "space-between" : "center", width:'100%'}}
          >
            {( !isMobile && !isTablet ) && (
              <Button
                sx={{
                  color: location.pathname === '/fromTotalSavings' ? '#4A7DE2' : isDarkMode ? 'white' : 'black',
                  border: 'none !important'
                }}
                onClick={() => navigate('/fromTotalSavings')}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  zIndex={-1}
                  gap={buildSpaceSizeCssString('tiny', isMobile, isTablet)}
                  width={'500px'}
                >
                  <Typography
                    className='montserrat-medium'
                    align={'left'}
                    fontSize='34px'
                    textTransform={'capitalize'}
                  >
                    Use Our Calculators
                  </Typography>
                  <Typography
                    className='montserrat-regular'
                    align={'left'}
                    fontSize={'16px'}
                    textTransform={'capitalize'}
                  >
                    Estimate your wealth or estimate your wealth based from income
                  </Typography>
                </Box>
              </Button>
            )}
            <Box
              display="flex"
              flexDirection="row"
              justifyContent={isMobile ? 'center' : isTablet ? 'space-between' : "flex-end"}
              width={isMobile || isTablet ? '100%' : '64%'}
              gap={buildSpaceSizeCssString('regular', isMobile, isTablet)}
            >
              {!isMobile ? (
                <>
                  <Button
                    sx={{
                      color: location.pathname === '/' ? '#4A7DE2' : isDarkMode ? 'white' : 'black',
                      border: 'none !important',
                      textTransform: 'none'
                    }}
                    onClick={() => navigate('/')}
                  >
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="center"
                      alignItems="center"
                      zIndex={-1}
                      gap={buildCalculatedCssString(buildSpaceSizeCssString('small', isMobile, isTablet), '*', '0.5')}
                    >
                      <img
                        src={wealthometer}
                        alt="Wealthometer"
                        width={'75px'}
                        height={'75px'}
                      />
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        zIndex={-1}
                      >
                        <Typography
                          className='montserrat-regular'
                          align={'left'}
                          fontSize={isTablet ? '16px' : '20px'}
                        >
                          Wealthometer
                        </Typography>
                        <Typography
                          className='montserrat-regular'
                          align={'left'}
                          fontSize={'14px'}
                          color={'#6D6D6D'}
                        >
                          Estimate your wealth
                        </Typography>
                      </Box>
                    </Box>
                  </Button>
                  <Button
                    sx={{
                      color: location.pathname === '/fromIncome' ? '#4A7DE2' : isDarkMode ? 'white' : 'black',
                      border:'none !important',
                      textTransform: 'none'
                    }}
                    onClick={() => navigate('/fromIncome')}
                  >
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="center"
                      alignItems="center"
                      zIndex={-1}
                      gap={buildCalculatedCssString(buildSpaceSizeCssString('small', isMobile, isTablet), '*', '0.5')}
                    >
                      <img
                        src={from_income}
                        alt="From income"
                        width={'75px'}
                        height={'75px'}
                      />
                      <Box
                        display="flex"
                        flexDirection="column"
                        zIndex={-1}
                      >
                        <Typography
                          className='montserrat-medium'
                          align={'left'}
                          fontSize={isTablet ? '16px' : '20px'}
                        >
                          Calculate from income
                        </Typography>
                        <Typography
                          className='montserrat-regular'
                          align={'left'}
                          fontSize={'14px'}
                          color={'#6D6D6D'}
                        >
                          Estimate your wealth based from income
                        </Typography>
                      </Box>
                    </Box>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    sx={{
                      color: location.pathname === '/' ? '#4A7DE2' : isDarkMode ? 'white' : 'black',
                      border: 'none !important',
                      textTransform: 'none'
                    }}
                    onClick={() => navigate('/')}
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="start"
                      alignItems="center"
                      zIndex={-1}
                      height={'100%'}
                    >
                      <img
                        src={wealthometer}
                        alt="Wealthometer"
                        width={isMobile ? '50px' : '75px'}
                        height={isMobile ? '50px' : '75px'}
                      />
                      <Typography
                        className='montserrat-medium'
                        align={'left'}
                        fontSize={buildFontSizeCssString('regular', isMobile, isTablet)}
                      >
                        Wealthometer
                      </Typography>
                      <Typography
                        className='montserrat-regular'
                        align={'left'}
                        color={'#6D6D6D'}
                        fontSize={isMobile ? '10px' : buildFontSizeCssString('tiny', isMobile, isTablet)}
                      >
                        Estimate your wealth
                      </Typography>
                    </Box>
                  </Button>
                  <Button
                    sx={{
                      color: location.pathname === '/fromIncome' ? '#4A7DE2' : isDarkMode ? 'white' : 'black',
                      border:'none !important',
                      textTransform: 'none'
                  }}
                    onClick={() => navigate('/fromIncome')}
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="start"
                      alignItems="center"
                      zIndex={-1}
                      width={isMobile ? '140px' : '100%'}
                      height={'100%'}
                    >
                      <img
                        src={from_income}
                        alt="From income"
                        width={isMobile ? '50px' : '75px'}
                        height={isMobile ? '50px' : '75px'}
                      />
                      <Typography
                        className='montserrat-regular'
                        align={isMobile ? 'center' : 'left'}
                        fontSize={buildFontSizeCssString('regular', isMobile, isTablet)}
                      >
                        Calculate from income
                      </Typography>
                      <Typography
                        className='montserrat-regular'
                        align={isMobile ? 'center' : 'left'}
                        fontSize={isMobile ? '10px' : buildFontSizeCssString('tiny', isMobile, isTablet)}
                        color={'#6D6D6D'}
                      >
                        Estimate your wealth based from income
                      </Typography>
                    </Box>
                  </Button>
                </>
              )}
            </Box>
          </ButtonGroup>
        </Box>
        <Divider
          sx={{
            borderColor: isDarkMode ? 'rgba(255,255,255, 0.2)' : 'rgba(0,0,0, 0.2)',
            backgroundColor: 'rgba(255,255,255, 0.2)'
          }}
          orientation="horizontal"
        />
      </Box>
    </>
  );
};

export default NavigationHeaderComponent;
