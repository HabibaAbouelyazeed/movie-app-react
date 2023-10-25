import { useEffect, useState } from "react";
import getMoviesApi from "../Api/getMovies";
import { getMovieDetailsApi } from "../Api/getMovies";

function useGetMovies(type, mediaType = 'movie', movieId = '1') {
  const [MoviesData, setMoviesData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(false);

  useEffect(() => {
    if (type === "list") {
      const getMovies = async () => {
        try {
          setLoading(true);
          getMoviesApi().then((res) => {
            setMoviesData(res.data.results);
            setLoading(false);
          });
        } catch (error) {
          console.log(error);
          setError("Error from server");
          setLoading(false);
        }
      };
      getMovies();

    } else if (type === "details") {
      const getDetails = async () => {
        try {
          setLoading(true);
          getMovieDetailsApi(mediaType,movieId ).then((res) => {
            setMoviesData(res.data);
            setLoading(false);
          });
        } catch (error) {
          console.log(error);
          setError("Error from server");
          setLoading(false);
        }
      };
      getDetails();
    }
  }, []);

  return [MoviesData, Loading, Error];
}

export default useGetMovies;
