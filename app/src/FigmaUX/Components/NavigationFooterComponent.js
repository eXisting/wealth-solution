import React from 'react';
import { Typography, Link, Grid } from '@material-ui/core';
import { buildSpaceSizeCssString } from '../Global/CssStrings';
import { Box } from '@mui/material';

import logo from '../../Media/logo.png';

const NavigationFooterComponent = ({isMobile, isTablet}) => {
  return (
    <footer style={{marginTop:buildSpaceSizeCssString('medium', isMobile, isTablet), paddingBottom:buildSpaceSizeCssString('small', isMobile, isTablet)}}>
      <Box paddingLeft={buildSpaceSizeCssString('regular', isMobile, isTablet)} 
        paddingRight={buildSpaceSizeCssString('regular', isMobile, isTablet)} marginTop={buildSpaceSizeCssString('small', isMobile, isTablet)}>
        <Grid container>
          <Grid item xs={12} style={{marginBottom:'30px'}}>
            {/* Logo */}
            <img src={logo} alt="Logo" />
          </Grid>
          <Grid item xs={6}>
            {/* Address, Contact, Social Networks */}
            <Typography variant="body1" gutterBottom>
              Address:
            </Typography>
            <Typography variant="body2" gutterBottom>
              Get Started
              <br />
              1234 BeWealther, Purworejo, Central Java, Indonesia 54261
            </Typography>
            <Typography variant="body1" gutterBottom>
              Contact:
            </Typography>
            <Typography variant="body2" gutterBottom>
              (+01) 234-5678
              <br />
              <Link href="mailto:info@bewealther.com">info@bewealther.com</Link>
            </Typography>
            {/* Social Network Icons */}
            {/* Add your social network icons here */}
          </Grid>
          <Grid item xs={6}>
            {/* Links to other pages */}
            <Typography variant="body1" gutterBottom>
              Get started:
              <br />
              <Link href="/">Wealthometer</Link>
              <br />
              <Link href="/fromTotalSavings">Calculate from total savings</Link>
              <br />
              <Link href="/fromIncome">Calculate from income</Link>
              <br />
              <br />
              <Link href="#">About us</Link>
              <br />
              <Link href="#">Read the blog</Link>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {/* Policy and TOS */}
            <Box display="flex">
              <Typography variant="body2" gutterBottom>
                <Link href="#">Privacy Policy</Link>
                <Link href="#">Terms of Service</Link>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            {/* Copyright */}
            <Typography variant="body2" gutterBottom>
              ©2024 BeWealther, All right reserved.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </footer>
  );
};

export default NavigationFooterComponent;
