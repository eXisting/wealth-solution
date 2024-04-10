import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Button, Box, Input } from '@mui/material';
import { Slider } from '@material-ui/core';
import editIcon from '../Media/edit.svg'
import StageSection from './StageSection';
import CircleSlider from './Components/CircleSlider';

const PLAINHTML = () => {
  const navigate = useNavigate();

  const nextPage = () => {
    navigate(`/???`);
  };

  return (
    <Box gap={8}>
      <Box sx={{ m: 2, justifyContent: 'flex-start' }}>
        <Typography variant="h5">Calculate from total savings</Typography>
        <Typography variant="body2" sx={{ fontSize: 'var(--font-size-small)' }}>
          {/* {formattedDate} */}
        </Typography>
      </Box>
      <Box gap={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ m: 2 }}>
          <Grid container direction='column' gap={2} alignItems="center">
            <Typography variant="h5">Starting amount</Typography>
            <Grid item style={{ position: 'relative', width: 'fit-content' }}>
              <Typography id="savingsData" variant='h3' style={{ display: 'inline-block' }}>
                5,222222$
                <img
                  id="editIcon"
                  src={editIcon}
                  height={16}
                  style={{ position: 'absolute', top: 2, right:-24}}
                  alt="Edit Icon"
                />
              </Typography>
              <Input id="savingsInput" type="text" style={{ display: 'none' }} />
            </Grid>
            <Grid item sx={{ width:'100%' }} marginTop={4}>
              <Slider
                min={5000}
                max={20000}
                // value={value}
                // onChange={handleChange}
                step={100}
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} gap={4}>
          <Typography variant="h5" marginBottom={2}>Your current age</Typography>
          <CircleSlider min={12} max={55} initialValue={18}></CircleSlider>
          <Typography variant="h5" marginTop={4}>How much money do you want?</Typography>
          <Grid container direction="column" spacing={1} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Grid item>
              <Button variant="contained" onClick={() => {/* toggleActiveMillionButton(0); targetMillion(1000000) */}}>
                $1,000,000
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={() => {/* toggleActiveMillionButton(1); targetMillion(3000000) */}}>
                $3,000,000
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={() => {/* toggleActiveMillionButton(2); targetMillion(5000000) */}}>
                $5,000,000
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h6">
            Your savings plan is divided <br />  
          </Typography>
          <Typography variant="h6">
            into <span style={{ color: '#33CBCC' }}>three stages.</span>
          </Typography>
          <Typography variant="body1" marginTop={2}>
            As you make more money you save more
          </Typography>
          <Typography variant="body1">
            money in each stage.
          </Typography>
        </Box>
      </Box>
      <Box className="section padded-section" display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ m: 2, marginTop: 8}}>
        <Box>
          <Typography variant="h5" style={{ fontFamily: 'Montserrat, sans-serif', textAlign: 'center', marginBottom:4 }}>
            Your investment will<br /> be worth
          </Typography>
          <Typography variant="h2" style={{ fontFamily: 'Poppins, sans-serif', textAlign: 'center' }}>$1,000,174</Typography>
        </Box>
        <Typography variant="body2" style={{ fontFamily: 'Montserrat, sans-serif', textAlign: 'center' }}>(over 40 years)</Typography>
      </Box>
      <Box gap={4} sx={{ m:2, marginTop:4, display: 'flex', flexDirection: 'column' }}>
        <StageSection
          stageIndex={0}
          stageNameText="Stage One"
          ageRangeText="Your stage one age range"
          minSliderValue={5000}
          maxSliderValue={20000}
        />
        <StageSection
          stageIndex={1}
          stageNameText="Stage Two"
          ageRangeText="Your stage two age range"
          minSliderValue={6000}
          maxSliderValue={25000}
        />
        <StageSection
          stageIndex={2}
          stageNameText="Stage Three"
          ageRangeText="Your stage three age range"
          minSliderValue={6000}
          maxSliderValue={25000}
        />
      </Box>
      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box display="flex" flexDirection="row">
          <Box display="flex" flexDirection="column" alignItems="center">
            <img src="assets/money.svg" alt="Total Interest Earned" width="50rem" />
            <Typography>Total Interest Earned</Typography>
            <Typography data-js-total></Typography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <img src="assets/donation.svg" alt="Total Contributions" width="50rem" />
            <Typography>Total Contributions</Typography>
            <Typography data-js-contributions-sum></Typography>
          </Box>
        </Box>
      </Box>
      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <canvas id="linechart"></canvas>
      </Box>
      <Box id="piechart" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <canvas id="piechart"></canvas>
      </Box>
    </Box>
  );
}

export default PLAINHTML;