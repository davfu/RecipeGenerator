// layout for displaying recipes

import React, { useState, useEffect } from 'react';
import Recipe from './Recipe';
/* make function for displaying each recipe box */
/* fix so that handles display for when there is no list of recipes yet*/
const RecipeDisplay = ({ recipes }) => {
  const [sortOption, setSortOption] = useState('popular');
  const [finalRecipes, setFinalRecipes] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);

  useEffect(() => {
    // set the initial state when recipes prop changes
    setFinalRecipes(sortRecipes([...recipes], sortOption));
  }, [recipes, sortOption]);

  const sortRecipes = (recipes, sortOption) => {
    const sortFunctions = {
      popular: (a, b) => b.num_rev - a.num_rev,
      alphabetical: (a, b) => a.name.localeCompare(b.name),
      cal_dsc: (a, b) => b.cals - a.cals,
      cal_asc: (a, b) => a.cals - b.cals,
      ing_dsc: (a, b) => b.num_ing - a.num_ing,
      ing_asc: (a, b) => a.num_ing - b.num_ing,
      default: (a, b) => b.protein - a.protein,
    };
  
    const sortFunction = sortFunctions[sortOption] || sortFunctions.default;
  
    return [...recipes].sort(sortFunction);
  };

  const handleSortChange = (event) => {
    const newSortOption = event.target.value;
    setSortOption(newSortOption);
    setDisplayCount(10);
  };

  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + 10);
  };

  const displayedRecipes = finalRecipes.slice(0, displayCount);

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
      {displayedRecipes.map(recipe => {
        return <Recipe key={recipe.id} recipe={recipe} />
       })
      }
      {displayCount < recipes.length && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  )
};

export default RecipeDisplay;
