import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // function fetchMoviesHandler() {
  //   setLoading(true);
  //   setError(null);
  //   fetch("https://swapi.dev/api/films")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Something went wrong");
  //       }

  //       return response.json();
  //     })
  //     .then((data) => {
  //       const transformMovies = data.results.map((movie) => {
  //         return {
  //           id: movie.episode_id,
  //           title: movie.title,
  //           openingText: movie.opening_crawl,
  //           releaseDate: movie.release_date,
  //         };
  //       });
  //       setMovies(transformMovies);
  //       setLoading(false);
  //     })
  //     .catch((error) => setError(error.message));

  //   setLoading(false);
  // }

  async function fetchMoviesHandler() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();

      const transformMovies = data.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          openingText: movie.opening_crawl,
          releaseDate: movie.release_date,
        };
      });
      setMovies(transformMovies);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }

  let content = <h1>Please Click the above button!!</h1>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <h1>Loading Your Movies...</h1>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
