import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import Home from "./pages/Home";
import RecipePage from "./pages/RecipePage";
import CreateRecipe from "./pages/CreateRecipe";
import Header from "./components/Header";

const queryClient = new QueryClient({
}); 

function AppContent() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/recipes" replace />} />
          <Route path="/recipes" element={<RecipePage />} />
          <Route path="/recipes/new" element={<CreateRecipe />} /> 
        </Routes>
      </main>
    </div>
  );
}

export default function App(){
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent /> 
    </QueryClientProvider>
  );
}
