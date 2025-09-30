import React from "react";
import { useForm } from "react-hook-form";
import { useCreateRecipe } from "../hooks/useRecipes";
import { useNavigate } from "react-router-dom";

export default function RecipeForm(){
  const { register, handleSubmit, reset } = useForm({ defaultValues: { title: "", description: "", ingredients: "", instructions: "", image: "" }});
  const createMutation = useCreateRecipe();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    // split ingredients by newline or comma into array
    const payload = {
      title: values.title,
      description: values.description,
      ingredients: values.ingredients.split(/\r?\n|,/).map(s => s.trim()).filter(Boolean),
      instructions: values.instructions,
      image: values.image || null,
    };

    createMutation.mutate(payload, {
      onSuccess: (data) => {
        reset();
        // navigate to new recipe (if API returns created recipe id)
        if (data && data.id) navigate(`/recipes/${data.id}`);
        else navigate("/");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-[var(--card-bg)] p-4 rounded-lg">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input {...register("title", { required: true })} className="w-full mt-1 p-2 rounded-md" />
      </div>

      <div>
        <label className="block text-sm font-medium">Short description</label>
        <textarea {...register("description")} className="w-full mt-1 p-2 rounded-md" rows="2" />
      </div>

      <div>
        <label className="block text-sm font-medium">Ingredients (one per line or comma separated)</label>
        <textarea {...register("ingredients")} className="w-full mt-1 p-2 rounded-md" rows="3" />
      </div>

      <div>
        <label className="block text-sm font-medium">Instructions (HTML allowed)</label>
        <textarea {...register("instructions")} className="w-full mt-1 p-2 rounded-md" rows="6" />
      </div>

      <div>
        <label className="block text-sm font-medium">Image URL</label>
        <input {...register("image")} className="w-full mt-1 p-2 rounded-md" />
      </div>

      <div className="flex gap-2">
        <button type="submit" className="btn bg-green-200">Share</button>
        <button type="button" onClick={() => reset()} className="btn bg-gray-100">Reset</button>
      </div>
    </form>
  );
}
