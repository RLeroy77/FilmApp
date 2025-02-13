export const fetchTrendingMovies = async (page) => {
  const API_KEY = "c96e97cc332eb9c696b1bb9957189bc0";
  const BASE_URL = "https://api.themoviedb.org/3";

  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR&page=${page}`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des films :", error);
    return [];
  }
};
