import React from 'react';
import Select from 'react-select';

const Filter = ({ movies, onFilterChange }) => {
  const categories = [...new Set(movies.map(movie => movie.category))];
  const options = categories.map(category => ({ value: category, label: category }));

  return (
    <Select
      isClearable
      options={options}
      onChange={selectedOption => onFilterChange(selectedOption ? selectedOption.value : null)}
      placeholder="Filter by category"
    />
  );
};

export default Filter;
        