import React from 'react';
import { Typography, Link, Grid } from '@material-ui/core';
import { buildSpaceSizeCssString } from '../Global/CssStrings';
import { Box, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

import logo from '../../Media/logo.png';

const NavigationFooterComponent = ({ isMobile, isTablet }) => {
  return (
    <footer style={{ marginTop: buildSpaceSizeCssString('medium', isMobile, isTablet), paddingBottom: buildSpaceSizeCssString('small', isMobile, isTablet) }}>
      <Box paddingLeft={buildSpaceSizeCssString('regular', isMobile, isTablet)}
        paddingRight={buildSpaceSizeCssString('regular', isMobile, isTablet)}>
        <Grid container>
          <Grid item xs={12} style={{ marginBottom: '30px' }}>
            {/* Logo */}
            <img src={logo} style={{ width: isMobile ? '166px' : isTablet ? '232px' : '320px', height: isMobile ? '25px' : isTablet ? '35px' : '52px' }} alt="Company Logo" />
          </Grid>
          <Grid item xs={6}>
            {/* Address, Contact, Social Networks */}
            <Typography variant="body1" gutterBottom>
              <b>Address:</b>
            </Typography>
            <Typography variant="body2" gutterBottom>
              1234 BeWealther, Purworejo, Central Java, Indonesia 54261
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Contact:</b>
            </Typography>
            <Typography variant="body2" gutterBottom>
              <Link href="tel:(+01) 234-5678" style={{ textDecoration: 'underline', color: 'inherit' }}>(+01) 234-5678</Link>
              <br />
              <Link href="mailto:info@bewealther.com" style={{ textDecoration: 'underline', color: 'inherit' }}>info@bewealther.com</Link>
            </Typography>
            {/* Social Network Icons */}
            <Grid container>
              <Grid item>
                <IconButton aria-label="Instagram">
                  <InstagramIcon style={{ width: isMobile ? '15px' : isTablet ? '22px' : '30px', height: isMobile ? '15px' : isTablet ? '22px' : '30px' }}/>
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton aria-label="Facebook">
                  <FacebookIcon style={{ width: isMobile ? '15px' : isTablet ? '22px' : '30px', height: isMobile ? '15px' : isTablet ? '22px' : '30px' }}/>
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton aria-label="LinkedIn">
                  <LinkedInIcon style={{ width: isMobile ? '15px' : isTablet ? '22px' : '30px', height: isMobile ? '15px' : isTablet ? '22px' : '30px' }}/>
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton aria-label="Twitter">
                  <TwitterIcon style={{ width: isMobile ? '15px' : isTablet ? '22px' : '30px', height: isMobile ? '15px' : isTablet ? '22px' : '30px' }}/>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            {/* Links to other pages */}
            <Typography variant="body1" gutterBottom>
              <b>Get started:</b>
              <br />
              <Link href="/" style={{ color: 'inherit' }}>Wealthometer</Link>
              <br />
              <Link href="/fromTotalSavings" style={{ color: 'inherit' }}>Calculate from total savings</Link>
              <br />
              <Link href="/fromIncome" style={{ color: 'inherit' }}>Calculate from income</Link>
              <br />
              <br />
              <Link href="#" style={{ color: 'inherit' }}>About us</Link>
              <br />
              <Link href="#" style={{ color: 'inherit' }}>Read the blog</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ borderBottom: '1px solid #ccc', marginBottom: '20px' }} />
          <Grid item xs={6}>
            {/* Policy and TOS */}
            <Box display="flex">
              <Typography variant="body2" gutterBottom>
                <Link href="#" style={{ textDecoration: 'underline', color: 'inherit' }}>Privacy Policy</Link>
                <Link href="#" style={{ textDecoration: 'underline', color: 'inherit' }}>Terms of Service</Link>
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
