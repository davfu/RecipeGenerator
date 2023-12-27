// layout for left side of main page, 
// container for filter sliders

import React from 'react';

const SliderDisplay = ({ sliders, sliderValues, handleSlider, handleSubmit }) => {
  return (
    <div>
      {sliders.map((slider) => (
        <div className="slider-container" key={slider.name}>
          <label htmlFor={`slider-${slider.name}`}>{slider.name}:</label>
          <input
            type="range"
            id={`slider-${slider.name}`}
            name={`slider-${slider.name.toLowerCase()}`}
            min={slider.min}
            max={slider.max}
            value={sliderValues[slider.name.toLowerCase()]}
            step={slider.step}
            onChange={(e) => handleSlider(slider.name.toLowerCase(), parseInt(e.target.value, 10))}
            data-operator="<="
          />
          <div className="output">
            At{' '} 
            <select name={`attr-${slider.name.toLowerCase()}`}>
              <option value="atMost">most</option>
              <option value="atLeast">least</option>
            </select>
            <span id={`slider-value-${slider.name}`}>
              {' '}{sliderValues[slider.name.toLowerCase()]} {slider.unit}
            </span>
          </div>
        </div>
      ))}
      <button onClick={handleSubmit}>Find Recipes</button>
    </div>
  );
};

export default SliderDisplay;
