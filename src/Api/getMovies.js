import axios from "axios";

export const getMoviesApi = async () => {
  try {
    const res = await axios.get(
      "https://api.themoviedb.org/3/trending/all/day?api_key=14bdd69ce887376edfafb09f23f78fe9"
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getMovieDetailsApi = async (mediaType, movieId) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/${mediaType}/${movieId}?api_key=14bdd69ce887376edfafb09f23f78fe9`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export default getMoviesApi;
