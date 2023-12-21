import React, { useState } from 'react';

const SliderFilter = () => {
  // different sliders with necessary parameters
  const sliders = [
    { name: 'Ingredients', min: 1, max: 10, value: 5, step: 1, unit: ' Ingredients' },
    { name: 'Calories', min: 0, max: 1800, value: 1000, step: 200, unit: ' Calories' },
    { name: 'Protein', min: 0, max: 100, value: 50, step: 10, unit: ' g' },
    { name: 'Carbohydrates', min: 0, max: 110, value: 50, step: 10, unit: ' g'},
    { name: 'Fat', min: 0, max: 170, value: 90, step: 10, unit: ' g'},
  ];

  // initialize useState for each slider to manage state
  const [sliderValues, setSliderValues] = useState(
    sliders.reduce((acc, slider) => {
      // update the current value and return
      acc[slider.name.toLowerCase()] = slider.value;
      return acc;
    }, {})
  );
  
  // handles when slider changes values
  const handleSliderChange = (name, value) => {
    setSliderValues((prevValues) => ({
      // take prev state object, modify the value
      ...prevValues, // spread operator
      [name]: value, // update value
    }));
  };

  // sends form data to Flask backend
  const handleSubmit = () => {
    // initialize KV pairs representing form fields and values
    let form = new FormData();

    // fill form from slider parameters
    sliders.forEach((slider) => {
      const value = sliderValues[slider.name.toLowerCase()];
      const operator = document.querySelector(`select[name=attr-${slider.name.toLowerCase()}]`).value;

      form.append(`slider-${slider.name.toLowerCase()}`, value);
      form.append(`attr-${slider.name.toLowerCase()}`, operator);
    });

    // send info to server
    fetch(`http://127.0.0.1:5000/recipes`, {
      method: 'POST',
      body: form,
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error: ', error));
  }

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
            onChange={(e) => handleSliderChange(slider.name.toLowerCase(), parseInt(e.target.value, 10))}
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

export default SliderFilter;