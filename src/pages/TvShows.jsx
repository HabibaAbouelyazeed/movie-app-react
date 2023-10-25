import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGetMovies from "../hooks/useGetMovies";
import Movie from "../components/Movie";
import Loader from "../components/Loader";
// Material Ui
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const TvShows = () => {
    const [MoviesData, loading, Error] = useGetMovies("list");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    let filter = MoviesData.filter((movie) =>(movie.media_type === 'tv'))
    setFilteredMovies(filter);
  }, [MoviesData]);

  return (
    <Container>
        <h2 style={{ margin: "3rem 0" }}>Latest TV Shows</h2>
        <Loader loading={loading} error={Error}>
          <ImageList sx={{ display: "block" }}>
            <Grid container spacing={4}>
              {filteredMovies.length === 0 && (
                <Grid item xs={12}>
                  <p>No items to show...</p>
                </Grid>
              )}
              {filteredMovies?.map((movie) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                  <Link to={`/details/${movie.media_type}/${movie.id}`}>
                    <ImageListItem className="img-hover-zoom">
                      <Movie movieItem={movie} />
                    </ImageListItem>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </ImageList>
        </Loader>
    </Container>
  )
}

export default TvShows;