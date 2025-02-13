import React, { createContext, useReducer, useEffect } from "react";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "../utils/localStorage"; 

const MovieContext = createContext();

const initialState = {
  movies: loadFromLocalStorage("movies") || [],
};

const movieReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MOVIE":
      const updatedMoviesAdd = [...state.movies, action.payload];
      saveToLocalStorage("movies", updatedMoviesAdd);
      return { ...state, movies: updatedMoviesAdd };

    case "REMOVE_MOVIE":
      const updatedMoviesRemove = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
      saveToLocalStorage("movies", updatedMoviesRemove);
      return { ...state, movies: updatedMoviesRemove };

    case "UPDATE_MOVIE":
      const updatedMoviesUpdate = state.movies.map((movie) =>
        movie.id === action.payload.id ? action.payload : movie
      );
      saveToLocalStorage("movies", updatedMoviesUpdate);
      return { ...state, movies: updatedMoviesUpdate };

    case "SET_MOVIES":
      saveToLocalStorage("movies", action.payload);
      return { ...state, movies: action.payload };

    default:
      return state;
  }
};

const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  useEffect(() => {
    saveToLocalStorage("movies", state.movies);
  }, [state.movies]);

  return (
    <MovieContext.Provider value={{ movies: state.movies, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};

export { MovieContext, MovieProvider };
