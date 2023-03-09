import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  function fetchMoviesHandler() {
    setLoading(true);
    fetch("https://swapi.dev/api/films")
      .then((response) => response.json())
      .then((data) => {
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
      });
  }

  // async function fetchMoviesHandler(){
  //   const response=await fetch("https://swapi.dev/api/films");
  //   const data= await response.json()

  //   const transformMovies = data.results.map((movie) => {
  //     return {
  //       id: movie.episode_id,
  //       title: movie.title,
  //       openingText: movie.opening_crawl,
  //       releaseDate: movie.release_date,
  //     };
  //   });
  //   setMovies(transformMovies);
  // }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <h1>Found no movies!!</h1>}
        {isLoading && <h1>Loading...</h1>}
      </section>
    </React.Fragment>
  );
}

export default App;
