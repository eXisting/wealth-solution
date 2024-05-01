import { Box, Button, ButtonGroup, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import logo from '../../Media/logo.png';
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
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      paddingLeft={buildSpaceSizeCssString('regular', isMobile, isTablet)}
      paddingRight={buildSpaceSizeCssString('regular', isMobile, isTablet)}
      paddingTop={buildSpaceSizeCssString('small', isMobile, isTablet)}
      gap={4}
    >
      <Box paddingLeft={buildCalculatedCssString(buildSpaceSizeCssString('regular', isMobile, isTablet), '*', '-1')} display="flex" alignItems="center">
        <img src={logo} style={{width: isMobile ? '166px' : isTablet ? '232px' : '320px', height: isMobile ? '25px' : isTablet ? '35px' : '52px'}} alt="Company Logo" />
      </Box>
      {isMobile || isTablet ? (
        <>
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
        </>
      ) : (
        <ButtonGroup variant="text" sx={{gap:2}}>
          <Button
            sx={{ fontSize:buildFontSizeCssString('tiny', isMobile, isTablet), color: location.pathname === '/' ? '#4A7DE2' : 'black', border:'none !important'}}
            onClick={() => navigate('/')}
          >
            Wealthometer
          </Button>
          <Button
            sx={{ fontSize:buildFontSizeCssString('tiny', isMobile, isTablet), color: location.pathname === '/fromTotalSavings' ? '#4A7DE2' : 'black', border:'none !important'}}
            onClick={() => navigate('/fromTotalSavings')}
          >
            Calculate from total savings
          </Button>
          
          <Button
            sx={{ fontSize:buildFontSizeCssString('tiny', isMobile, isTablet), color: location.pathname === '/fromIncome' ? '#4A7DE2' : 'black', border:'none !important'}}
            onClick={() => navigate('/fromIncome')}
          >
            Calculate from income
          </Button>
        </ButtonGroup>
      )}
    </Box>
  );
};

export default NavigationHeaderComponent;
