import React from "react";
import styles from "./MovieReviewForm.module.css";
import { useActionState } from "react";
import { api } from "../../../util/api";

export default function MovieReviewForm({ movieId, onReviewSent }) {
  const [data, formAction, isPending] = useActionState(sendReview);

  async function sendReview(state, formData) {
    if (isPending) return;

    const { name, text, vote } = Object.fromEntries(formData);

    if (!name || !text || !vote) return { message: "All fields are required" };

    const values = { name, text, vote: parseInt(vote) };

    try {
      const {
        data: { message, insertId: id },
      } = await api.post(`/movies/${movieId}/reviews`, values);
      onReviewSent({ id, ...values, createdAt: new Date().toISOString() });
      return { message };
    } catch (err) {
      return {
        error: true,
        message: err.response.data?.message,
        values,
      };
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.movieReviewForm} action={formAction}>
        <h2 className={styles.title}>Film Review</h2>
        {data && (
          <p className={data?.error ? styles.textSuccess : styles.textError}>
            {data.message}
          </p>
        )}
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Username
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.input}
            placeholder="Your name"
            defaultValue={data?.values?.name}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="text" className={styles.label}>
            Review
          </label>
          <textarea
            id="text"
            name="text"
            rows={4}
            className={styles.textarea}
            placeholder="Enter your review here..."
            defaultValue={data?.values?.text}
            required
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="vote">
            Vote
          </label>
          <input
            type="number"
            id="vote"
            name="vote"
            className={styles.input}
            placeholder="Your vote"
            min="0"
            max="5"
            defaultValue={data?.values?.vote}
            required
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isPending}
        >
          {isPending ? "Publishing..." : "Publish Review"}
        </button>
      </form>
    </div>
  );
}
