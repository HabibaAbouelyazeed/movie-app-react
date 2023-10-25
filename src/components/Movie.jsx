import * as React from "react";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Link } from "react-router-dom";

const Movie = ({ movieItem }) => {
  if (movieItem) {
    return (
      <>
        <img
          srcSet={`https://image.tmdb.org/t/p/w500${movieItem?.poster_path}?w=248&fit=crop&auto=format&dpr=2 2x`}
          src={`https://image.tmdb.org/t/p/w500${movieItem?.poster_path}?w=248&fit=crop&auto=format`}
          alt={movieItem.title}
          loading="lazy"></img>
        <ImageListItemBar
          title={movieItem.title || movieItem.name}
          subtitle={
            <span style={{ fontWeight: "normal" }}>{movieItem.media_type}</span>
          }
          position="below"
          sx={{
            fontWeight: "bold",
            marginTop: "1rem",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        />
        <div className="movie-rating-wrapper">
          {movieItem.vote_average?.toFixed(1)}
        </div>
      </>
    );
  }
};

export default Movie;
