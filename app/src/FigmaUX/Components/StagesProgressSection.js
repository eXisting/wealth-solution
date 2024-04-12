import { Grid, Button, Box, Typography } from '@mui/material';
import { useState } from 'react';

const StagesProgressSection = ({stageSelected, selectedStage}) => {
  const [selectedButton, setSelectedButton] = useState(selectedStage);

  const handleButtonClick = (buttonIndex) => {
    setSelectedButton(buttonIndex);
    stageSelected(buttonIndex);
  };

  return (
    <Box>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <Button
            variant="contained"
            sx={{ borderRadius: '50%', minWidth: 0, width: '3rem', height: '3rem',
            backgroundColor: 'white',
            border: selectedButton >= 0 ? '0.5rem solid #4A7DE2' : '0.3rem solid #ccc',
            '&:hover': {
              backgroundColor: 'white',
            }}}
            onClick={() => handleButtonClick(0)}
          />
          <Typography marginLeft={-2} marginTop={2} color={selectedButton >= 0 ? "#4A7DE2" : "#C1C3C4"}>DECADE 1</Typography>
        </Grid>
        <Grid item marginRight={-6} width={'30%'} marginLeft={-8} marginTop={-4.5}>
          <Box sx={{ width: '100%', height: 8 }} backgroundColor={selectedButton >= 1 ? '#4A7DE2' : '#EBEDF0'}/>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{ borderRadius: '50%', minWidth: 0, width: '3rem', height: '3rem',
            backgroundColor: 'white',
            border: selectedButton >= 1 ? '0.5rem solid #4A7DE2' : '0.3rem solid #ccc',
            '&:hover': {
              backgroundColor: 'white',
            }}}
            onClick={() => handleButtonClick(1)}
          />
          <Typography marginLeft={-2} marginTop={2} color={selectedButton >= 1 ? "#4A7DE2" : "#C1C3C4"}>DECADE 2</Typography>
        </Grid>
        <Grid item marginRight={-8} width={'30%'} marginLeft={-6} marginTop={-4.5}>
          <Box sx={{ width: '100%', height: 8 }} backgroundColor={selectedButton >= 2 ? '#4A7DE2' : '#EBEDF0'}/>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{ borderRadius: '50%', minWidth: 0, width: '3rem', height: '3rem',
            backgroundColor: 'white',
            border: selectedButton >= 2 ? '0.5rem solid #4A7DE2' : '0.3rem solid #ccc',
            '&:hover': {
              backgroundColor: 'white',
            }}}
            onClick={() => handleButtonClick(2)}
          />
          <Typography marginLeft={-2} marginTop={2} color={selectedButton >= 2 ? "#4A7DE2" : "#C1C3C4"}>DECADE 3</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StagesProgressSection;

