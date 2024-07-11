import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, onMoviesPerPageChange, moviesPerPage }) => {
  return (
    <div className="pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
      <select value={moviesPerPage} onChange={onMoviesPerPageChange}>
        <option value={4}>4</option>
        <option value={8}>8</option>
        <option value={12}>12</option>
      </select>
    </div>
  );
};

export default Pagination;
