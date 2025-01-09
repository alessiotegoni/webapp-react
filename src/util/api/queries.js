import { api } from "./index";

export const getMovies = async (params) => {
  const { data } = await api.get("/movies", {
    params,
  });

  return data;
};

export const getMovieById = async (id) => {
  const { data } = await api.get(`/movies/${id}`);

  return data;
};
