import React, { useState } from 'react';
import './css/CircleSlider.css';

const CircleSlider = ({ min, max, initialValue }) => {
  const [value, setValue] = useState(initialValue);

  const circles = [];
  for (let i = min; i <= max; i++) {
    circles.push(
      <div
        key={i}
        className={`circle ${i === value ? 'active' : ''}`}
        onClick={() => setValue(i)}
      >
        {i}
      </div>
    );
  }

  return <div className="slider">{circles}</div>;
};

export default CircleSlider;
