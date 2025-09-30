import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/recipes";

export const useRecipes = (page=1) => {
  return useQuery(["recipes", page], () => api.fetchRecipes({ page }), {
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2, // 2 min
  });
};

export const useRecipe = (id) => useQuery(["recipe", id], () => api.fetchRecipe(id), { enabled: !!id });

export const useCreateRecipe = () => {
  const qc = useQueryClient();
  return useMutation(api.createRecipe, {
    onSuccess: () => qc.invalidateQueries(["recipes"]),
  });
};

export const useUpdateRecipe = () => {
  const qc = useQueryClient();
  return useMutation(api.updateRecipe, { onSuccess: () => qc.invalidateQueries(["recipes"]) });
};

export const useDeleteRecipe = () => {
  const qc = useQueryClient();
  return useMutation(api.deleteRecipe, { onSuccess: () => qc.invalidateQueries(["recipes"]) });
};
