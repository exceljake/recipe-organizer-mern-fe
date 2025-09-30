import React from "react";
import { Link } from "react-router-dom";

export default function Header(){
  return (
    <header className="bg-white/60 backdrop-blur sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pastelpink to-pastelmint flex items-center justify-center text-white font-bold">SR</div>
          <div>
            <h1 className="text-lg font-bold">ShaRecipe</h1>
            <p className="text-sm text-gray-600">Share. Discover. Cook.</p>
          </div>
        </Link>
        <nav>
          <Link className="btn bg-white shadow px-3 py-2 rounded-lg" to="/recipes/new">Share a recipe</Link>
        </nav>
      </div>
    </header>
  );
}
