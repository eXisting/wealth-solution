import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { formatCurrency, trimToInt } from '../Global/Global';
import { buildFontSizeCssString } from '../Global/CssStrings';

import editIcon from '../../Media/edit.svg';

import '../css/fonts.css'

const StartingAmountSelection = ({ marginBottom, isMobile, isTablet, onUpdateStartingSavings }) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    startingSavings,
  } = useSelector(
    (state) => state.initialPage
  );

  const [editedValue, setEditedValue] = useState(startingSavings);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    var number = trimToInt(e.target.value);
    setEditedValue(number);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    
    onUpdateStartingSavings(editedValue);
    
    console.log('Edited value:', editedValue);
  };

  useEffect(() => {
    setEditedValue(startingSavings);
  }, [startingSavings]);

  return (
    <Box style={{ marginBottom:marginBottom, position: 'relative', width: 'fit-content' }}>
      {isEditing ? (
        <TextField
          id="savingsInput"
          type="text"
          value={editedValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          autoFocus
          inputProps={{
            maxLength: 6, // Limit to 10 characters
            style: { textAlign: 'center' }, // Center align the input text
          }}
        />
      ) : (
        <>
          <Typography
            className='poppins-medium'
            style={{ fontSize:buildFontSizeCssString('huge', isMobile, isTablet), display: 'inline-block', cursor: 'pointer' }}
            onClick={handleEditClick}
          >
            {formatCurrency('$', undefined, startingSavings)}
            <img
              id="editIcon"
              src={editIcon}
              height={isMobile ? '14px' : isTablet ? '22px' : '29px'}
              style={{ position: 'absolute', top: '10%', right: '-10%', cursor: 'pointer' }}
              alt="Edit Icon"
            />
          </Typography>
        </>
      )}
    </Box>
  );
};

export default StartingAmountSelection;
