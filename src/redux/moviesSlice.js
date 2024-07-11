import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { movies$ } from '../movies';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await movies$;
  return response;
});

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    status: 'idle',
  },
  reducers: {
    deleteMovie: (state, action) => {
      state.list = state.list.filter(movie => movie.id !== action.payload);
    },
    toggleLike: (state, action) => {
      const movie = state.list.find(movie => movie.id === action.payload);
      if (movie) {
        movie.userLiked = !movie.userLiked;
        if (movie.userLiked) {
          movie.likes += 1;
          movie.dislikes -= 1;
        } else {
          movie.likes -= 1;
          movie.dislikes += 1;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { deleteMovie, toggleLike } = moviesSlice.actions;

export default moviesSlice.reducer;
