import axios from "axios";
import { TMDB_API_URL, TMDB_API_KEY } from "../utils/Constants";

import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

export interface CounterState {
  movies: string[];
  genresLoad: boolean;
  genres: string[];
  errorMessage: string;
}

// Define the initial state using that type
const initialState: CounterState = {
  movies: [],
  genresLoad: false,
  genres: [],
  errorMessage: "",
};

export const getGenres = createAsyncThunk("vod/genres", async () => {
  try {
    const { data } = await axios.get(
      TMDB_API_URL + "genre/movie/list?api_key=" + TMDB_API_KEY
    );
    return data.genres;
  } catch (err) {
    console.log(err);
  }
});

export const getMovies = createAsyncThunk("vod/movies", async () => {
  try {
    const { data } = await axios.get(
      TMDB_API_URL + "genre/movie/list?api_key=" + TMDB_API_KEY
    );
    console.log(data);
  } catch (err) {
    console.log(err);
  }
});

export const vodSlice = createSlice({
  name: "Netflix",
  initialState,
  reducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoad = true;
    });
  },
});

const store = configureStore({
  reducer: {
    Netflix: vodSlice.reducer,
  },
});

export default store;
