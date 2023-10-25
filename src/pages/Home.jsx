import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const Home = () => {
  const [MoviesData, loading, Error] = useGetMovies('list');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [mediaType, setMediaType] = useState("all");

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

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  return (
    <div>
      <Container>
        <Box sx={{ width: 100, marginTop: 4 }}>
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
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
              {filteredMovies.length == 0 && (
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
