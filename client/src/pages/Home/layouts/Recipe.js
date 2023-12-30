// Recipe component 
import React from 'react';

export default function Recipe({ recipe }) {
  return (
    <div>
        <li>
          <a href={recipe.url}>{recipe.name}</a> 
          <div className='per_serving'>
            Per serving: {recipe.cals} Calories, {recipe.protein} g Protein, {recipe.fat} g Fat, {recipe.carbs} g Carbohydrates
          </div>
          {recipe.num_rev} reviews, {recipe.num_ing} Ingredients, {recipe.time === 0 ? " No cook time listed." : recipe.time + " minutes"}
        </li>
    </div>
  )
}
