// layout for 

import React from 'react';
/* make function for displaying each recipe box */
/* fix so that handles display for when there is no list of recipes yet*/
const RecipeDisplay = ({ recipes }) => {
  if (!recipes) {
    return <p> Find recipes! </p>
  }
  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.name}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeDisplay;
