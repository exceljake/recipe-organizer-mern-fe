import React, { useState } from "react";
import { useRecipes } from "../hooks/useRecipes";
import RecipeList from "../components/RecipeList";

export default function Home(){
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useRecipes(page);

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Discover Recipes</h2>
        {/* TODO: Add search component */}
      </div>

      {isLoading && <p>Loading recipes…</p>}
      {isError && <p>Error loading recipes.</p>}
      {data && <RecipeList recipes={data.recipes || data} />}

      <div className="flex justify-center gap-2 mt-6">
        <button className="btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
        <button className="btn" onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </section>
  );
}
