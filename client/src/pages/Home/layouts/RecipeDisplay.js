// layout for displaying recipes

import React, { useState, useEffect } from 'react';
import Recipe from './Recipe';
/* make function for displaying each recipe box */
/* fix so that handles display for when there is no list of recipes yet*/
const RecipeDisplay = ({ recipes }) => {
  console.log(recipes);
  const [sortOption, setSortOption] = useState('popular');
  const [finalRecipes, setFinalRecipes] = useState([]);

  useEffect(() => {
    // set the initial state when recipes prop changes
    setFinalRecipes(sortRecipes([...recipes], sortOption));
  }, [recipes, sortOption]);

  const sortRecipes = (recipes, sortOption) => {
    if (sortOption === 'popular') {
      return recipes.sort((a, b) => b.num_rev - a.num_rev);
    } else if (sortOption === 'alphabetical') {
      return recipes.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'cal_dsc') {
      return recipes.sort((a, b) => b.calories - a.calories);
    } else if (sortOption === 'cal_asc') {
      return recipes.sort((a, b) => a.calories - b.calories);
    } else if (sortOption === 'ing_dsc') {
      return recipes.sort((a, b) => b.num_ing - a.num_ing);
    } else if (sortOption === 'ing_asc') {
      return recipes.sort((a, b) => a.num_ing - b.num_ing);
    } else {
      return recipes.sort((a, b) => b.protein - a.protein)
    }
  };

  const handleSortChange = (event) => {
    const newSortOption = event.target.value;
    setSortOption(newSortOption);

    const sorted = sortRecipes(recipes, newSortOption);
    setFinalRecipes(sorted);
  };

  if (recipes.length === 0) {
    return (
      <div>
        <h1>Change the filters to get started!</h1>
      </div>
    )
  }
  return (
    <div>
      <h1>You can make {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'}.</h1>
      <div>
        <label>Sort By: </label>
        <select value={sortOption} onChange={handleSortChange}>
          <option value="popular">Popular</option>
          <option value="alphabetical">Alphabetical (A - Z)</option>
          <option value="cal_dsc">Calories (Most - Least)</option>
          <option value="cal_asc">Calories (Least - Most)</option>
          <option value="ing_dsc"># of Ingredients (Most - Least)</option>
          <option value="ing_asc"># of Ingredients (Least - Most)</option>
          <option value="ptn_dsc">Protein (Most - Least)</option>
        </select>
      </div>
      {finalRecipes.map(recipe => {
        return <Recipe key={recipe.id} recipe={recipe} />
       })
      }
    </div>
  )
};

export default RecipeDisplay;
