import React from 'react';

const MovieCard = ({ movie, onDelete, onToggleLike }) => {
  const likeRatio = (movie.likes / (movie.likes + movie.dislikes)) * 100;

  return (
    <div className="movie-card">
      <h2><strong>{movie.title}</strong></h2>
      <p>{movie.category}</p>
      <div className="likes-dislikes">
        <div className="likes-bar" style={{ width: `${likeRatio}%` }}></div>
      </div>
      <button onClick={onToggleLike}>
        {movie.userLiked ? 'Dislike' : 'Like'}
      </button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default MovieCard;
