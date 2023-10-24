import * as React from "react";
import ImageListItemBar from "@mui/material/ImageListItemBar";

const Movie = ({ movieItem }) => {
  return (
    <>
      <img
        srcSet={`https://image.tmdb.org/t/p/w500${movieItem.poster_path}?w=248&fit=crop&auto=format&dpr=2 2x`}
        src={`https://image.tmdb.org/t/p/w500${movieItem.poster_path}?w=248&fit=crop&auto=format`}
        alt={movieItem.title}
        loading="lazy"
      />
      <ImageListItemBar
        title={movieItem.title || movieItem.name}
        subtitle={<span style={{fontWeight:"normal"}}>{movieItem.media_type}</span>}
        position="below"
        sx={{fontWeight:"bold", marginTop:"1rem", textAlign:"center", textTransform:"uppercase"}}
      />
    </>
  );
};

export default Movie;
