import api from "./axios";

/*
  Assumes your Node API routes:
  GET /api/recipes?page=1&limit=10
  GET /api/recipes/:id
  POST /api/recipes
  PUT /api/recipes/:id
  DELETE /api/recipes/:id
  GET /api/recipes/search?q=...
*/

export const fetchRecipes = async ({ page = 1, limit = 12 } = {}) => {
  const res = await api.get("/recipes", { params: { page, limit } });
  return res.data; 
};

export const fetchRecipe = async (id) => {
  const res = await api.get(`/recipes/${id}`);
  return res.data;
};

export const createRecipe = async (payload) => {
  const res = await api.post("/recipes", payload);
  return res.data;
};

export const updateRecipe = async ({ id, payload }) => {
  const res = await api.put(`/recipes/${id}`, payload);
  return res.data;
};

export const deleteRecipe = async (id) => {
  const res = await api.delete(`/recipes/${id}`);
  return res.data;
};

export const searchRecipes = async (q) => {
  const res = await api.get("/recipes/search", { params: { q }});
  return res.data;
};
