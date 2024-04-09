import React, { useState } from 'react';
import Slider from 'rc-slider';
import styled, { css } from "styled-components";
import 'rc-slider/assets/index.css';

const SliderWithSnaps = ({ callback, min, max, interval, sign, initialValue }) => {
  const [value, setValue] = useState(initialValue);

  const handleSliderChange = (newValue) => {
    setValue(newValue);
  };

  const handleSliderSnap = (newValue) => {
    const snappedValue = Math.round(newValue / interval) * interval;
    setValue(snappedValue);

    callback(snappedValue);
  };

  const marks = {};
  for (let i = min; i <= max; i += interval) {
    marks[i] = i;
  }

  const selectedMarkStyle = {
    fontWeight: 'regular',
    height: '1.8vh',
    color: '#0096FF',
  };

  const regularMarkStyle = {
    fontWeight: 'regular',
    height: '1.8vh',
    color: '#ffffff',
  };

  const handleStyle = {
    borderColor: '#929292',
    borderWidth: '0.1vh',
    height: '3vh',
    width: '3vh',
    marginTop: '-1.5vh',
    backgroundColor: '#929292',
    opacity: "1"
  };

  return (
    <Container>
      <div style={{ display: 'flex', marginTop: '4.5vh' }}>
        {Array.from({ length: (max - min) / interval + 1 }).map((_, index) => {
          const mark = min + index * interval;
          const isMarkSelected = value === mark;
          const markPosition = (mark - min) / (max - min) * 100; // Calculate the position based on percentage

          const isEdgeElement = index == (max - min) / interval;

          return (
            <div key={mark} style={{ position: 'relative', flex: '1' }}>
              {(isEdgeElement || isMarkSelected) && (
                <div style={{
                    position: 'absolute',
                    top: '-4.5vh',
                    left: `${markPosition}%`,
                    transform: 'translateX(-50%)',
                    textAlign: 'center',
                    ...(isMarkSelected ? selectedMarkStyle : regularMarkStyle),
                  }}
                >
                  {sign}{mark}
                </div>
              )}
              {index > 0 && <div
                style={{
                  position: 'absolute',
                  top: '-0.5vh',
                  left: `${markPosition}%`,
                  transform: 'translateX(-50%)',
                  width: '1px',
                  height: '1.2vh',
                  backgroundColor: '#111111',
                }}
              />}
            </div>
          );
        })}
      </div>
      <Slider
        min={min}
        max={max}
        step={interval}
        value={value}
        onChange={handleSliderChange}
        onAfterChange={handleSliderSnap}
        railStyle={{ backgroundColor: '#9c8f7d', height: '0.2vh' }}
        trackStyle={{ backgroundColor: '#111111', height: '0.2vh' }}
        handleStyle={handleStyle}
      />
    </Container>
  );
};

const Container = styled.div`
  margin-left: 8vw;
  margin-right: 8vw;
`;

export default SliderWithSnaps;
