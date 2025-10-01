import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCreateRecipe } from '../hooks/useRecipes';

export default function RecipeForm({ closeModal = () => {} }) { // ✅ default noop
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors, isSubmitting }
  } = useForm({ 
    defaultValues: { title: "", ingredients: "", instructions: "" }
  });
  
  const createMutation = useCreateRecipe();
  const navigate = useNavigate(); 

  const onSubmit = (values) => {
    const payload = {
      title: values.title,
      ingredients: values.ingredients
        .split(/\r?\n|,/)
        .map(s => s.trim())
        .filter(Boolean),
      instructions: values.instructions
    };

    createMutation.mutate(payload, {
      onSuccess: () => {
        reset();
        closeModal(); // ✅ safe to call now
      },
      onError: (error) => {
        console.error("Recipe creation failed:", error);
        alert(`Failed to create recipe: ${error.message || 'Please check console for details.'}`); 
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-2">
      
      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input 
          id="title"
          {...register("title", { required: "Title is required." })} 
          className={`w-full mt-1 p-2 rounded-md border ${errors.title ? 'border-red-500' : 'border-gray-300'}`} 
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
      </div>

      {/* Ingredients Field */}
      <div>
        <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
          Ingredients (one per line or comma separated)
        </label>
        <textarea 
          id="ingredients"
          {...register("ingredients", { 
            required: "Ingredients are required.", 
            minLength: {
              value: 10, 
              message: "Ingredients must be at least 10 characters."
            },
            maxLength: {
              value: 200, 
              message: "Ingredients cannot exceed 200 characters."
            }
          })} 
          className={`w-full mt-1 p-2 rounded-md border ${errors.ingredients ? 'border-red-500' : 'border-gray-300'}`} 
          rows="3" 
        />
        {errors.ingredients && <p className="text-red-500 text-xs mt-1">{errors.ingredients.message}</p>}
      </div>

      {/* Instructions Field */}
      <div>
        <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">Instructions</label>
        <textarea 
          id="instructions"
          {...register("instructions", { required: "Instructions are required." })} 
          className={`w-full mt-1 p-2 rounded-md border ${errors.instructions ? 'border-red-500' : 'border-gray-300'}`} 
          rows="6" 
        />
        {errors.instructions && <p className="text-red-500 text-xs mt-1">{errors.instructions.message}</p>}
      </div>

      <div className="flex gap-3 justify-end pt-4">
        <button 
          type="button" 
          onClick={closeModal} 
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-150"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition duration-150 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sharing...' : 'Share'}
        </button>
      </div>
    </form>
  );
}
