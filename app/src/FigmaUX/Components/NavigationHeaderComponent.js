import {Box, Button, ButtonGroup, Typography, IconButton, Menu, MenuItem, Divider} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import logo from '../../Media/logo.png';
import highLevel from '../../Media/highLevel.svg';
import calculate from '../../Media/calculate.svg';
import { buildCalculatedCssString, buildFontSizeCssString, buildSpaceSizeCssString } from "../Global/CssStrings";

const NavigationHeaderComponent = ({ isMobile, isTablet }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isMobile || isTablet ? (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            paddingLeft={buildSpaceSizeCssString('regular', isMobile, isTablet)}
            paddingRight={buildSpaceSizeCssString('regular', isMobile, isTablet)}
            paddingTop={buildSpaceSizeCssString('small', isMobile, isTablet)}
            gap={4}
          >
            <Box
              display="flex"
              alignItems="center"
            >
              <img
                src={logo}
                style={{width: isMobile ? '166px' : isTablet ? '232px' : '320px', height: isMobile ? '25px' : isTablet ? '35px' : '52px'}}
                alt="Company Logo"
              />
            </Box>
            <IconButton onClick={handleMenuClick}>
              <MenuIcon />
            </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleMenuItemClick('/fromTotalSavings')}>
                  From Total
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('/')}>
                  Wealthometer
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('/fromIncome')}>
                  From Income
                </MenuItem>
              </Menu>
          </Box>
        </>
      ) : (
        <Box
          paddingLeft={buildSpaceSizeCssString('regular', isMobile, isTablet)}
          paddingRight={buildSpaceSizeCssString('regular', isMobile, isTablet)}
          paddingTop={buildSpaceSizeCssString('small', isMobile, isTablet)}
        >
          <img
            src={logo}
            style={{width: isMobile ? '166px' : isTablet ? '232px' : '320px', height: isMobile ? '25px' : isTablet ? '35px' : '52px'}}
            alt="Company Logo"
          />
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="start-flex"
            alignItems="center"
            width={'100%'}
            zIndex={-1}
            marginTop={buildSpaceSizeCssString('regular', isMobile, isTablet)}
            marginBottom={buildSpaceSizeCssString('small', isMobile, isTablet)}
            gap={buildSpaceSizeCssString('medium', isMobile, isTablet)}
          >
            <ButtonGroup
              variant="text"
              sx={{gap:2, justifyContent: 'space-between', width:'100%'}}
            >
              <Button
                sx={{
                  color: location.pathname === '/fromTotalSavings' ? '#4A7DE2' : 'black',
                  border: 'none !important'
                }}
                onClick={() => navigate('/fromTotalSavings')}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  zIndex={-1}
                  gap={buildSpaceSizeCssString('tiny', isMobile, isTablet)}
                  marginRight={buildSpaceSizeCssString('big', isMobile, isTablet)}
                >
                  <Typography
                    className='montserrat-medium'
                    align={'left'}
                    fontSize={buildFontSizeCssString('regular', isMobile, isTablet)}
                  >
                    Use Our Calculators
                  </Typography>
                  <Typography
                    className='montserrat-regular'
                    align={'left'}
                    fontSize={buildCalculatedCssString(buildFontSizeCssString('tiny', isMobile, isTablet), '*', '0.7')}
                  >
                    Estimate your wealth or estimate your wealth based from income
                  </Typography>
                </Box>
              </Button>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
              >
                <Button
                  sx={{
                    color: location.pathname === '/' ? '#4A7DE2' : 'black',
                    border: 'none !important'
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
                      src={highLevel}
                      alt="Total Contributions"
                      width={isMobile ? '27px' : isTablet ? '35px' : '60px'}
                      height={isMobile ? '27px' : isTablet ? '35px' : '60px'}
                    />
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      zIndex={-1}
                      gap={buildSpaceSizeCssString('tiny', isMobile, isTablet)}
                    >
                      <Typography
                        className='montserrat-medium'
                        align={'left'}
                        fontSize={buildFontSizeCssString('tiny', isMobile, isTablet)}
                      >
                        Wealthometer
                      </Typography>
                      <Typography
                        className='montserrat-regular'
                        align={'left'}
                        fontSize={buildCalculatedCssString(buildFontSizeCssString('tiny', isMobile, isTablet), '*', '0.5')}
                        color={'#6D6D6D'}
                      >
                        Estimate your wealth
                      </Typography>
                    </Box>
                  </Box>
                </Button>
                <Button
                  sx={{
                    color: location.pathname === '/fromIncome' ? '#4A7DE2' : 'black',
                    border:'none !important'}}
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
                      src={calculate}
                      alt="Total Contributions"
                      width={isMobile ? '27px' : isTablet ? '35px' : '60px'}
                      height={isMobile ? '27px' : isTablet ? '35px' : '60px'}
                    />
                    <Box
                      display="flex"
                      flexDirection="column"
                      zIndex={-1}
                      gap={buildSpaceSizeCssString('tiny', isMobile, isTablet)}
                    >
                      <Typography
                        className='montserrat-medium'
                        align={'left'}
                        fontSize={buildFontSizeCssString('tiny', isMobile, isTablet)}
                      >
                        Calculate from income
                      </Typography>
                      <Typography
                        className='montserrat-regular'
                        align={'left'}
                        fontSize={buildCalculatedCssString(buildFontSizeCssString('tiny', isMobile, isTablet), '*', '0.5')}
                        color={'#6D6D6D'}
                      >
                        Estimate your wealth based from income
                      </Typography>
                    </Box>
                  </Box>
                </Button>
              </Box>
            </ButtonGroup>
          </Box>
          <Divider
            orientation="horizontal"
          />
        </Box>
      )}
    </>
  );
};

export default NavigationHeaderComponent;
