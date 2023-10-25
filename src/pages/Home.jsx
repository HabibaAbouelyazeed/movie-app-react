import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// **********
import useGetMovies from "../hooks/useGetMovies";
import Movie from "../components/Movie";
import Loader from "../components/Loader";
import Search from "../components/Search";
import { useForm } from "react-hook-form";

// Material Ui
import Input from "@mui/material/Input";
import Container from "@mui/material/Container";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";

const Home = () => {
  const [MoviesData, loading, Error] = useGetMovies("list");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [mediaType, setMediaType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    setFilteredMovies(MoviesData);
  }, [MoviesData]);

  useEffect(() => {
    changeMedia();
  }, [mediaType]);

  const handleChange = (event) => {
    setMediaType(event.target.value);
  };

  const changeMedia = () => {
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

  const handleSearch = (data) => {
    if (data.search.length > 0) {
      setSearchQuery(data.search);
    } else {
      setSearchQuery("");
    }
  };

  return (
    <div>
      <Container>
        <Box
          sx={{
            width: "100%",
            marginTop: 4,
            display: "flex",
            justifyContent: "space-between",
            gap: "2rem",
          }}>
          <form
            onSubmit={handleSubmit(handleSearch)}
            style={{ display: "flex", alignItems: "center", flexGrow: "1" }}>
            <Input
              placeholder="Search"
              name="searchInpt"
              {...register("search")}
              style={{ flexGrow: "1" }}
            />
            <Button type="submit">
              <SearchIcon sx={{ color: "action.active", mr: 0.5, my: 0.5 }} />
            </Button>
          </form>

          <FormControl sx={{ width: "10rem" }}>
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

        {searchQuery && <Search query={searchQuery} mediaType={mediaType} key={searchQuery}></Search>}

        <h2 style={{ margin: "3rem 0" }}>Latest Movies & TV Shows</h2>
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
    </div>
  );
};

export default Home;
