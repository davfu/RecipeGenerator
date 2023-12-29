// Recipe component 
import React from 'react';

export default function Recipe({ recipe }) {
  return (
    <div>
        <li><a href={recipe.url}>{recipe.name}</a>, {recipe.num_rev} reviews, {recipe.protein} g Protein, {recipe.cals} Calories, {recipe.num_ing} Ingredients.</li>
    </div>
  )
}
