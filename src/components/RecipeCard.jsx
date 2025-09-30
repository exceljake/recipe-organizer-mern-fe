import React from "react";
import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }){
  return (
    <article className="bg-[var(--card-bg)] p-4 rounded-xl shadow-sm hover:shadow-lg transition">
      <Link to={`/recipes/${recipe.id}`}>
        <img src={recipe.image || "/placeholder.jpg"} alt={recipe.title} className="w-full h-40 object-cover rounded-md mb-3" />
        <h3 className="font-semibold text-lg">{recipe.title}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{recipe.description}</p>
      </Link>
    </article>
  );
}
