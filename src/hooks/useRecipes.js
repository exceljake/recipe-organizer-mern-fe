import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';
import * as api from "../api/recipes";

export const useRecipes = (page = 1) => {
  return useQuery({
    queryKey: ["recipes", page],
    queryFn: () => api.fetchRecipes({ page }),
    placeholderData: (prev) => prev, 
    staleTime: 1000 * 60 * 2, 
  });
};

export const useRecipe = (id) =>
  useQuery({
    queryKey: ["recipe", id],
    queryFn: () => api.fetchRecipe(id),
    enabled: !!id,
  });

export const useCreateRecipe = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.createRecipe,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["recipes"] });
      alert("✅ Recipe created successfully!");
      navigate('/recipes'); 
    },
  });
};


export const useUpdateRecipe = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.updateRecipe,
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["recipes"] }),
  });
};

export const useDeleteRecipe = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.deleteRecipe,
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["recipes"] }),
  });
};
