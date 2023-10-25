import { useEffect, useState } from "react";
import useGetSearch from "../hooks/useGetSearch";
import { Link } from "react-router-dom";

import Movie from "./Movie";
import Loader from "./Loader";

// MUI
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Grid from "@mui/material/Grid";

const Search = ({query, mediaType="all"}) => {
  const [searchMoviesData, searchLoading, searchError] = useGetSearch(query);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    changeMedia();
  }, [searchMoviesData]);

  useEffect(() => {
    changeMedia();
  }, [mediaType]);

  const changeMedia = () => {
    if (mediaType === "all") {
      setFilteredMovies(searchMoviesData);
    } else {
      setFilteredMovies(
        searchMoviesData.filter((movie) => {
          return movie.media_type === mediaType;
        })
      );
    }
  };

  return (
    <div className="search-wrapper">
      <h3 style={{ marginBottom: "3rem", fontWeight:"normal"}}>
        Showing search results for: <span style={{fontWeight:"bold"}}>{query}</span>
      </h3>

      <Loader loading={searchLoading} error={searchError}>
        <ImageList sx={{ display: "block" }}>
          <Grid container spacing={4}>
            {filteredMovies?.map((searchMovie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={searchMovie.id}>
                <Link to={`/details/${searchMovie.media_type}/${searchMovie.id}`}>
                  <ImageListItem className="img-hover-zoom">
                    <Movie movieItem={searchMovie} />
                  </ImageListItem>
                </Link>
              </Grid>
            ))}
          </Grid>
        </ImageList>
      </Loader>
    </div>
  );
};

export default Search;
