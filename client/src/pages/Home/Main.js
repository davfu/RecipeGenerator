import React, { useState } from 'react';
import SliderDisplay from './layouts/SliderDisplay';
import RecipeDisplay from './layouts/RecipeDisplay';

const Main = () => {
  const [recipes, setRecipes] = useState([]);
 
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
      .then(response => response.json()) // response is the 'Response' object received from server
      .then(data => {
        setRecipes(data.recipes); // update recipes state
        console.log(data);
      })
      .catch(error => console.error('Error: ', error));
  }

  return (
    <div>
      <div className='left'>
        {/* FilterSlider component */}
        <SliderDisplay
          sliders={sliders}
          sliderValues={sliderValues}
          handleSliderChange={handleSliderChange}
          handleSubmit={handleSubmit}
        />
      </div>
      <div className='right'>
        {/* RecipeDisplay component */}
        <RecipeDisplay 
          recipes={recipes}
         />
      </div>
    </div>
  );
};

export default Main;
