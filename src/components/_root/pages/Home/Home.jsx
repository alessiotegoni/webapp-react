import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { getMovies } from "../../../../util/api/queries";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState(null);

  const handleFetchMovies = async (params) => {
    const results = await getMovies(params)

    setMovies(results)
  }

  useEffect(() => {
    handleFetchMovies({ search })
  }, [search]);

  return (
    <div className={styles.homePage}>
      <div className={styles.searchInputGroup}>
        <h1>Welcome to MovieApp</h1>
        <input
          type="text"
          placeholder="Search movies"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.movieGrid}>
        {movies.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className={styles.movieCard}
          >
            <h2>{movie.title}</h2>
            <p>{movie.director}</p>
            <p>{movie.genre}</p>
            <p>{movie.release_year}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
