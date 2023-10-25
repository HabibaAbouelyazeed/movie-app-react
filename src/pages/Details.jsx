import { useParams } from "react-router-dom";
import {runTimeFormat, dateFormate} from "../utils/dataFormat"

import useGetMovies from "../hooks/useGetMovies";
import Loader from "../components/Loader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const Details = () => {
  const { media_type, id } = useParams();
  const [movieData, loading, Error] = useGetMovies("details", media_type, id);

  return (
    <>
      <Container >
        <Loader loading={loading} error={Error}>
          <Grid container spacing={4} className="movieDetails-wrapper">
            <Grid item xs={12} sm={4}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                alt="movie poster"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Grid>

            <Grid item xs={12} sm={8}>
              <header>
              <h5 style={{ fontSize: "1.5rem" }}>
                {movieData?.release_date?.slice(0, 4) ||
                  movieData?.first_air_date?.slice(0, 4)}
              </h5>
              <h2 style={{ fontSize: "2.5rem" }}>
                {movieData.original_title || movieData.original_name}
                {movieData.name && (
                  <span style={{ marginLeft: "1rem", fontSize: "1.2rem" }}>
                    "{movieData.name}"
                  </span>
                )}
                {movieData.title && (
                  <span style={{ marginLeft: "1rem", fontSize: "1.2rem" }}>
                    "{movieData.title}"
                  </span>
                )}
              </h2>
              </header>
              <p className="movie-overview">{movieData.overview}</p>

              <div
                style={{
                  padding: "0.5rem 0",
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                }}>

                {movieData.runtime && <p>{runTimeFormat(movieData.runtime)}</p>}
                <div style={{ opacity: "0.5" }}>|</div>
                {movieData?.genres?.map((genre) => (
                  <p key={genre.id} style={{ padding: "0 0.25rem" }}>
                    {genre.name}
                  </p>
                ))}
                <div style={{ opacity: "0.5" }}>|</div>
                {movieData.release_date && (
                  <p>{dateFormate(movieData.release_date)}</p>
                )}
                {movieData.first_air_date && (
                  <span style={{ padding: "0 0rem" }}>
                    {dateFormate(movieData.first_air_date)}
                  </span>
                )}
              </div>

              <div
                style={{
                  padding: "2rem 0",
                  display: "flex",
                  gap: "2rem",
                  alignItems: "center",
                  color:"black"
                }}>
                <p style={{ fontWeight: "bold", fontSize: "2rem" }}>
                  {movieData?.vote_average?.toFixed(1)}{" "}
                  <span style={{ fontSize: "1rem", fontWeight: "normal" }}>
                    IMDB
                  </span>
                </p>
                <div style={{ opacity: "0.5" }}>|</div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ marginBottom: "0", opacity: "0.7" }}>Status</p>

                  <p style={{ fontWeight: "bold", marginTop: "0.2rem" }}>
                    {movieData.status}
                  </p>
                </div>
              </div>
            </Grid>
          </Grid>
            <div className="backDrop-img-overlay">
              <img
                src={` https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movieData.backdrop_path}`}
                alt="movie poster"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
        </Loader>
      </Container>
    </>
  );
};

export default Details;
