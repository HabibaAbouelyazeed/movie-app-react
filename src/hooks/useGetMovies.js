import { useEffect, useState } from "react";
import getMoviesApi from "../Api/getMovies";


function useGetMovies() {
  const [MoviesData, setMoviesData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(false);

  useEffect(() => {
    const getMovies = async () =>{
        try {
            setLoading(true);
            getMoviesApi().then((res) =>{
                setMoviesData(res.data.results);
                setLoading(false);
            })
        } catch (error) {
            console.log(error)
            setError("Error from server")
            setLoading(false)
        }
    };

    getMovies();
  },[]);

  return [MoviesData, Loading, Error];
}

export default useGetMovies