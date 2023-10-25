import { useEffect, useState } from "react";
import searchApi from "../Api/searchApi";

function useGetSearch(query) {
  const [searchData, setMoviesData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(false);

  useEffect(() => {
    const getSearchMovies = async () => {
      try {
        setLoading(true);
        searchApi(query).then((res) => {
          setMoviesData(res.data.results);
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
        setError("Error from server");
        setLoading(false);
      }
    };
    getSearchMovies();
  },[]);

  return [searchData, Loading, Error];
}

export default useGetSearch;
