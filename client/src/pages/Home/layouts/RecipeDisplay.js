// layout for displaying recipes

import React from 'react';
import Recipe from './Recipe';
/* make function for displaying each recipe box */
/* fix so that handles display for when there is no list of recipes yet*/
const RecipeDisplay = ({ recipes }) => {
  console.log(recipes);
  if (!recipes) {
    console.log("asdlk;fjasl;dkfj");
    return (
      <div>
        <h1>Change the filters to get started!</h1>
      </div>
    )
  }
  return (
    <div>
      <h1>You can make {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'}.</h1>
      {recipes.map(recipe => {
        return <Recipe key={recipe} recipe={recipe} />
       })
      }
    </div>
  )
};

export default RecipeDisplay;
