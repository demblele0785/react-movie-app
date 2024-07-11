import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, deleteMovie, toggleLike } from '../redux/moviesSlice';
import MovieCard from './MovieCard';
import Pagination from './Pagination';
import Filter from './Filter';

const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies.list);
  const status = useSelector(state => state.movies.status);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(4);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (category) => {
    setFilteredMovies(
      category ? movies.filter(movie => movie.category === category) : movies
    );
  };

  const handleDelete = (id) => {
    dispatch(deleteMovie(id));
  };

  const handleToggleLike = (id) => {
    dispatch(toggleLike(id));
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Filter movies={movies} onFilterChange={handleFilterChange} />
      <div className="movie-list">
        {currentMovies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onDelete={() => handleDelete(movie.id)}
            onToggleLike={() => handleToggleLike(movie.id)}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onMoviesPerPageChange={(e) => setMoviesPerPage(Number(e.target.value))}
        moviesPerPage={moviesPerPage}
      />
    </div>
  );
};

export default MovieList;
