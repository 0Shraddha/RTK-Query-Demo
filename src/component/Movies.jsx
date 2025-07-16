import { useState } from "react";

import {  useAddMovieMutation, useDeleteMovieMutation, useGetMoviesQuery } from "../state/movies/movieApiSlice";
import MovieCard from "./CardComponent/MovieCard";

export default function Movies() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");

  const {data: movies = [], isLoading, isError } = useGetMoviesQuery();

  const [addMovie] = useAddMovieMutation();
  const [deleteMovie] = useDeleteMovieMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New movie submitted:", { title, thumbnail, description, year });

    addMovie({
      title,
      description,
      year: Number(year),
      thumbnail,
      id: String(movies.length + 1),
    });

    setTitle("");
    setThumbnail("");
    setDescription("");
    setYear("");
  };

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-container">
      <h2>Movies to Watch</h2>

      <div className="new-movie-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter movie title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageAddress">Image Link:</label>
            <input
              type="text"
              id="imageAddress"
              placeholder="Enter image link address"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="year">Year of release:</label>
            <input
              type="text"
              id="year"
              placeholder="Enter year of release"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter movie description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit">Add Movie</button>
        </form>
      </div>

      <div className="movie-list">
        {movies.length === 0 ? (
          <p>No movies added yet.</p>
        ) : (
          movies.map((movie) => (
            <div key={movie.id}>
              <MovieCard movie={movie} deleteMovie={deleteMovie} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
