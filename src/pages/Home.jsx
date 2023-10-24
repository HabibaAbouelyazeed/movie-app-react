import useGetMovies from "../hooks/useGetMovies";
import Movie from "../components/Movie";
import Loader from "../components/Loader";
import Container from "@mui/material/Container";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";

const Home = () => {
  const [MoviesData, loading, Error] = useGetMovies();
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [mediaType, setMediaType] = useState("all");
  
  useEffect(() => {
    setFilteredMovies(MoviesData);
  }, []);

  useEffect(()=>{
    // console.log(mediaType);
    changeMedia();
  },[mediaType])

  const handleChange = (event) => {
    setMediaType(event.target.value);
  };

  const changeMedia = ()=>{
    if (mediaType === "all") {
      setFilteredMovies(MoviesData);
    } else {
      setFilteredMovies(
        MoviesData.filter((movie) => {
          return movie.media_type === mediaType;
        })
        );
      }
  };

  return (
    <div>
      <Container>
        <Box sx={{ width: 100, marginTop: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="select-label">Media Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="simple-select"
              value={mediaType}
              label="Media Type"
              onChange={handleChange}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="movie">Movie</MenuItem>
              <MenuItem value="tv">TV</MenuItem>
              <MenuItem value="person">Person</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <h2 style={{ margin: "3rem 0" }}>Latest Movies & TV Shows</h2>
        <Loader loading={loading} error={Error}>
          <ImageList sx={{ display: "block" }}>
            <Grid container spacing={4}>
              {filteredMovies?.map((movie) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                  <ImageListItem>
                    <Movie movieItem={movie} />
                  </ImageListItem>
                </Grid>
              ))}
            </Grid>
          </ImageList>
        </Loader>
      </Container>
    </div>
  );
};

export default Home;
