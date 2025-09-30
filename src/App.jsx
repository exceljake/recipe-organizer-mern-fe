import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RecipePage from "./pages/RecipePage";
import CreateRecipe from "./pages/CreateRecipe";
import Header from "./components/Header";

export default function App(){
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<RecipePage />} />
          <Route path="/recipes/new" element={<CreateRecipe />} /> 
        </Routes>
      </main>
    </div>
  );
}
