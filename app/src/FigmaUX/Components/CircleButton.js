import React from 'react';
import { Button, Box } from '@mui/material';
const CircleButton = ({ height, width, mainBackgroundColor, mainColorSelected, secondaryColor, secondaryColorSelected, selected, increaseSize, onClick }) => {
  const adjustedWidth = increaseSize && selected ? `calc(${width} + ${0.3 * parseInt(width, 10)}px)` : width;
  const adjustedHeight = increaseSize && selected ? `calc(${height} + ${0.3 * parseInt(height, 10)}px)` : height;

  return (
    <Button
      variant="contained"
      sx={{
        position: 'relative',
        borderRadius: '50%',
        p: 0,
        minWidth: 0,
        height:adjustedWidth,
        width:adjustedWidth,
        backgroundColor: selected ? mainColorSelected : mainBackgroundColor,
        '&:hover': {
          backgroundColor: mainColorSelected,
        },
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'calc(100% - 10px)',
          height: 'calc(100% - 10px)',
          borderRadius: '50%',
          backgroundColor: selected ? secondaryColorSelected : secondaryColor,
        }}
      />
    </Button>
  );
};

export default CircleButton;
