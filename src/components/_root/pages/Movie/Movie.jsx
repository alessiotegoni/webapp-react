import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Movie.module.css";
import { getMovieById } from "../../../../util/api/queries";

export default function Movie() {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  const handleFetchMovie = async () => {
    const result = await getMovieById(id);

    setMovie(result);
  };

  useEffect(() => {
    handleFetchMovie();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className={styles.moviePage}>
      <div className={styles.movieInfo}>
        <img src={movie.image} alt={movie.title} />
        <div>
        <h1>{movie.title}</h1>
          <p>
            <strong>Director:</strong> {movie.director}
          </p>
          <p>
            <strong>Genre:</strong> {movie.genre}
          </p>
          <p>
            <strong>Release Year:</strong> {movie.release_year}
          </p>
          <p>
            <strong>Abstract:</strong> {movie.abstract}
          </p>
        </div>
      </div>
      <div className={styles.reviews}>
        <h2>Reviews</h2>
        {movie.reviews.map((review) => (
          <div key={review.id} className={styles.review}>
            <h3>{review.name}</h3>
            <p>Rating: {review.vote}/5</p>
            <p>{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
