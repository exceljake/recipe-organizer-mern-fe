// src/pages/RecipePage.jsx
import React, { useEffect, useState } from "react";

function RecipePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/recipes`);
        const result = await res.json();
        setRecipes(result.data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (!confirmDelete) return;

    try {
      await fetch(`${API_BASE_URL}/api/recipes/${id}`, {
        method: "DELETE",
      });
      setRecipes((prev) => prev.filter((r) => r._id !== id)); // ✅ using _id
    } catch (err) {
      console.error("Error deleting recipe:", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading recipes...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-pink-500 mb-6">ShaRecipe 🍳</h1>

      {recipes.length === 0 ? (
        <p className="text-gray-500">No recipes found. Add one to get started!</p>
      ) : (
        <ul className="space-y-4">
          {recipes.map((r) => (
            <li
              key={r._id}
              className="p-4 bg-pink-100 rounded-xl shadow-md flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold text-pink-700">
                  {r.title}
                </h2>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedRecipe(r)} // ✅ open modal
                  className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  View
                </button>

                <button
                  onClick={() => handleDelete(r._id)}
                  className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* ✅ Modal for recipe details */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full relative">
            <h2 className="text-2xl font-bold mb-4 text-pink-600">
              {selectedRecipe.title}
            </h2>

            <p className="mb-2">
              <span className="font-semibold">Difficulty:</span>{" "}
              {selectedRecipe.difficulty}
            </p>

            <h3 className="font-semibold mt-4 mb-2">Ingredients:</h3>
            <ul className="list-disc list-inside space-y-1">
              {selectedRecipe.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>

            <h3 className="font-semibold mt-4 mb-2">Instructions:</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {selectedRecipe.instructions}
            </p>

            <button
              onClick={() => setSelectedRecipe(null)} // ✅ close modal
              className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipePage;
