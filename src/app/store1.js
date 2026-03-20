import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/moviesSlice1";

export const store = configureStore({

    reducer: {
        movies: moviesReducer
    }

});
