// Recipe component 
import React from 'react';

export default function Recipe({ recipe }) {
  return (
    <div>
        <li><a href={recipe.url}>{recipe.name}</a></li>
    </div>
  )
}
