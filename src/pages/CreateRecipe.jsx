import React from "react";
import RecipeForm from "../components/RecipeForm";

export default function CreateRecipe(){
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Share a New Recipe</h2>
      <RecipeForm />
    </section>
  );
}
