import Box from '@mui/material/Box';
import { Slider } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import { trimToInt } from '../Global/Global';

function generateMarks(min, max) {
  const marks = [
    {
      value: min,
      label: '',
    },
    {
      value: max,
      label: '',
    },
  ];

  return marks;
}

export default function DashedSlider({min, max, step, reduxValue, updateRedux}) {
  const handleChange = (_, newValue) => {
    updateRedux(newValue)
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Slider
        marks={generateMarks(min, max)}
        step={step}
        value={trimToInt(reduxValue)}
        valueLabelDisplay="auto"
        min={min}
        max={max}
        onChange={handleChange}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="body2"
          onClick={() => handleChange(null, min)}
          sx={{ cursor: 'pointer' }}
        >
          {min}
        </Typography>
        <Typography
          variant="body2"
          onClick={() => handleChange(null, max)}
          sx={{ cursor: 'pointer' }}
        >
          {max}
        </Typography>
      </Box>
    </Box>
  );
}
