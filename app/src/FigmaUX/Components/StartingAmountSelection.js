import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { formatCurrency, trimToInt } from '../Global/Global';

import editIcon from '../../Media/edit.svg';

const StartingAmountSelection = ({ onUpdateStartingSavings }) => {
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
    <Grid item style={{ position: 'relative', width: 'fit-content' }}>
      {isEditing ? (
        <TextField
          id="savingsInput"
          type="text"
          value={editedValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          autoFocus
          inputProps={{
            maxLength: 10, // Limit to 10 characters
            style: { textAlign: 'center' }, // Center align the input text
          }}
        />
      ) : (
        <>
          <Typography
            id="savingsData"
            variant="h3"
            style={{ display: 'inline-block', cursor: 'pointer' }}
            onClick={handleEditClick}
          >
            {formatCurrency('$', undefined, startingSavings)}
            <img
              id="editIcon"
              src={editIcon}
              height={16}
              style={{ position: 'absolute', top: 2, right: -24, cursor: 'pointer' }}
              alt="Edit Icon"
            />
          </Typography>
        </>
      )}
    </Grid>
  );
};

export default StartingAmountSelection;
