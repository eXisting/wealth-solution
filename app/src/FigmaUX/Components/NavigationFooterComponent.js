import React, { useEffect, useState } from 'react';
import { Typography, Link, Grid } from '@material-ui/core';
import { buildSpaceSizeCssString } from '../Global/CssStrings';
import {Box, createTheme, IconButton, useMediaQuery} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

import logo from '../../Media/logo.png';
import logoDarkMode from '../../Media/logo_dark_mode.png';

const NavigationFooterComponent = ({ isMobile, isNarrowMobile, isTablet }) => {
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

  return (
    <footer style={{ marginTop: buildSpaceSizeCssString('medium', isMobile, isTablet), paddingBottom: buildSpaceSizeCssString('small', isMobile, isTablet) }}>
      <Box paddingLeft={buildSpaceSizeCssString('regular', isMobile, isTablet)}
        paddingRight={buildSpaceSizeCssString('regular', isMobile, isTablet)}
        fontSize={isMobile ? '10px' : isTablet ? '14px' : '18px'}>
        <Grid container>
          <Grid item xs={12} style={{ marginBottom: '30px' }}>
            {/* Logo */}
            <img src={isDarkMode ? logoDarkMode : logo} style={{ width: isMobile ? '166px' : isTablet ? '232px' : '320px', height: isMobile ? '25px' : isTablet ? '35px' : '52px' }} alt="Company Logo" />
          </Grid>
          <Grid container item xs={!isMobile && !isTablet ? 4 : 6} direction="column" spacing={1}>
            {/* Address, Contact, Social Networks */}
            <Grid item>
              <Typography className='montserrat-semibold' style={{ marginBottom: '0.5rem', fontSize: isMobile ? '10px' : isTablet ? '14px' : '18px'}}>
                Address:
              </Typography>
              <span className='montserrat-regular'>
                1234 BeWealther, Purworejo, Central Java, Indonesia 54261
              </span>
            </Grid>
            
            <Grid item>
              <Typography className='montserrat-semibold' style={{ marginBottom: '0.5rem', marginTop: '1rem', fontSize: isMobile ? '10px' : isTablet ? '14px' : '18px' }}>
                Contact:
              </Typography>
              <Link href="tel:(+01) 234-5678" className='montserrat-regular' style={{ textDecoration: 'underline', color: 'inherit', fontSize:isMobile ? '10px' : isTablet ? '14px' : '18px' }}>(+01) 234-5678</Link>
              <br />
              <Link href="mailto:info@bewealther.com" className='montserrat-regular' style={{ textDecoration: 'underline', color: 'inherit', fontSize:isMobile ? '10px' : isTablet ? '14px' : '18px' }}>info@bewealther.com</Link>
            </Grid>
            
            {/* Social Network Icons */}
            <Grid item>
              <Grid container spacing={1}>
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
          </Grid>

          <Grid item xs={!isMobile && !isTablet ? 4 : 6}>
            {/* Links to other pages */}
            <Typography className='montserrat-semibold' style={{marginBottom: '0.5rem', fontSize: isMobile ? '10px' : isTablet ? '14px' : '18px' }}>
              Get started:
            </Typography>
              <Grid item>
                <Link href="/" className='montserrat-regular' style={{ color: 'inherit'}}>Wealthometer</Link>
              </Grid>
              <Grid item>
                <Link href="/fromIncome" className='montserrat-regular' style={{ color: 'inherit' }}>Calculate from income</Link>
              </Grid>
              <Grid item>
                <Link href="/fromTotalSavings" className='montserrat-regular' style={{ color: 'inherit' }}>Calculate from total savings</Link>
              </Grid>
              <Grid item style={{marginBottom: '0.5rem', marginTop: '1rem'}}>
                <Link href="#" className='montserrat-regular' style={{ color: 'inherit' }}>About us</Link>
                <br/>
                <Link href="#" className='montserrat-regular' style={{ color: 'inherit' }}>Read the blog</Link>
              </Grid>
          </Grid>
          {(!isMobile && !isTablet ?
            <Grid item xs={4}>
              {/* Links to other pages */}
              <Typography className='montserrat-semibold' style={{marginBottom: '0.5rem', fontSize: isMobile ? '10px' : isTablet ? '14px' : '18px' }}>
                Get started:
              </Typography>
                <Grid item>
                  <Link href="/" className='montserrat-regular' style={{ color: 'inherit'}}>Wealthometer</Link>
                </Grid>
                <Grid item>
                  <Link href="/fromIncome" className='montserrat-regular' style={{ color: 'inherit' }}>Calculate from income</Link>
                </Grid>
                <Grid item>
                  <Link href="/fromTotalSavings" className='montserrat-regular' style={{ color: 'inherit' }}>Calculate from total savings</Link>
                </Grid>
                <Grid item style={{marginBottom: '0.5rem', marginTop: '1rem'}}>
                  <Link href="#" className='montserrat-regular' style={{ color: 'inherit' }}>About us</Link>
                  <br/>
                  <Link href="#" className='montserrat-regular' style={{ color: 'inherit' }}>Read the blog</Link>
                </Grid>
            </Grid>
            : <></>)}
          <Grid item xs={12} style={{ borderBottom: '1px solid #ccc', marginBottom: '20px' }} />
          <Grid item xs={6}>
            {/* Policy and TOS */}
            <Box display="flex" flexDirection={isNarrowMobile ? 'column' : 'row'} gap={isNarrowMobile ? 1 : 2}>
              <Link href="#" className='montserrat-regular' style={{ textDecoration: 'underline', color: 'inherit' }}>Privacy Policy</Link>
              <Link href="#" className='montserrat-regular' style={{ textDecoration: 'underline', color: 'inherit' }}>Terms of Service</Link>
            </Box>
          </Grid>
          <Grid item xs={6} style={{textAlign: 'end'}}>
            {/* Copyright */}
            <Typography className='montserrat-regular' style={{fontSize: isMobile ? '10px' : isTablet ? '14px' : '18px'}}>
              ©2024 BeWealther, All right reserved.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </footer>
  );
};

export default NavigationFooterComponent;
