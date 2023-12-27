import React, { useState } from 'react';
import SliderDisplay from './layouts/SliderDisplay';
import RecipeDisplay from './layouts/RecipeDisplay';

const Main = () => {
  const [recipes, setRecipes] = useState(null);
  //useState([{'name': 'Divine Hard-Boiled Eggs', 'url': 'https://www.allrecipes.com/recipe/176229/divine-hard-boiled-eggs/', 'cals': 72, 'carbs': 0, 'fat': 5, 'protein': 6, 'num_ing': 1, 'rating': 4.6, 'num_rev': 577}]);
 
  // different sliders with necessary parameters
  const sliders = [
    { name: 'Ingredients', min: 1, max: 15, value: 10, step: 1, unit: ' Ingredients' },
    { name: 'Calories', min: 0, max: 2000, value: 1000, step: 200, unit: ' Calories' },
    { name: 'Protein', min: 0, max: 100, value: 50, step: 10, unit: ' g' },
    { name: 'Carbohydrates', min: 0, max: 200, value: 100, step: 10, unit: ' g'},
    { name: 'Fat', min: 0, max: 150, value: 80, step: 10, unit: ' g'},
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
  const handleSlider = (name, value) => {
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
        setRecipes(data); // update recipes state
        console.log(data);
      })
      .catch(error => console.error('Error: ', error));
  }

  return (
    <div>
      <h1>What's Cookin'?</h1>
      <div className='left'>
        {/* FilterSlider component */}
        <SliderDisplay
          sliders={sliders}
          sliderValues={sliderValues}
          handleSlider={handleSlider}
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
